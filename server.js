const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
  res.send("this works");
});

app.listen(port, ()=>{
  console.log("-----------------------------");
  console.log("I'm listening on port: ", port);
  console.log("-----------------------------");
});
