const express = require('express');
const StudentController = require("./controllers/StudentController");
const knex = require("knex");
var cors = require("cors");
const knexConfigFile = require("../knexfile");

const app = express();

app.database = knex(knexConfigFile.test)

const StudentControllerInstance = new StudentController(app);

app.use(cors());
app.use(express.json());

app.get("/students/list/:searchQuery?", StudentControllerInstance.listAction);
app.get("/students/find/:ra", StudentControllerInstance.findAction);
app.post("/students/save", StudentControllerInstance.createAction);
app.put("/students/edit/:ra", StudentControllerInstance.editAction);
app.delete("/students/delete/:ra", StudentControllerInstance.deleteAction);

app.listen(3000);
console.log("Server is running...");
