if (!Array.prototype.$flatMap) {
  Array.prototype.$flatMap = function (cb) {
    return this
      .map(cb)
      .reduce((acc, cur) => acc.concat(cur), []);
  };
}

// if (!Array.prototype.reduceArray) {
//   Array.prototype.reduceArray = function () {
//     return this.reduce((acc, cur) => acc.concat(cur), []);
//   };
// }
