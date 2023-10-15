// also see "window.injectScrambles"

window.injectSolveListener = function (callback) {
  kernel.regListener("injection", "time", function () {
    callback(...arguments);
  });
};
