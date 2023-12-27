const express = require("express");
const messageController = require("../controllers/message");
const rateController = require("../controllers/rate");
const adminController = require("../controllers/admin");
const userController = require("../controllers/user");

const router = express.Router();

// admin
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
