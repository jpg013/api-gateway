const { subjectLocationService }  = require('../../services');

module.exports = async (obj, args, context, info) => {
  // TODO - obliterate this shit.
  const params = {
    activityId: args.filter.activity_id,
    actionTypes: args.filter.action_types,
    minimumInfluenceRating: args.filter.minimum_influence_rating,
    stardDate: args.filter.start_date,
    endDate: args.filter.end_date,
  };

  // Call the subject location service and return the results
  return await subjectLocationService.getSubjectLocations(params, context.bearerToken);
};
