const { GraphQLScalarType } = require('graphql');
const isDateObject          = require('../../utils/is-date-object');

// gets invoked to parse client input that was passed through variables.
const parseDateTime = (value) => {
  if (!isDateObject(value)) {
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
  }

  return value;
};

// gets invoked when serializing the result to send it back to a client.
const serializeDateTime = (value) => {
  if (!isDateObject(value)) {
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
  }

  return value.toISOString();
};

// gets invoked to parse client input that was passed inline in the query.
const parseLiteralDateTime = (ast) => {
  if (!isDateObject(ast.value)) {
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
  }

  return ast.value.toISOString();
};

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'An ISO-8601 encoded UTC date string.',
  serialize: serializeDateTime,
  parseValue: parseDateTime,
  parseLiteral: parseLiteralDateTime,
});

module.exports = DateTime;
