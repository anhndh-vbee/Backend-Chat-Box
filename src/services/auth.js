const jwt = require("jsonwebtoken");
const configs = require("../configs/index");
const tokenDaos = require("../daos/token");
const hashData = require("../utils/hash");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      data: user,
    },
    configs.JWT_ACCESS_KEY,
    { expiresIn: "3h" }
  );
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      data: user,
    },
    configs.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );

  const userToken = await tokenDaos.checkUserToken({ userId: user?._id });
  if (userToken) {
    await tokenDaos.deleteToken(userToken?._id);
  }
  const hashToken = hashData(refreshToken);
  await tokenDaos.addToken({ userId: user?._id, token: hashToken });
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
    jwt.verify(token, configs.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        reject({ errMsg: "Invalid token" });
      } else {
        const payload = user?.data;
        const newAccessToken = generateAccessToken(payload);
        resolve({
          accessToken: newAccessToken,
        });
      }
    });
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshTokenService,
};
