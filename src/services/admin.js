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

const bulkAddUserService = async (data) => {
  const userList = await Promise.all(
    data.map(async (user) => {
      const checkUser = await userDaos.findUser({ email: user["Email"] });
      if (checkUser) {
        return null;
      }
      const password = generateRandomString(8);
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const username = extractName(user["Email"]);
      const role = configs.ROLE.TEACHER;

      return {
        username,
        rawPass: password,
        password: hashPassword,
        role,
        email: user["Email"],
      };
    })
  );

  const userListNotExisted = userList.filter((user) => user !== null);

  const result = await userDaos.bulkInsertUser(userListNotExisted);
  return result;
};

const updatePasswordForUserService = async (data) => {
  const { email } = data;
  const user = await userDaos.findUser({ email });
  if (user) {
    const password = configs.NEW_PASS;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await userDaos.updateUser({ email }, { password: hashPassword });
    return {
      msg: "Update successfully",
    };
  }

  return {
    errMsg: "Not found user",
  };
};

const getListPasswordForUser = async (data) => {};

module.exports = {
  addUserService,
  bulkAddUserService,
  updatePasswordForUserService,
};
