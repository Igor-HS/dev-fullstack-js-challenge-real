const express = require("express");
const StudentController = require("../controllers/StudentController");

module.exports = (app) => {
    const router = express.Router();
    const StudentControllerInstance = new StudentController(app);
    router.get("/list/:searchQuery?", StudentControllerInstance.listAction);
    router.get("/find/:ra", StudentControllerInstance.findAction);
    router.post("/save", StudentControllerInstance.createAction);
    router.put("/edit/:ra", StudentControllerInstance.editAction);
    router.delete("/delete/:ra", StudentControllerInstance.deleteAction);

    return router;
}