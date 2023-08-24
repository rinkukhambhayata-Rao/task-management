var express = require("express");
var router = express.Router();
const taskController = require('./../controller/task.controller');

router.route("/")
    .get(taskController.getTask)
    .post(taskController.addTask)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
