const express = require('express');
var cors = require("cors");
let database = require("./database");

const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
})


app.get("/students/list", function(req, res){
  setTimeout(function(){
    res.send(database);
  }, 2000);
});

app.get("/students/find/:ra", function(req, res){
  const stundetFound = database.find(function(stundent){
    return stundent.ra == req.params.ra;
  });
  setTimeout(function(){
    res.send(stundetFound);
  }, 2000);
 
});

app.delete("/students/delete/:ra", (req, res) =>{

  database = database.filter(function(student){
    return student.ra != req.params.ra;
  });

  res.send({
    result: true,
    message:`O estudante #${req.params.ra} foi excluido com sucesso!`
  });
});

app.listen(3000);
console.log("Server is running...");
