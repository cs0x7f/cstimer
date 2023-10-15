// also see "window.injectScrambles"

window.injectSolveListener = function (callback) {
  kernel.regListener("injection", "time", (...args) => {
    const reconstruction = args[1][4][0]
    callback({ reconstruction });
    // callback(args);
    // console.log(args)
  });
};
