const api = (function () {
  function regReadyListener(callback) {
    if (window._vsReady) {
      callback(); // workaround in case integration.js runs after the signal is pushed
    } else {
      kernel.regListener("api", "vs-ready", callback);
    }
  }

  function regSolveFinishListener(callback) {
    kernel.regListener("api", "time", (_, time) => {
      const dnf = time[2][0] === -1;
      if (dnf) {
        callback({ dnf: true });
        return;
      }

      const csReconstruction = time[4][0];
      callback({
        reconstruction: getAlgCubingReconstruction(csReconstruction),
        timeMs: time[2][1],
      });
    });
  }

  function regStartTimeListener(callback) {
    kernel.regListener("api", "timerStatus", (_, status) => {
      if (status === 1) {
        callback();
      }
    });
  }

  function importScramble(str) {
    window._resetTimer();
    kernel.pushSignal("scramble", ["333", str]);
    window._applyScramble();

    window.focus();
    kernel.blur();
  }

  function setInputModeToVirtual() {
    window.kernel.setProp("input", "v");
  }

  return {
    setInputModeToVirtual,
    regReadyListener,
    regSolveFinishListener,
    regStartTimeListener,
    importScramble,
  };
})();

const POST_MESSAGE_SOURCE = "vs-solver-integration";
api.setInputModeToVirtual();

api.regReadyListener(() =>
  parent.postMessage({ source: POST_MESSAGE_SOURCE, event: "ready" }, "*"),
);
api.regSolveFinishListener((result) => {
  parent.postMessage(
    { source: POST_MESSAGE_SOURCE, payload: { result }, event: "solveFinish" },
    "*",
  );
});
api.regStartTimeListener(() => {
  getOrCreateStartHint().style.visibility = "hidden";
  parent.postMessage({ source: POST_MESSAGE_SOURCE, event: "timeStart" }, "*");
});

window.addEventListener(
  "message",
  (message) => {
    if (message.data.source !== POST_MESSAGE_SOURCE) {
      return;
    }

    const { event, payload } = message.data;
    if (event === "initSolve") {
      getOrCreateStartHint().style.visibility = "visible";
      api.importScramble(payload.scramble);
    }
    if (event === "settings") {
      const { settings } = payload;
      console.log(settings.csAnimationDuration);
      window.kernel.setProp("vrcSpeed", settings.csAnimationDuration);
    }
  },
  false,
);

function getOrCreateStartHint() {
  const existingStartHint = document.querySelector("#vs-start-hint");
  if (existingStartHint) {
    return existingStartHint;
  }

  const startHint = document.createElement("p");
  startHint.id = "vs-start-hint";
  startHint.innerText = "Make a move to start";
  document.querySelector("#container").appendChild(startHint);
  return startHint;
}

function getAlgCubingReconstruction(csReconstruction) {
  return csReconstruction
    .replace(/@(\d+)/g, "/*$1*/")
    .replace(/2-2Lw|2-2Rw'/g, "M")
    .replace(/2-2Rw/g, "M'")
    .replace(/2-2Fw/g, "S")
    .replace(/2-2Uw'/g, "E")
    .replace(/2-2Uw/g, "E'");
}
