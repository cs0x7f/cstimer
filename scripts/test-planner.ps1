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

function countRuns(queue) {
  let maxRun = 0;
  let lastCaseRef = null;
  let run = 0;
  for (const item of queue) {
    if (item.caseRef === lastCaseRef) {
      run += 1;
    } else {
      lastCaseRef = item.caseRef;
      run = 1;
    }
    maxRun = Math.max(maxRun, run);
  }
  return maxRun;
}

const context = vm.createContext({
  console,
  Math,
  JSON,
  Date,
  execMain: (fn) => fn()
});

loadScript("src/js/trainer/case-catalog-data.js", context);
loadScript("src/js/trainer/case-catalog.js", context);
loadScript("src/js/trainer/planner-core.js", context);

const planner = context.trainerPlanner;
const catalog = context.caseCatalog.getAllCases();

const baselineStats = [
  { caseId: "PLL-H", avgSolveTime: 5200, avgRecognitionTime: 1300, dnfRate: 0.05, skipCount: 0, attemptCount: 12, trend: "stable", lastPracticedAt: 0 },
  { caseId: "PLL-Ja", avgSolveTime: 9000, avgRecognitionTime: 2600, dnfRate: 0.30, skipCount: 3, attemptCount: 10, trend: "declining", lastPracticedAt: -10 * 24 * 60 * 60 * 1000 },
  { caseId: "OLL-01", avgSolveTime: 11000, avgRecognitionTime: 3000, dnfRate: 0.20, skipCount: 2, attemptCount: 8, trend: "declining", lastPracticedAt: -8 * 24 * 60 * 60 * 1000 },
  { caseId: "OLL-02", avgSolveTime: 6200, avgRecognitionTime: 1600, dnfRate: 0.00, skipCount: 0, attemptCount: 10, trend: "improving", lastPracticedAt: 0 }
];

const plannerContext = { evaluationTime: 0, queueSeed: 99 };

const lastLayerPlan = {
  goal: "last-layer",
  totalAttempts: 20,
  drillBlocks: [],
  focusSettings: { weakCaseBias: 1.0, coverageFloor: 0.20, sessionMode: "standard" }
};

const queueA = planner.generateQueue(lastLayerPlan, baselineStats, catalog, plannerContext);
const queueB = planner.generateQueue(lastLayerPlan, baselineStats, catalog, plannerContext);

assert(queueA.length === 20, "Last-layer queue should contain the requested attempt count.");
assert(JSON.stringify(queueA) === JSON.stringify(queueB), "Planner output must be deterministic for identical inputs.");
assert(countRuns(queueA) <= 3, "Planner queue must not repeat a case more than three times consecutively.");
assert(queueA.every((item) => item.promptMode === "from-case"), "Last-layer queue should use from-case prompts.");
assert(queueA.every((item) => item.targetMetric === "solveTime"), "Last-layer queue should target solveTime.");

const explicitPlan = {
  goal: "last-layer",
  totalAttempts: 6,
  drillBlocks: [
    { caseIds: ["PLL-H", "PLL-Ja", "PLL-T", "PLL-Ua", "PLL-Ub", "OLL-01"] }
  ],
  focusSettings: { weakCaseBias: 1.0, coverageFloor: 0.20, sessionMode: "standard" }
};

const explicitQueue = planner.generateQueue(explicitPlan, baselineStats, catalog, plannerContext);
const explicitCaseIds = {};
for (const item of explicitQueue) {
  explicitCaseIds[item.caseRef] = true;
}
assert(explicitQueue.length === 6, "Explicit drill-block queue should keep the requested length.");
assert(Object.keys(explicitCaseIds).length === 6, "When the session is long enough, every explicit case should appear at least once.");

const crossPlan = {
  goal: "cross",
  totalAttempts: 10,
  drillBlocks: [],
  focusSettings: { weakCaseBias: 1.0, coverageFloor: 0.20, sessionMode: "standard" }
};

const crossQueue = planner.generateQueue(crossPlan, [], catalog, plannerContext);
assert(crossQueue.length === 10, "Cross queue should contain the requested attempt count.");
assert(crossQueue.every((item) => item.promptMode === "full-solve"), "Cross queue should use full-solve prompts.");
assert(crossQueue.every((item) => item.targetMetric === "planTime"), "Cross queue should target planTime.");
assert(crossQueue.every((item) => item.block !== "warmup"), "Cross queue should not include a warmup block.");

console.log("planner smoke tests passed");
'@

$tempScriptPath = Join-Path $env:TEMP "cstimer-trainer-planner-smoke.js"
Set-Content -Path $tempScriptPath -Value $nodeScript -Encoding UTF8

try {
  node $tempScriptPath "$repoRoot"
} finally {
  Remove-Item -Path $tempScriptPath -ErrorAction SilentlyContinue
}
