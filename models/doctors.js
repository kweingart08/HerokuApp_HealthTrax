const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/users.js");

const doctorSchema = Schema({
  type: String,
  name: String,
  address: String,
  phone: String,
  last_visit: Date,
  next_visit: Date,
  url: String,
  note: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
