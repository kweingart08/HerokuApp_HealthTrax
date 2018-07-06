// heroku URL: https://thawing-reef-79440.herokuapp.com/
// can also type open heroku

// ===== DEPENDENCIES =====
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
// **rename database later to name of project
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/app_dev';
const session = require("express-session");

// ===== MIDDLEWARE =====
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: "feedmeseymour",
  resave: false,
  saveUninitialized: false
}));

// ===== CONTROLLERS =====
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);


// ===== INDEX ROUTE / ROOT PAGE =====
// if someone logs in, stores current user information and can be used on index.ejs file
app.get("/", (req, res)=>{
  res.render("index.ejs", {
    currentUser: req.session.currentUser
  });
});




// ===== APP LISTENER AND MONGOOSE CONNECTIONS =====
app.listen(port, ()=>{
  console.log("-----------------------------");
  console.log("I'm listening on port: ", port);
  console.log("-----------------------------");
});

mongoose.connect(mongoUri, {useNewUrlParser: true});
mongoose.connection.on("open", () => {
  console.log("connected to mongoose!");
});
