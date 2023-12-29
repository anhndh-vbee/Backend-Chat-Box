const userService = require("../services/user");
const userValidate = require("../validation/user");

const loginController = async (req, res) => {
  try {
    const { error } = userValidate.validateLogin(req.body);
    if (error) {
      return res.status(400).json({
        errMsg: error.details[0].message,
      });
    }

    const result = await userService.loginService(req.body);
    if (result && result.errMsg) {
      return res.status(401).json(result);
    }
    const { refreshToken, accessToken } = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { error } = userValidate.validateChangePassword(req.body);
    if (error) {
      return res.status(400).json({ errMsg: error.details[0].message });
    }
    const result = await userService.changePasswordService(req.body);
    if (result && result.errMsg) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { loginController, changePasswordController };
