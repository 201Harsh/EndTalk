const userModel = require("../models/user.model");

module.exports.CreateAUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const Newuser = userModel.create({
    name,
    email,
    password,
  });
  return Newuser;
};
