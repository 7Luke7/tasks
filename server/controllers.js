const TaskModel = require("./models")

const retrieve_all_tasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({})
        return res.status(200).json(tasks)
    } catch(err) {
        res.status(400).send("Something went wrong!")
    }
}

const create_task = async (req, res) => {
    try {
        const new_task = await new TaskModel({
            ...req.body
        })
        new_task.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500),send("Error")
        })
    } catch (error) {
        res.status(400).send("Something went wrong!")
    }
}

const get_task = async (req, res) => {
    try {
        const id = req.params.id
        const task = await TaskModel.findById(id, {...req.body})
        res.status(200).send(task)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
}

const update_task = async (req, res) => {
    try {
        const id = req.params.id
        const update_task = await TaskModel.findByIdAndUpdate(id, {...req.body})
        update_task.save()
        res.status(200).send("Task successfuly edited.")
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
}

const delete_task = async (req, res) => {
    try {
        const id = req.params.id
        const delete_matching_task = await TaskModel.findByIdAndDelete(id)
        res.status(200).send("Deleted task successfully")
    } catch (error) {
        res.status(400).send("Something went wrong!")
    }
}

const delete_tasks = async (req, res) => {
    try {
        const deletedTasks = await TaskModel.deleteMany({})
        res.status(200).send("Cleared Successfully")       
    } catch (error) {
      res.status(400).send("Something went wrong!")   
    }
}

module.exports = {retrieve_all_tasks, create_task, update_task, delete_task, delete_tasks, get_task} 