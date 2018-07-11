// ---------------------------------
// DEPENDENCIES
// ---------------------------------
const express = require("express");
const router = express.Router();

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
// Once the register form is completed, create a USER and redirect to homepage
router.post("/", (req, res) => {
  User.findOne(
    {username: req.body.username},
    (err, foundUser) => {
      if(err){
        User.create(req.body, (err, createdUser) => {
          if(err) {
            res.send(err.message)
          } else {
            res.redirect("/");
          }
      });
      } else {
        res.send('Oops, that user already exists. Please log in or create a user with a different username. <a href="/">Go back</a>');
      }
    }
  );
});

// ---------------------------------
// MODULE EXPORTS - access this file in server.js
// ---------------------------------
module.exports = router;
