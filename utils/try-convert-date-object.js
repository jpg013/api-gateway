const isDateObject = require('./is-date-object');

module.exports = function tryConvertDateTime(val) {
  const dt = new Date(val);

  if (!isDateObject(val)) {
    throw new TypeError(`Cannot convert value '${val}' to date object.`);
  }

  return dt;
};
