const Rate = require("../models/rate");

const findRate = async (condition) => {
  const rate = await Rate.findOne({ condition });
  return rate;
};

const getListRate = async (condition) => {
  const listRate = await Rate.find({ condition });
  return listRate;
};

const addRate = async ({
  msgId,
  like,
  cohension,
  precise,
  nonRedundancy,
  comment,
  finalPoint,
}) => {
  const newRate = await Rate.create({
    msgId,
    like,
    cohension,
    precise,
    nonRedundancy,
    comment,
    finalPoint,
  });
  return newRate;
};

module.exports = { findRate, getListRate, addRate };
