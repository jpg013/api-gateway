module.exports = dt => dt && Object.prototype.toString.call(dt) === '[object Date]' && !isNaN(dt.getTime());
