const jwt = require("jsonwebtoken");
const configs = require("../configs/index");
const tokenDaos = require("../daos/token");
const userDaos = require("../daos/user");
const hashData = require("../utils/hash");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, configs.JWT_ACCESS_KEY, { expiresIn: "3h" });
};

const generateRefreshToken = async (userId) => {
  const refreshToken = jwt.sign({ userId }, configs.JWT_REFRESH_KEY, {
    expiresIn: "365d",
  });

  const userToken = await tokenDaos.checkUserToken({ userId });
  if (userToken) {
    await tokenDaos.deleteToken(userToken?._id);
  }
  const hashToken = hashData(refreshToken);
  await tokenDaos.addToken({ userId, token: hashToken });
  return refreshToken;
};

const refreshTokenService = async (token) => {
  const hashToken = hashData(token);
  const check = await tokenDaos.checkUserToken({ token: hashToken });
  if (!check) {
    return {
      errMsg: "Invalid token",
    };
  }
  return new Promise((resolve, reject) => {
    jwt.verify(token, configs.JWT_REFRESH_KEY, (err, data) => {
      if (err) {
        reject({ errMsg: "Invalid token" });
      } else {
        const newAccessToken = generateAccessToken(data.userId);
        resolve({
          accessToken: newAccessToken,
        });
      }
    });
  });
};

const verifyToken = async (token) => {
  const data = jwt.verify(token, configs.JWT_ACCESS_KEY);
  const { userId } = data;
  const user = await userDaos.findUser({ _id: userId });
  return user;
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshTokenService,
  verifyToken,
};
