module.exports = dt => {
  if (Object.prototype.toString.call(dt) !== '[object Date]') {
    dt = new Date(dt);
  }

  return !isNaN(dt.getTime());
};
