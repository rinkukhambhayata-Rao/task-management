const mongoose = require("mongoose");
const Schema = mongoose.Schema;

statusOfTask = ["Backlog", "To Do", "In Progress", "Testing", "Done"];

var TaskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: statusOfTask,
        default: "To Do"
    },
    dueDate: {
        type: String,
    },
    isDelete: {
        type: String,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("task", TaskSchema);