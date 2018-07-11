// ---------------------------------
// DEPENDENCIES
// ---------------------------------
const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const bcrypt = require("bcrypt");

// ---------------------------------
// MODELS
// ---------------------------------
const Doctor = require("../models/doctors.js");


// ---------------------------------
// ROUTES
// ---------------------------------
// Index  : GET    '/'                                    1/7
// Show   : GET    '/sessions/user/:id'                   2/7(user)
// Show   : GET    '/sessions/doctor/:userid/:doctorid'   2/7(doctor)
// New    : GET    '/sessions/new'                        3/7(user)
// New    : GET    '/sessions/user/:id/newdoctor'         3/7(doctor)
// Create : POST   '/sessions'                            4/7(user)
// Create : POST   '/sessions/user/:id/newdoctor'         4/7(doctor)
// Edit   : GET    '/sessions/:userid/:doctorid/edit'     5/7(doctor)
// Update : PUT    '/sessions/:userid/:doctorid'          6/7(doctor)
// Delete : DELETE '/sessions'                            7/7(user)
// Delete : DELETE '/sessions/doctor/:userid/:doctorid'   7/7(doctor)
// ---------------------------------


// New    : GET    '/sessions/new'                        3/7(user)
// When log in button is clicked on front page, render the sessions/new ejs page
router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// Delete : DELETE '/sessions'                            7/7(user)
// Log out and destroy the sessions - log out button is only shown if there is a user signed in. Redirect to the homepage.
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Create : POST   '/sessions'                            4/7(user)
// When the user logs in, find the user and redirect to that users id page. If wrong, password, send error.
router.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      req.session.currentUser = foundUser;
      res.redirect("/sessions/user/" + foundUser._id);
    } else {
      res.send('Oops, I don\'t think you put in the correct password! <a href="/sessions/new">Go back</a>');
    }
  });
});

// Show   : GET    '/sessions/user/:id'                   2/7(user)
// When the user logs in, this redirects to the users id page and shows the userIndex.ejs page. Pulls teh foundUser information to use on the ejs file.
router.get("/user/:id", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("sessions/userIndex.ejs", {
      currentUser: foundUser
    });
  });
});

// New    : GET    '/sessions/user/:id/newdoctor'         3/7(doctor)
// When on the user id page, if "add doctor" link is clicked, go to this new route and render the newDoctor.ejs form to fill out.
router.get("/user/:id/newdoctor", (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    res.render("sessions/newDoctor.ejs", {
      currentUser: foundUser
    });
  });
});

// Create : POST   '/sessions/user/:id/newdoctor'         4/7(doctor)
// When the doctor form is completed / submitted, create a Doctor, find the current user and push that doctor into their doctor array.
router.post("/user/:id/newdoctor", (req, res) => {
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

// Show   : GET    '/sessions/doctor/:userid/:doctorid'   2/7(doctor)
// When the doctor details link is clicked, show the details of the doctor for this specific user and render the doctorShow page.
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

// Delete : DELETE '/sessions/doctor/:userid/:doctorid'   7/7(doctor)
// When on the doctors show page, if you click delete doctor, find the user and remove that doctor from their list. Redirect to the users show page.
router.delete("/doctor/:userid/:doctorid", (req, res) => {
  User.findByIdAndUpdate(req.params.userid, {$pull:{doctors: {_id: req.params.doctorid}}}, (err, removeDoc) => {
    res.redirect("/sessions/user/" + req.params.userid)
  });
});

// Edit   : GET    '/sessions/:userid/:doctorid/edit'     5/7(doctor)
// When in the doctor show page, if you click edit, render the doctorEdit page.
router.get("/doctor/:userid/:doctorid/edit", (req, res) => {
  Doctor.findById(req.params.doctorid, (err, foundDoctor) =>{
    console.log(foundDoctor);
    res.render("sessions/doctorEdit.ejs", {
      doctor: foundDoctor,
      user_id: req.params.userid
    });
  });
});

// Update : PUT    '/sessions/:userid/:doctorid'          6/7(doctor)
// When submitting the edit form for the doctor, find the doctor in the database, edit the body, then find the current user and remove that doctor and push in the newly updated doctor. Redirect to the doctors show page.
router.put("/doctor/:userid/:doctorid", (req, res) => {

  Doctor.findByIdAndUpdate(req.params.doctorid, req.body, {new:true}, (err, updatedDoctor) => {
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

// ---------------------------------
// MODULE EXPORTS - access this file in server.js
// ---------------------------------
module.exports = router;
