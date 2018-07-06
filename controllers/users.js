const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

router.post("/", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;
