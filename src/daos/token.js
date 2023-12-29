const Token = require("../models/token");

const addToken = async ({ userId, token }) => {
  const newToken = await Token.create({
    userId,
    token,
  });

  return newToken;
};

const checkUserToken = async (condition) => {
  const check = await Token.findOne(condition);
  return check;
};

const deleteToken = async (id) => {
  await Token.findByIdAndDelete(id);
};

module.exports = { checkUserToken, deleteToken, addToken };
