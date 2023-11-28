const rateValidate = require("../validation/rate");
const rateService = require("../services/rate");

const sendRate = async (req, res) => {
  try {
    const { error } = rateValidate(req.body);
    if (error) {
      return res.json({
        errMsg: error.details[0].message,
      });
    }

    const result = await rateService.addRateService(req.body);
    return res.json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { sendRate };
