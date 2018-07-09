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

// ===== AFTER LOG IN - DIRECT TO /USER/id AND SHOW USERINDEX.EJS =====
router.get("/user/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("sessions/userIndex.ejs", {
      currentUser: foundUser
    });
  });
});

// === IF ADD DOCTOR LINK CLICKED, GO HERE AND SHOW NEW DOCTOR EJS ===
router.get("/user/:id/newdoctor", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("sessions/newDoctor.ejs", {
      currentUser: foundUser
    });
  });
});


// ==== POST NEW DOCTOR - CREATE AND PUSH TO CURRENT PERSON ===
router.post("/user/:id/newdoctor", (req, res) => {
  //new doctor is pushed into the doctors array of the user
  let doctorId;

  Doctor.create(req.body, (err, createdDoctor) => {
      doctorId = createdDoctor._id;

      Doctor.findById(
        doctorId,
        (err, foundDoctor) => {
          User.findOneAndUpdate(
            {_id: req.params.id},
            {$push: {doctors: foundDoctor}},
            {new: true},
            (err, updatedUser) => {
              res.redirect("/sessions/user/" + req.params.id);
            }
          );
        }
      );
  });
});

// === when you click on the doctors name, go to this route and show doctor information ===
router.get("/doctor/:userid/:doctorid", (req, res) => {
  Doctor.findById(req.params.doctorid, (err, foundDoctor) => {
    console.log(foundDoctor);
    res.render("sessions/doctorShow.ejs", {
      doctor: foundDoctor,
      user_id: req.params.userid,
      indexOfDoctor: req.params.indexOfDoctor
    });
  });
});

// ===if you click delete, find doctors id inside of the user and delete from user but keep doctor in doctor database===
router.delete("/doctor/:userid/:doctorid", (req, res) => {
  //find the doctor by id in the users list and delete from users list
  User.findByIdAndUpdate(req.params.userid, {$pull:{doctors: {_id: req.params.doctorid}}}, (err, removeDoc) => {
    res.redirect("/sessions/user/" + req.params.userid)
  });
});

// ===doctor edit route===
router.get("/doctor/:userid/:doctorid/edit", (req, res) => {
  Doctor.findById(req.params.doctorid, (err, foundDoctor) =>{
    console.log(foundDoctor);
    res.render("sessions/doctorEdit.ejs", {
      doctor: foundDoctor,
      user_id: req.params.userid
    });
  });
});

// === put route that updates the doctor information after editing ===
router.put("/doctor/:userid/:doctorid", (req, res) => {

  Doctor.findByIdAndUpdate(req.params.doctorid, req.body, {new:true}, (err, updatedDoctor) => {

    //want to put this updated doctor in the user database

    User.findByIdAndUpdate(req.params.userid,
      {
        $pull: {doctors: {_id: req.params.doctorid}},
      },
      {new:true},

      (err, updatedUser) => {

        User.findByIdAndUpdate(req.params.userid,
      {
        $push: {doctors: updatedDoctor}
      },
      {new: true},
      (err, updatedUserAgain) => {
        res.redirect("/sessions/doctor/" + req.params.userid + "/" + req.params.doctorid);
      });
    });
  });
});


module.exports = router;
