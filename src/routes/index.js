const express = require("express");
const multer = require("multer");
const path = require("path");
const messageController = require("../controllers/message");
const rateController = require("../controllers/rate");
const adminController = require("../controllers/admin");
const userController = require("../controllers/user");

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

// admin
router.post(
  "/api/upload-user",
  upload.single("file"),
  adminController.uploadUserController
);
router.post("/api/add-user", adminController.addUserController);

// user
router.post("/api/login", userController.loginController);
router.put("/api/change-pass", userController.changePasswordController);

// message
router.post("/api/send-msg", messageController.sendMessage);
router.get("/api/get-msg/:id", messageController.getListMessage);

// rate
router.post("/api/send-rate", rateController.sendRate);

module.exports = router;
