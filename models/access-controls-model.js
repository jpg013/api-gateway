const accessControlsModel = joi => {
  const schema = {
    subject_location: joi.object({
      hasInfluenceAccess: joi.boolean().invalid(false).required(),
      hasProAccess: joi.boolean().required(),
      isSysAdmin: joi.boolean().required(),
    })
  };

  const validate = objData => {
    const validationSchema = Object.keys(objData).reduce((acc, curr) => {
      return Object.assign({}, { ...acc }, {
        [curr]: schema[curr]
      });
    }, {});

    const { value, error } = joi.validate(objData, validationSchema);

    if (error) {
      throw new Error(error);
    }

    return value;
  };

  return {
    validate
  };
};

module.exports = accessControlsModel;
