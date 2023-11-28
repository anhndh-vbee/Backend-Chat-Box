const mongoose = require("mongoose");
const configs = require("./index");

const connectDB = async () => {
  try {
    await mongoose.connect(configs.MONGODB_URL);
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Some thing went wrong when connect to database:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
