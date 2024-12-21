const api = (function () {
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
    regSolveFinishListener,
    regStartTimeListener,
    importScramble,
  };
})();

const POST_MESSAGE_SOURCE = "vs-solver-integration";
window.addEventListener("load", () => {
  api.setInputModeToVirtual();
  createAnimationSettingCheckbox();

  api.regSolveFinishListener((result) => {
    parent.postMessage(
      { source: POST_MESSAGE_SOURCE, payload: result, event: "solveFinish" },
      "*",
    );
  });
  api.regStartTimeListener(() => {
    getOrCreateStartHint().style.visibility = "hidden";
    parent.postMessage(
      { source: POST_MESSAGE_SOURCE, event: "timeStart" },
      "*",
    );
  });
});

window.addEventListener(
  "message",
  (event) => {
    const { source, scramble } = event.data;
    if (source !== POST_MESSAGE_SOURCE) {
      return;
    }

    getOrCreateStartHint().style.visibility = "visible";
    api.importScramble(scramble);
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

function createAnimationSettingCheckbox() {
  const speed = localStorage.getItem("vs-vrc-speed") ?? 100;
  window.kernel.setProp("vrcSpeed", speed);

  const label = document.createElement("label");
  label.id = "vs-animation-setting";
  label.textContent = "Animation enabled";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = speed === 100;
  label.prepend(checkbox);
  document.querySelector("body").appendChild(label);

  checkbox.addEventListener("change", (event) => {
    const newSpeed = event.target.checked ? 100 : 0;
    window.kernel.setProp("vrcSpeed", newSpeed);
    localStorage.setItem("vs-vrc-speed", newSpeed);
    kernel.blur();
  });

  return checkbox;
}
