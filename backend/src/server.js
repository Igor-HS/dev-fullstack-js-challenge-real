const express = require('express');
var cors = require("cors");
let database = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/students/save", (req, res)=>{
  database.push({
    nome: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  })
  res.send({result: true, message: "O Estudante foi adicionado com sucesso!"})

})

app.put("/students/edit/:ra", (req, res)=>{
  
  database = database.filter((student)=>{
    return student.ra != req.params.ra
  })

  database.push({
    nome: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  })

  res.send({
    result: true,
    message: "O estudante foi atualizado com sucesso!"
  });
})

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
