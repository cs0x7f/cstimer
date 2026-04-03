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

const storageState = {
  "trainer:profile": null,
  "trainer:plans": JSON.stringify({
    "plan-last-layer": {
      planId: "plan-last-layer",
      goal: "last-layer",
      totalAttempts: 2,
      drillBlocks: [],
      focusSettings: { weakCaseBias: 1.0, coverageFloor: 0.20, sessionMode: "standard" }
    }
  }),
  "trainer:activePlanId": JSON.stringify("plan-last-layer"),
  "trainer:stats": JSON.stringify([
    {
      caseId: "PLL-H",
      attemptCount: 5,
      avgSolveTime: 5000,
      avgRecognitionTime: 1200,
      bestSolveTime: 4300,
      worstSolveTime: 6200,
      dnfRate: 0,
      skipCount: 0,
      trend: "stable",
      lastPracticedAt: "2026-04-01T00:00:00.000Z"
    }
  ]),
  "trainer:sessions": JSON.stringify([
    {
      sessionId: "old-session",
      drillResults: [
        { caseId: "PLL-H", isDnf: true },
        { caseId: "PLL-T", isDnf: false }
      ]
    }
  ])
};

const storage = {
  getKey(key) {
    return Promise.resolve(storageState[key] == null ? "" : storageState[key]);
  },
  setKey(key, value) {
    storageState[key] = value;
    return Promise.resolve(true);
  },
  importAll() {
    return Promise.resolve(true);
  }
};

const shellCalls = [];
const trainerShell = {
  _state: "idle",
  init(containerEl) {
    shellCalls.push(["init", containerEl]);
    return { containerEl };
  },
  showSurface(name, renderFn, data) {
    shellCalls.push(["showSurface", name, data]);
    this._state = name;
    if (renderFn) {
      renderFn({ marker: name }, data || null);
    }
    return { name, data };
  },
  navigateTo(name, payload) {
    shellCalls.push(["navigateTo", name, payload]);
    this._state = name || "idle";
  },
  getState() {
    return this._state;
  }
};

const trainerPlanner = {
  generateQueue(plan, stats, catalog, plannerContext) {
    return [
      { queueIndex: 0, drillId: "focus-PLL-H-0", caseRef: "PLL-H", block: "focus", promptMode: "from-case", targetMetric: "solveTime" },
      { queueIndex: 1, drillId: "integration-PLL-T-1", caseRef: "PLL-T", block: "integration", promptMode: "from-case", targetMetric: "solveTime" }
    ];
  },
  tagWeakCases(results, statsMap) {
    assert(typeof statsMap["PLL-H"].lastPracticedAt === "number", "lastPracticedAt should be normalized to epoch ms.");
    return ["PLL-H"];
  },
  tagStrongCases() {
    return ["PLL-T"];
  },
  nextRecommendation(results, weakCaseIds, strongCaseIds, catalog, reviewContext) {
    assert(reviewContext.previousDnfRate === 0.5, "previous session DNF rate should be passed into recommendation context.");
    return "Focus on headlights recognition patterns next session";
  }
};

const caseCatalog = {
  getAllCases() {
    return [
      { caseId: "PLL-H", name: "H Perm", category: "PLL", groupTags: ["headlights"] },
      { caseId: "PLL-T", name: "T Perm", category: "PLL", groupTags: ["adjacent-swap"] }
    ];
  },
  getCase(caseId) {
    return this.getAllCases().find((record) => record.caseId === caseId) || null;
  }
};

const context = vm.createContext({
  console,
  Math,
  JSON,
  Date,
  Promise,
  storage,
  trainerShell,
  trainerPlanner,
  caseCatalog,
  execMain: (fn) => fn()
});

loadScript("src/js/trainer/storage-adapter.js", context);
loadScript("src/js/trainer/trainer-integration.js", context);

async function main() {
  const integration = context.trainerIntegration;

  const stats = await integration.getAllStats();
  assert(typeof stats[0].lastPracticedAt === "number", "Loaded stats should normalize lastPracticedAt.");

  integration.initShell("#trainer-root");
  integration.showSurface("entry", () => null, { section: "entry" });
  integration.navigateToSurface("setup", { planId: "plan-last-layer" });
  assert(shellCalls.length >= 3, "Shell helpers should delegate into trainerShell.");

  const start = await integration.startSession("plan-last-layer");
  assert(start.queue.length === 2, "Session start should return planner queue.");

  await integration.recordAttempt({ solveTime: 6100, recognitionTime: 1400, dnf: false, skipped: false });
  integration.advanceQueue();
  await integration.recordAttempt({ solveTime: 7200, recognitionTime: 1800, dnf: true, skipped: false });

  const review = await integration.endSession();
  assert(review.weakCases.length === 1 && review.weakCases[0].category === "PLL", "Weak case enrichment should include category.");
  assert(review.strongCases.length === 1 && review.strongCases[0].category === "PLL", "Strong case enrichment should include category.");
  assert(review.nextRecommendation.indexOf("headlights") !== -1, "Recommendation should come from planner helper.");

  const savedStats = JSON.parse(storageState["trainer:stats"]);
  assert(typeof savedStats[0].lastPracticedAt === "number", "Saved stats should persist epoch timestamps for planner compatibility.");

  console.log("trainer integration smoke tests passed");
}

main().catch((error) => {
  console.error(error && error.message ? error.message : String(error));
  process.exit(1);
});
'@

$tempScriptPath = Join-Path $env:TEMP "cstimer-trainer-integration-smoke.js"
Set-Content -Path $tempScriptPath -Value $nodeScript -Encoding UTF8

try {
  node $tempScriptPath "$repoRoot"
  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }
} finally {
  Remove-Item -Path $tempScriptPath -ErrorAction SilentlyContinue
}
