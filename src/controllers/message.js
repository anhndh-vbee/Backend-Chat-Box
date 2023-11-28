const messageValidate = require("../validation/message");
const messageService = require("../services/message");

const sendMessage = async (req, res) => {
  try {
    const { error } = messageValidate(req.body);
    if (error) {
      return res.json({
        errMsg: error.details[0].message,
      });
    }
    const result = await messageService.sendMessageService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getListMessage = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await messageService.getListMessage(userId);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { sendMessage, getListMessage };
