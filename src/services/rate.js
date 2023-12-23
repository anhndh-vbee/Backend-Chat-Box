const rateDaos = require("../daos/rate");
const messageDaos = require("../daos/message");

const addRateService = async (data) => {
  const msg = await messageDaos.findMessage({ _id: data.msgId });
  if (!msg || msg.rated === true) {
    return {
      errMsg: "Message not found or had been rated",
    };
  }
  const finalPoint =
    data.precise * 0.8 + data.cohension * 0.15 + data.nonRedundancy * 0.05;
  msg.rated = true;
  await msg.save();
  const newRate = await rateDaos.addRate({ ...data, finalPoint });
  return newRate;
};

// const getListRateInTime = async (data) => {

// }

module.exports = { addRateService };
