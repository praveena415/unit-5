function waitMessage(message, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, ms);
  });
}

module.exports = { waitMessage };
