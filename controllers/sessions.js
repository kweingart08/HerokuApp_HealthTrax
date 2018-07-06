const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Doctor = require("../models/doctors.js");

// === when click the log in button on the front home page/index, direct to sessions/new and show the new sessions ejs file ===
router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// === during log in, when submit, find the user or send wrong password ===
router.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(req.body.password == foundUser.password){
      req.session.currentUser = foundUser;
      res.redirect("/sessions/user");
    } else {
      res.send("wrong password");
    }
  });
});

// ===== AFTER LOG IN - DIRECT TO /USER AND SHOW USERINDEX.EJS =====
router.get("/user", (req, res) => {
  res.render("sessions/userIndex.ejs", {
    currentUser: req.session.currentUser
  });
});

// ===== LOG OUT OF SESSION / DESTROY SESSION =====
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.get("/doctor", (req, res) => {
  res.render("sessions/newDoctor.ejs");
});

router.post("/user", (req, res) => {
  res.send("posting-at doctor page to add doctor - this page should have an index with form to post");
});


module.exports = router;
