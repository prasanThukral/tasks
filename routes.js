const express = require("express");
const taskRouter = express.Router();
const TaskController = require("./controller/taskController")

taskRouter.post('/task',TaskController.createTaskController);
taskRouter.get('/tasks',TaskController.getAllTasks);
taskRouter.get('/task/:id',TaskController.getTasksByid);
taskRouter.put('/task/:id',TaskController.updatedTaskById);
taskRouter.delete('/tasks/:id',TaskController.deleteTaskController);

module.exports = taskRouter;