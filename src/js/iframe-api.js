window.api = (function () {
  function regSolvesListener(callback) {
    kernel.regListener("api", "time", (_, time) => {
      callback({
        reconstruction: time[4][0],
        time: time[2][1],
      });
    });
  }

  function importScrambles(arr) {
    // TODO auto reveal 1st scramble
    kernel.hideDialog()
    window._clearSession()

    const str = arr.join("\n");
    window._importScrambles(str);

    window._resetTimer()
  }

  function tweakStyles() {
    const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');

      #wndctn > div, .dialog, #gray, #avgstr, .difflabel {
        visibility: hidden !important;
        position: absolute;
      }
      body {
        background-color: #11191F !important;
      }
      .click {
        color: #A0A3A5 !important;
      }
      .activetimer {
        color: #FFFFFF !important;
      }
      .click, .activetimer {
        font-family: 'Space Grotesk', sans-serif !important;
      }
      .click {
        font-size: 24px !important;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }

  function setInputModeToVirtual() {
    window.kernel.setProp("input", "v");
  }

  return {
    setup: function (solvesListener, scrambles) {
      tweakStyles();
      setInputModeToVirtual();
      regSolvesListener(solvesListener);
      importScrambles(scrambles);
    },
    importScrambles
  };
})();
