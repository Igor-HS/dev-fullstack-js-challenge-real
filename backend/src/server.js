const express = require('express');

const database = require("./database");

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
})


app.get("/students/list", function(req, res){
  res.send(database);
});

app.get("/students/find/:ra", function(req, res){
  const stundetFound = database.find(function(stundent){
    return stundent.ra == req.params.ra;
  });
  res.send(stundetFound);
})

app.listen(3000);
console.log("Server is running...");