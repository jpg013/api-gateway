const { subjectLocationService }  = require('../../services');

module.exports = async (obj, args, context, info) => {
  console.log('in the subject location resolver');
  console.log(args)
  // Call the subject location service and return the results
  return await subjectLocationService.getSubjectLocations();
};
