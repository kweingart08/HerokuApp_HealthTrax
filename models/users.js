const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Doctor = require("../models/doctors.js");

const userSchema = Schema({
  username: String,
  password: String,
  doctors: [
    {
    name: String,
    address: String,
    phone: String,
    last_visit: Date,
    next_visit: Date,
    note: String
    }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
