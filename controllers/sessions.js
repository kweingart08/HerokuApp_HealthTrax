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

router.get("/doctor/:id", (req, res) => {
  // Doctor.findOne({name: })
  //find and show only the doctor with the id
  
  res.render("sessions/doctorShow.ejs");
});

// ==== POST NEW DOCTOR - CREATE AND PUSH TO CURRENT PERSON ===
router.post("/user", (req, res) => {
  //new doctor is pushed into the doctors array of the user
  Doctor.create(req.body, (err, createdDoctor) => {
    doctor: createdDoctor
  });

  User.findOneAndUpdate(
    {username: req.session.currentUser.username},
    {$push: {doctors: req.body}},
    {new: true},
    (err, updatedUser) => {
      res.redirect("/sessions/user");
    }
  );
});

module.exports = router;
