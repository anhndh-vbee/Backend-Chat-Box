const bcrypt = require("bcrypt");
const userDaos = require("../daos/user");
const configs = require("../configs/index");
const extractName = require("../utils/extractEmail");
const generateRandomString = require("../utils/randomString");

const addUserService = async (data) => {
  const { email } = data;
  const user = await userDaos.findUser({ email });
  if (!user) {
    const password = generateRandomString(8);
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const username = extractName(email);
    const role = configs.ROLE.TEACHER;
    const newUser = await userDaos.addUser({
      email,
      username,
      password: hashPassword,
      role,
      rawPass: password,
    });
    return newUser;
  }

  return {
    errMsg: "User existed",
  };
};

module.exports = { addUserService };
