const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
  username: String,
  password: String,
  rawPass: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
