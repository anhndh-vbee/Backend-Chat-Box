const adminService = require("../services/admin");
const adminValidate = require("../validation/admin");

const addUserController = async (req, res) => {
  try {
    const { error } = adminValidate.validateAddUser(req.body);
    if (error) {
      return res.status(400).json({
        errMsg: error.details[0].message,
      });
    }
    const result = await adminService.addUserService(req.body);
    if (result && result.errMsg) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { addUserController };
