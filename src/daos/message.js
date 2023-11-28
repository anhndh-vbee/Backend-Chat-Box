const Message = require("../models/message");

const findMessage = async (condition) => {
  const msg = await Message.findOne(condition);
  return msg;
};

const getMessageByUser = async (userId) => {
  const listMessage = await Message.find({ userId });
  return listMessage;
};

const createMessage = async ({ userId, question, answer }) => {
  const newMessage = await Message.create({
    userId,
    question,
    answer,
  });
  return newMessage;
};

const deleteMessage = async (id) => {
  await Message.findByIdAndDelete(id);
};

module.exports = {
  getMessageByUser,
  deleteMessage,
  createMessage,
  findMessage,
};
