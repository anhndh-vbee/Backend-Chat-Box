const messageDaos = require("../daos/message");
const userDaos = require("../daos/user");
const search = require("../utils/search");

const sendMessageService = async (data) => {
  const answer = await search();
  const newMsg = await messageDaos.createMessage({
    userId: data.userId,
    question: data.question,
    answer,
  });
  return newMsg;
};

const getListMessage = async (userId) => {
  const user = await userDaos.findUser({ _id: userId });
  if (!user) {
    return {
      errMsg: "User not found",
    };
  }

  const listMsg = await messageDaos.getMessageByUser(userId);
  return listMsg;
};

const deleteMessage = async (id) => {
  const msg = await messageDaos.findMessage({ _id: id });
  if (!msg) {
    return {
      errMsg: "Message not found",
    };
  }
  await messageDaos.deleteMessage(id);
  return true;
};

module.exports = { sendMessageService, getListMessage, deleteMessage };
