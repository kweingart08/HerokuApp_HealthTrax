const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

// ==== GO TO /NEW ROUTE AND SHOW THE NEW EJS PAGE & FORM TO CREATE NEW USE ====
router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

// === when the form is completed, post to /sessions and redirect to index route ===
router.post("/", (req, res) => {
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;
