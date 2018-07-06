// heroku URL: https://thawing-reef-79440.herokuapp.com/
// can also type open heroku

// ===== DEPENDENCIES =====
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// **rename database later to name of project
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/app_dev"

app.get("/", (req, res)=>{
  res.send("this works");
});

app.listen(port, ()=>{
  console.log("-----------------------------");
  console.log("I'm listening on port: ", port);
  console.log("-----------------------------");
});

mongoose.connect(mongoUri);
mongoose.connection.on("open", () => {
  console.log("======================");
  console.log("connected to mongoose!");
  console.log("======================");
});
