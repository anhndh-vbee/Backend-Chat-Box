const express = require("express");
const messageController = require("../controllers/message");
const rateController = require("../controllers/rate");

const router = express.Router();

router.post("/api/send-msg", messageController.sendMessage);
router.get("/api/get-msg/:id", messageController.getListMessage);
router.post("/api/send-rate", rateController.sendRate);

module.exports = router;
