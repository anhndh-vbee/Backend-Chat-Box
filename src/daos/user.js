const User = require("../models/user");

const findUser = async (condition) => {
  const user = await User.findOne(condition);
  return user;
};

const getListUser = async () => {
  const user = await User.find({});
  return user;
};

const addUser = async ({ email, username, password, role, rawPass }) => {
  const newUser = await User.create({
    email,
    username,
    password,
    role,
    rawPass,
  });
  return newUser;
};

const bulkInsertUser = async (data) => {
  const result = await User.insertMany(data);
  return result;
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
};

const updateUser = async (condition, data) => {
  const result = await User.findOneAndUpdate(condition, data, { new: true });
  return result;
};

module.exports = {
  findUser,
  getListUser,
  addUser,
  bulkInsertUser,
  deleteUser,
  updateUser,
};
