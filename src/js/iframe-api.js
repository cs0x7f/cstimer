window.api = {
  solveListener: function (callback) {
    kernel.regListener("api", "time", (...args) => {
      const reconstruction = args[1][4][0];
      callback({ reconstruction });
    });
  },
  pushScrambles: window._pushScrambles,
  hideUi: function () {
    const styles = `
      #wndctn > div, .dialog, #gray {
        visibility: hidden !important;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  },
  setInputModeToVirtual: function () {
    window.kernel.setProp("input", "v");
  },
};
