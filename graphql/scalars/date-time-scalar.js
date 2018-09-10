const { GraphQLScalarType } = require('graphql');
const tryConvertDateObj     = require('../../utils/try-convert-date-object');

// gets invoked to parse client input that was passed through variables.
const parseDateTime = (value) => {
  try {
    return tryConvertDateObj(value).toISOString();
  } catch(e) {
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
  }
};

// gets invoked when serializing the result to send it back to a client.
const serializeDateTime = (value) => {
  try {
    return tryConvertDateObj(value).toISOString();
  } catch(e) {
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
  }
};

// gets invoked to parse client input that was passed inline in the query.
const parseLiteralDateTime = (ast) => {
  try {
    return tryConvertDateObj(ast.value).toISOString();
  } catch(e) {
    throw new Error('DateTime cannot represent an invalid ISO-8601 Date string');
  }
};

const DateTimeResolver = new GraphQLScalarType({
  name: 'DateTime',
  description: 'An ISO-8601 encoded UTC date string.',
  serialize: serializeDateTime,
  parseValue: parseDateTime,
  parseLiteral: parseLiteralDateTime,
});

exports.resolver = DateTimeResolver;

exports.scalar = `
  scalar DateTime
`;
