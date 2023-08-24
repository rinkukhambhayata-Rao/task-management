const taskService = require("../services/task.service");

let taskController = {};
taskController.addTask = function (req, res) {
    console.log('body params ',req.body);
    taskService.addTask(req.body)
    .then((response) => {
        console.log('response from add task service ',response);
        return res.status(response.status).json({ status: response.status, message: response.message || 'success', data: response.data });
    }).catch((error) => {
        return res.status(error.status || 500).json({ status: error.status, message: error.message || 'failure', data: {} });
    });
}

taskController.getTask = function (req, res){
    var filterType = req.query.filterType;
    taskService.getTasks(filterType)
    .then((response) => {
        console.log('response from get task service ',response);
        return res.status(response.status).json({ status: response.status, message: response.message || 'success', data: response.data });
    }).catch((error) => {
        return res.status(error.status || 500).json({ status: error.status, message: error.message || 'failure', data: {} });
    });
}

taskController.updateTask = function (req, res) {
    console.log('body params ',req.body);
    taskService.updateTask(req.body)
    .then((response) => {
        console.log('response from update task service ',response);
        return res.status(response.status).json({ status: response.status, message: response.message || 'success', data: response.data });
    }).catch((error) => {
        return res.status(error.status || 500).json({ status: error.status, message: error.message || 'failure', data: {} });
    });
}

taskController.deleteTask = function (req, res) {
    console.log('query params ',req.query);
    let taskId = req.query.taskId;
    taskService.deleteTask(taskId)
    .then((response) => {
        console.log('response from delete task service ',response);
        return res.status(response.status).json({ status: response.status, message: response.message || 'success', data: response.data });
    }).catch((error) => {
        return res.status(error.status || 500).json({ status: error.status, message: error.message || 'failure', data: {} });
    });
}

module.exports = taskController;