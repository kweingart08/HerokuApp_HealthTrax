const express = require("express");
const router = express.Router();
const User = require("../models/users.js");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});


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

router.get("/user", (req, res) => {
  res.render("sessions/userIndex.ejs", {
    currentUser: req.session.currentUser
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
