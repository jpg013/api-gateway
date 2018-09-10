const dateTimeScalar = require('./date-time-scalar');

exports.scalarResolvers = {
  DateTime: dateTimeScalar.resolver,
};

exports.scalarTypes = [
  dateTimeScalar.scalar,
];
