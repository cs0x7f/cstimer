const api = (function () {
  function regReadyListener(callback) {
    if (window._vsReady) {
      callback(); // workaround in case integration.js runs after the signal is pushed
    } else {
      kernel.regListener("api", "vs-ready", callback);
    }
  }

  function regSolveFinishListener(callback) {
    kernel.regListener(
      "api",
      "vs-time",
      (_, { isDnf, timeMs, reconstruction: csReconstruction }) => {
        if (isDnf) {
          callback({ isDnf: true });
        } else {
          callback({
            isDnf: false,
            reconstruction: csToAlgCubingReconstruction(csReconstruction),
            timeMs,
          });
        }
      },
    );
  }

  function regSolveStartListener(callback) {
    kernel.regListener("api", "timerStatus", (_, status) => {
      if (status === -3) {
        callback();
      }
    });
  }

  function importScramble({ scramble, discipline }) {
    window._resetTimer();
    kernel.pushSignal("scramble", [DISCIPLINE_MAP[discipline], scramble]);

    window.focus();
    kernel.blur();
  }

  const DISCIPLINE_MAP = { "3by3": "333", "2by2": "222so" };

  return {
    regReadyListener,
    regSolveStartListener,
    regSolveFinishListener,
    importScramble,
  };
})();

localStorage.removeItem("cachedStr");
localStorage.removeItem("properties");

kernel.setProp("input", "v");
kernel.setProp("useIns", "a");

const POST_MESSAGE_SOURCE = "vs-solver-integration";
api.regReadyListener(() =>
  parent.postMessage({ source: POST_MESSAGE_SOURCE, event: "ready" }, "*"),
);
api.regSolveStartListener(() => {
  getOrCreateStartHint().style.visibility = "hidden";
  parent.postMessage({ source: POST_MESSAGE_SOURCE, event: "solveStart" }, "*");
});
api.regSolveFinishListener((result) => {
  parent.postMessage(
    { source: POST_MESSAGE_SOURCE, payload: { result }, event: "solveFinish" },
    "*",
  );
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
      api.importScramble(payload);
    }
    if (event === "abortSolve") {
      window._resetTimer();
    }
    if (event === "settings") {
      const { settings } = payload;
      window.kernel.setProp("vrcSpeed", settings.csAnimationDuration);
      console.log(VOICE_INS_MAP[settings.csInspectionVoiceAlert]);
      window.kernel.setProp(
        "voiceIns",
        VOICE_INS_MAP[settings.csInspectionVoiceAlert],
      );
    }
  },
  false,
);

const VOICE_INS_MAP = {
  None: "n",
  Male: "1",
  Female: "2",
};

function getOrCreateStartHint() {
  const existingStartHint = document.querySelector("#vs-start-hint");
  if (existingStartHint) {
    return existingStartHint;
  }

  const startHint = document.createElement("p");
  startHint.id = "vs-start-hint";
  startHint.innerText =
    "Press space to scramble the cube and start the preinspection";
  document.querySelector("#container").appendChild(startHint);
  return startHint;
}

function csToAlgCubingReconstruction(csReconstruction) {
  return csReconstruction
    .replace(/@(\d+)/g, "/*$1*/")
    .replace(/2-2Lw|2-2Rw'/g, "M")
    .replace(/2-2Rw/g, "M'")
    .replace(/2-2Fw/g, "S")
    .replace(/2-2Uw'/g, "E")
    .replace(/2-2Uw/g, "E'");
}
