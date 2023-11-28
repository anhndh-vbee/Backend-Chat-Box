const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema(
  {
    msgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      unique: true,
    },
    like: Boolean,
    cohension: Number,
    precise: Number,
    nonRedundancy: Number,
    comment: String,
    finalPoint: Number,
  },
  {
    timestamps: true,
  }
);

const Rate = mongoose.model("Rate", rateSchema);

module.exports = Rate;
