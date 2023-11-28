const userDaos = require("../daos/user");

const getUserService = async (email) => {
  const user = await userDaos.findUser({ email });
  if (!user) {
    return {
      errMsg: "User not found",
    };
  }
  return user;
};

module.exports = { getUserService };
