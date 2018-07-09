const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Doctor = require("../models/doctors.js");

// === when click the log in button on the front home page/index, direct to sessions/new and show the new sessions ejs file ===
router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// ===== LOG OUT OF SESSION / DESTROY SESSION =====
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// === during log in, when submit, find the user or send wrong password ===
router.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(req.body.password == foundUser.password){
      req.session.currentUser = foundUser;
      res.redirect("/sessions/user/" + foundUser._id);
    } else {
      res.send("wrong password");
    }
  });
});

// ===== AFTER LOG IN - DIRECT TO /USER AND SHOW USERINDEX.EJS =====
router.get("/user/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("sessions/userIndex.ejs", {
      currentUser: foundUser
    });
  });
});


// === IF ADD DOCTOR LINK CLICKED, GO HERE AND SHOW NEW DOCTOR EJS ===
router.get("/newdoctor", (req, res) => {
  res.render("sessions/newDoctor.ejs", {
    currentUser: req.session.currentUser
  });
});

router.get("/doctor/:id", (req, res) => {
  Doctor.findById(req.params.id, (err, foundDoctor) => {
    console.log(foundDoctor);
    res.render("sessions/doctorShow.ejs", {
      doctor: foundDoctor
    });
  });
});

router.delete("/doctor/:id", (req, res) => {
  //find the doctor by id in the users list and delete from users list
  Doctor.findByIdAndRemove(req.params.id, (err, doctor) => {
    res.redirect("/sessions/user")
  });
});

// ==== POST NEW DOCTOR - CREATE AND PUSH TO CURRENT PERSON ===
router.post("/user", (req, res) => {
  //new doctor is pushed into the doctors array of the user
  let doctorId;
  let user = req.session.currentUser.username;

  Doctor.create(req.body, (err, createdDoctor) => {
      doctorId = createdDoctor._id;

      Doctor.findById(
        doctorId,
        (err, foundDoctor) => {
          console.log(err);
          User.findOneAndUpdate(
            {username: user},
            {$push: {doctors: foundDoctor}},
            {new: true},
            (err, updatedUser) => {
              res.redirect("/sessions/user");
            }
          );
        }
      );
  });
});


module.exports = router;
