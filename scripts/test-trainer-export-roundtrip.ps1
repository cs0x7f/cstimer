$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$nodeScript = @'
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = process.argv[2];

function loadScript(relativePath, context) {
  const filePath = path.join(repoRoot, relativePath);
  const source = fs.readFileSync(filePath, "utf8");
  vm.runInContext(source, context, { filename: filePath });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const storageState = {};

const storage = {
  getKey(key) {
    return Promise.resolve(Object.prototype.hasOwnProperty.call(storageState, key) ? storageState[key] : "");
  },
  setKey(key, value) {
    storageState[key] = value;
    return Promise.resolve(true);
  }
};

const context = vm.createContext({
  console,
  Math,
  JSON,
  Date,
  Promise,
  storage,
  execMain: (fn) => fn()
});

loadScript("src/js/trainer/storage-adapter.js", context);
loadScript("src/js/trainer/export-bridge.js", context);

async function seedState() {
  storageState["trainer:profile"] = JSON.stringify({
    userId: "user-1",
    preferredGoals: ["last-layer"],
    defaultSessionLength: 12
  });
  storageState["trainer:plans"] = JSON.stringify({
    "plan-1": {
      planId: "plan-1",
      templateId: "pll-targeted",
      name: "PLL Sprint",
      goal: "last-layer",
      drillBlocks: [],
      focusSettings: { weakCaseBias: 1.2 },
      createdAt: "2026-04-05T00:00:00.000Z"
    }
  });
  storageState["trainer:activePlanId"] = JSON.stringify("plan-1");
  storageState["trainer:stats"] = JSON.stringify([
    {
      caseId: "PLL-H",
      attemptCount: 5,
      avgSolveTime: 3200,
      avgRecognitionTime: 900,
      dnfRate: 0,
      skipCount: 0,
      trend: "stable",
      lastPracticedAt: 1712275200000
    }
  ]);
  storageState["trainer:sessions"] = JSON.stringify([
    {
      sessionId: "session-1",
      planId: "plan-1",
      planName: "PLL Sprint",
      goal: "last-layer",
      startedAt: "2026-04-05T00:00:00.000Z",
      completedAt: "2026-04-05T00:10:00.000Z",
      drillResults: [{ caseId: "PLL-H", solveTime: 3100, isDnf: false, isSkipped: false }],
      weakCases: [{ caseId: "PLL-H", category: "PLL" }],
      strongCases: [],
      nextRecommendation: "Repeat weak PLL cases"
    }
  ]);
  storageState["trainer:catalogVersion"] = JSON.stringify("v1");
}

async function main() {
  const trainerStorage = context.trainerStorage;
  const trainerExport = context.trainerExport;

  await seedState();

  const initialExport = await trainerExport.buildTrainerExportBlock();
  assert(initialExport && initialExport.version === 1, "Export block should be built with version 1.");
  assert(initialExport.profile.userId === "user-1", "Profile should be included in export block.");
  assert(initialExport.sessions.length === 1, "Sessions should be included in export block.");

  const expectedRoundTrip = clone(initialExport);

  await trainerStorage.clearTrainerData();
  let cleared = await trainerStorage.exportTrainerData();
  assert(cleared.profile === null, "Clear should remove the profile.");
  assert(Object.keys(cleared.plans).length === 0, "Clear should reset plans.");
  assert(cleared.stats.length === 0, "Clear should reset stats.");
  assert(cleared.sessions.length === 0, "Clear should reset sessions.");

  let importResult = await trainerExport.processImportData({ trainer: initialExport });
  assert(importResult.imported >= 4, "Valid import should persist trainer sections.");

  const reExport = await trainerExport.buildTrainerExportBlock();
  assert(reExport.version === expectedRoundTrip.version, "Round-trip version should match.");
  assert(JSON.stringify(reExport.profile) === JSON.stringify(expectedRoundTrip.profile), "Round-trip profile should match.");
  assert(JSON.stringify(reExport.plans) === JSON.stringify(expectedRoundTrip.plans), "Round-trip plans should match.");
  assert(JSON.stringify(reExport.stats) === JSON.stringify(expectedRoundTrip.stats), "Round-trip stats should match.");
  assert(JSON.stringify(reExport.sessions) === JSON.stringify(expectedRoundTrip.sessions), "Round-trip sessions should match.");

  storageState["trainer:profile"] = JSON.stringify({ userId: "keep-me" });
  const noTrainerResult = await trainerExport.processImportData({ properties: {}, session1: [] });
  assert(noTrainerResult === null, "Solve-only import should skip trainer import.");
  assert(JSON.parse(storageState["trainer:profile"]).userId === "keep-me", "Solve-only import should preserve trainer data.");

  await seedState();
  importResult = await trainerExport.processImportData({ trainer: {} });
  assert(importResult.warnings[0].indexOf("reset to defaults") !== -1, "Empty trainer block should reset to defaults.");
  cleared = await trainerStorage.exportTrainerData();
  assert(cleared.profile === null, "Empty trainer block should clear profile.");
  assert(Object.keys(cleared.plans).length === 0, "Empty trainer block should clear plans.");
  assert(cleared.stats.length === 0, "Empty trainer block should clear stats.");
  assert(cleared.sessions.length === 0, "Empty trainer block should clear sessions.");

  await seedState();
  importResult = await trainerExport.processImportData({ trainer: { version: 1, profile: { userId: "partial" } } });
  assert(importResult.warnings.indexOf("plans missing; reset to default") !== -1, "Missing plans should reset to defaults.");
  const partial = await trainerStorage.exportTrainerData();
  assert(partial.profile.userId === "partial", "Partial import should update provided profile.");
  assert(Object.keys(partial.plans).length === 0, "Partial import should reset missing plans.");
  assert(partial.stats.length === 0, "Partial import should reset missing stats.");
  assert(partial.sessions.length === 0, "Partial import should reset missing sessions.");

  await seedState();
  importResult = await trainerExport.processImportData({ trainer: { version: 99 } });
  assert(importResult.warnings.indexOf("unrecognized version: 99") !== -1, "Wrong version should be rejected.");
  const preserved = await trainerStorage.exportTrainerData();
  assert(preserved.profile.userId === "user-1", "Wrong-version import should preserve existing profile.");
  assert(Object.keys(preserved.plans).length === 1, "Wrong-version import should preserve existing plans.");

  console.log("trainer export/import round-trip tests passed");
}

main().catch((error) => {
  console.error(error && error.message ? error.message : String(error));
  process.exit(1);
});
'@

$tempScriptPath = Join-Path $env:TEMP "cstimer-trainer-export-roundtrip.js"
Set-Content -Path $tempScriptPath -Value $nodeScript -Encoding UTF8

try {
  node $tempScriptPath "$repoRoot"
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
} finally {
  Remove-Item -Path $tempScriptPath -ErrorAction SilentlyContinue
}
