const info = (...params) => {
  console.log(...params);
};

const error = (...parmas) => {
  console.error(...parmas);
};

module.exports = {
  info,
  error,
};
