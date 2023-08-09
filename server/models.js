const mongoose  = require("mongoose");

const TaskSchema = mongoose.Schema({
    task: String
})

const TaskModel = mongoose.model("tasks",TaskSchema)

module.exports = TaskModel