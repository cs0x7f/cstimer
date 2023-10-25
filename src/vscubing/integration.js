const api = (function () {
  function regSolvesListener(callback) {
    kernel.regListener("api", "time", (_, time) => {
      const dnf = time[2][0] === -1;
      if (dnf) {
        callback({ dnf: true });
        return;
      }

      callback({
        reconstruction: time[4][0],
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

window.addEventListener("load", () => {
  api.setInputModeToVirtual();
});

// api.regSolvesListener((result) => {
//   parent.postMessage(result);
// });

window.addEventListener(
  "message",
  (event) => {
    if (event.data.source !== "vs-integration") {
      return;
    }

    const { scramble, onSolve } = event.data;
    api.importScramble(scramble);
    api.regSolvesListener(onSolve);
  },
  false,
);
