const userDaos = require("../daos/user");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("./auth");

const getUserService = async (email) => {
  const user = await userDaos.findUser({ email });
  if (!user) {
    return {
      errMsg: "User not found",
    };
  }
  return user;
};

const loginService = async (data) => {
  const { email, password } = data;
  const user = await userDaos.findUser({ email });
  if (user) {
    const checkPassword = await bcrypt.compare(password, user?.password);
    if (checkPassword) {
      const userId = user?._id;
      const accessToken = generateAccessToken(userId);
      const refreshToken = await generateRefreshToken(userId);
      return { refreshToken, accessToken };
    }
    return {
      errMsg: "Wrong password",
    };
  }
  return {
    errMsg: "Wrong email",
  };
};

const changePasswordService = async (data) => {
  const { email, oldPass, newPass, confirmPass } = data;
  const user = await userDaos.findUser({ email });
  if (user) {
    const checkPassword = await bcrypt.compare(oldPass, user?.password);
    if (checkPassword) {
      if (newPass === confirmPass) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPass, salt);
        const user = await userDaos.updateUser(
          { email },
          {
            password: hashPassword,
            rawPass: null,
          }
        );
        const { password, rawPass, ...otherFields } = user._doc;
        return otherFields;
      }

      return {
        errMsg: "Wrong confirm password",
      };
    }

    return {
      errMsg: "Wrong password",
    };
  }

  return {
    errMsg: "User not found",
  };
};

module.exports = { getUserService, loginService, changePasswordService };
