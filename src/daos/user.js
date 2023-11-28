const User = require("../models/user");

const findUser = async (condition) => {
  const user = await User.findOne(condition).select([
    "username",
    "email",
    "role",
  ]);
  return user;
};

const getListUser = async () => {
  const user = await User.find({});
  return user;
};

module.exports = { findUser, getListUser };
