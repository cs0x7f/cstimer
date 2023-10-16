window.api = {
  regSolvesListener: function (callback) {
    kernel.regListener("api", "time", (_, time) => {
      callback({
        reconstruction: time[4][0],
        time: time[2][1],
      });
    });
  },
  importScrambles: window._importScrambles,
  importColor: function (color) {
    window.kernel.ui.importColor(color);
  },
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
