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

// === IF ADD DOCTOR LINK CLICKED, GO HERE AND SHOW NEW DOCTOR EJS ===
router.get("/newdoctor", (req, res) => {
  res.render("sessions/newDoctor.ejs", {
    currentUser: req.session.currentUser
  });
});


// ==== POST NEW DOCTOR - CREATE AND PUSH TO CURRENT PERSON ===
router.post("/user", (req, res) => {
  console.log(req.session.currentUser);
  console.log(req.body);
  req.session.currentUser.doctors.push(req.body);
//need to take information from form and create a Doctor
  Doctor.create(req.body, (err, createdDoctor)=>{
    //doctor is created - need to figure out how to push new doctor into users model array of current user
    res.redirect("/sessions/user");
  });
});


module.exports = router;
