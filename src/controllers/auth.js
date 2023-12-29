const authService = require("../services/auth");

const refreshTokenController = async (req, res) => {
  try {
    if (!req.body.refreshToken) {
      return res.status(400).json({
        errMsg: "Not found token",
      });
    }
    const result = await authService.refreshTokenService(req.body.refreshToken);
    if (result && result.errMsg) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { refreshTokenController };
