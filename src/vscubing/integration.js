const api = (function () {
  function regSolvesListener(callback) {
    kernel.regListener("api", "time", (_, time) => {
      const dnf = time[2][0] === -1;
      if (dnf) {
        callback({ dnf: true });
        return;
      }

      const csReconstruction = time[4][0];
      const algCubingReconstruction = csReconstruction
        .replace(/@(\d+)/g, "/*$1*/")
        .replace(/-/g, "&#45;");

      callback({
        reconstruction: algCubingReconstruction,
        timeMs: time[2][1],
      });
    });
  }

  function importScramble(str) {
    kernel.hideDialog();
    window._clearSession();

    window._importScrambles(str);

    window._resetTimer();
    setTimeout(() => {
      window._scrambleVirtual();
    }, 0);
    window.focus();
  }

  function setInputModeToVirtual() {
    window.kernel.setProp("input", "v");
  }

  return {
    setInputModeToVirtual,
    regSolvesListener,
    importScramble,
  };
})();
const POST_MESSAGE_SOURCE = "vs-solver-integration";

window.addEventListener("load", () => {
  api.setInputModeToVirtual();
});

api.regSolvesListener((result) => {
  parent.postMessage({ source: POST_MESSAGE_SOURCE, payload: result }, "*");
});

window.addEventListener(
  "message",
  (event) => {
    const { source, scramble } = event.data;
    if (source !== POST_MESSAGE_SOURCE) {
      return;
    }

    api.importScramble(scramble);
  },
  false,
);
