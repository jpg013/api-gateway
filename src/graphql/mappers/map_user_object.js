module.exports = function(obj={}) {
  const {
    userName: user_name,
    firstName: first_name,
    lastName: last_name,
    userId: id,
    email,
    phone
  } = obj

  return {
    user_name,
    first_name,
    last_name,
    id,
    email,
    phone
  }
}
