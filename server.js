// ---------------------------------
// DEPENDENCIES
// ---------------------------------
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");

// ---------------------------------
// PORT (set up for hosting w/ heroku)
// ---------------------------------
const port = process.env.PORT || 3000;

// ---------------------------------
// DATABASE (set up for hosting w/ heroku w/ mLab add on)
// ---------------------------------
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/app_dev';

// ---------------------------------
// MIDDLEWARE
// ---------------------------------
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(session({
  secret: "feedmeseymour",
  resave: false,
  saveUninitialized: false
}));

// ---------------------------------
// CONTROLLERS
// ---------------------------------
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

// ---------------------------------
// ROUTES
// ---------------------------------
// localhost:3000 - this will render the main index page/home page
app.get("/", (req, res)=>{
  res.render("index.ejs");
});

// 404 errors! - this will catch any route that doesn't exist
app.get("*", (req, res) => {
  res.render("four-oh-four/index.ejs");
});

// ---------------------------------
// LISTENER & MONGOOSE CONNECTION
// ---------------------------------
app.listen(port, ()=>{
  console.log("-----------------------------");
  console.log("I'm listening on port: ", port);
  console.log("-----------------------------");
});
mongoose.connect(mongoUri, {useNewUrlParser: true});
mongoose.connection.on("open", () => {
  console.log("connected to mongoose!");
});
