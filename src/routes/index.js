const express = require("express");
const multer = require("multer");
const path = require("path");
const { checkToken, checkAuthAdmin } = require("../middleware");
const messageController = require("../controllers/message");
const rateController = require("../controllers/rate");
const adminController = require("../controllers/admin");
const userController = require("../controllers/user");
const authController = require("../controllers/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(xlsx|XLSX)$/)) {
    const error = new Error("Only xlsx files are allowed!");
    error.status = 400;
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// auth
router.post("/api/refresh-token", authController.refreshTokenController);
router.get("/api/verify", checkToken, authController.verifyController);

// admin
router.post(
  "/api/upload-user",
  checkAuthAdmin,
  upload.single("file"),
  adminController.uploadUserController
);
router.post("/api/add-user", checkAuthAdmin, adminController.addUserController);

// user
router.post("/api/login", userController.loginController);
router.put("/api/change-pass", userController.changePasswordController);

// message
router.post("/api/send-msg", checkToken, messageController.sendMessage);
router.get("/api/get-msg/:id", checkToken, messageController.getListMessage);

// rate
router.post("/api/send-rate", checkToken, rateController.sendRate);

module.exports = router;
