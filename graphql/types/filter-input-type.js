const FilterInputType = `
  input FilterInput {
    activity_id: String!,
    action_types: [String]=["post", "comment", "reply", "repost"],
    keyword_query: String,
    minimum_influence_rating: Int=1,
    start_date: DateTime,
    end_date: DateTime,
  }
`;

module.exports = FilterInputType;
