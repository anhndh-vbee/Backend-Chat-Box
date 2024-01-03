const jwt = require("jsonwebtoken");
const configs = require("../configs/index");
const userService = require("../services/user");

const checkToken = async (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, configs.JWT_ACCESS_KEY, async (err, data) => {
      if (err) {
        return res.status(403).json({ errMsg: "Token is invalid" });
      }
      const result = await userService.getUserById(data?.userId);
      if (result.errMsg) {
        return res.status(404).json({ errMsg: "User not found" });
      }
      req.user = result;
      if (["/api/logout", "/api/verify"].includes(req.path)) {
        req.accessToken = accessToken;
      }
      next();
    });
  } else {
    return res.status(401).json({ errMsg: "Not authenticated" });
  }
};

const checkAuthAdmin = (req, res, next) => {
  checkToken(req, res, () => {
    if (req.user.role === configs.ROLE.ADMIN) {
      next();
    } else {
      return res.status(403).json({ errMsg: "Access denied. Not authorized." });
    }
  });
};

const checkAuthTeacher = (req, res, next) => {
  checkToken(req, res, () => {
    if (req.user.role === configs.ROLE.TEACHER) {
      next();
    } else {
      return res.status(403).json({ errMsg: "Access denied. Not authorized." });
    }
  });
};

module.exports = { checkToken, checkAuthAdmin, checkAuthTeacher };
