const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email adrress is already in use";
    return errors;
  }
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports = handleErrors;
