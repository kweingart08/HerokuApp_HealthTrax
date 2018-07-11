// ---------------------------------
// DEPENDENCIES
// ---------------------------------
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// ---------------------------------
// MODELS
// ---------------------------------
const User = require("../models/users.js");


// ---------------------------------
// ROUTES
// ---------------------------------

// New: GET  "/users/new"
// when register button is clicked on homepage - render new.ejs
router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

// Create: POST "/users"
// Once the register form is completed, create a USER and redirect to homepage. Make sure that user doesn't already exist.
router.post("/", (req, res) => {
  User.findOne(
    {username: req.body.username},
    (err, foundUser) => {
      if(foundUser){
        res.send('Oops, that user already exists. Please log in or create a user with a different username. <a href="/">Go back</a>');
      } else {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        User.create(req.body, (err, createdUser) => {
          if(err) {
            res.send(err.message)
          } else {
            res.redirect("/sessions/user/" + createdUser._id);
          }
      });
    }
  });
});

// ---------------------------------
// MODULE EXPORTS - access this file in server.js
// ---------------------------------
module.exports = router;
