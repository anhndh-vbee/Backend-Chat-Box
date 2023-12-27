const adminService = require("../services/admin");
const adminValidate = require("../validation/admin");
const xlsx = require("xlsx");
const fs = require("fs");

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

const uploadUserController = async (req, res, next) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({
        errMsg: "Not valid file",
      });
    } else if (!req.file) {
      return res.status(400).json({
        errMsg: "Please select a file to upload",
      });
    }
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    const result = await adminService.bulkAddUserService(data);

    const deletionTimeout = 150000;
    setTimeout(() => {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("File deleted successfully");
        }
      });
    }, deletionTimeout);

    return res.status(200).json({
      msg: "Upload file and read data successfully",
      result: result,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { addUserController, uploadUserController };
