const mongoose = require("mongoose");
var taskModel = require("../model/task.model");
const ObjectId = require("mongodb").ObjectId;

const addTask = (data) => {
    return new Promise(async (resolve, reject) => {
        if(data.userId != '' && data.title != '' && data.description != ''){
            taskModel.create(data)
            .then((taskDetails) => {
                console.log('task created successfully ',taskDetails);
                resolve({
                    status: 200,
                    data: taskDetails,
                    message: "Task created succesfully"
                });
            }).catch((error) => {
                console.log('error ', error);
                reject({
                    status: 500,
                    message: "Internal server error"
                });
            });
        }else{
            reject({
                status: 400,
                message: "Please provide all required fields"
            });
        }
    })
}

const getTasks = (filterType) => {
    return new Promise(async (resolve, reject) => {
        let tasks = [];
        if(filterType != ''){
            tasks = await taskModel.find({isDelete:'false',status:filterType});
        }else{
            tasks = await taskModel.find({isDelete:'false'});
        }
        if(tasks != '' && tasks.length > 0){
            resolve({
                status: 200,
                data: tasks,
                message: "Tasks listed successfully"
            });
        }else{
            reject({
                status: 400,
                message: "No task found"
            });
        }
    })
}

const updateTask = (data) => {
    return new Promise(async (resolve, reject) => {
        taskModel
            .findOneAndUpdate(
            { _id: data.taskId },
            { $set: {
                title : data.title,
                description : data.description,
                status : data.status,
                dueDate : data.dueDate
            } },
            { upsert: true, new: true }
        )
        .then((taskDetails) => {
            console.log('task updated successfully ',taskDetails);
            resolve({
                status: 200,
                data: taskDetails,
                message: "Task updated succesfully"
            });
        }).catch((error) => {
            console.log('error ', error);
            reject({
                status: 500,
                message: "Internal server error"
            });
        });
    })
}

const deleteTask = (taskId) => {
    return new Promise(async (resolve, reject) => {
        let taskDeleted = await taskModel.findByIdAndUpdate({ _id: taskId }, { $set: { "isDelete": "true" } });
        if(taskDeleted != ''){
            resolve({
                status: 200,
                message: "Task deleted succesfully"
            });
        }else{
            reject({
                status: 500,
                message: "Internal server error"
            });
        }
    })
}

module.exports.addTask = addTask;
module.exports.getTasks = getTasks;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;