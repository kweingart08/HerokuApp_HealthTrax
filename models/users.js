const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Doctor = require("../models/doctors.js");

const userSchema = Schema({
  username: String,
  password: String,
  doctors: [String]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
