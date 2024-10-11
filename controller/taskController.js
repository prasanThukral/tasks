const TaskRepositroy = require("../Repository/taskRepository");
const { errorBuilder, joiValidationError } = require("../error/error");
const { taskValidator, updateValidator } = require("../Validator/index");

class TaskController {
  static async createTaskController(req, res) {
    try {
      const { error } = taskValidator(req.body);
      if (error) throw joiValidationError(error);
      const {
        title,
        status,
        description,
        image1name,
        image1url,
        image2name,
        image2url,
      } = req.body;
      const createdtask = await TaskRepositroy.createTask(
        title,
        status,
        description,
        image1name,
        image1url,
        image2name,
        image2url
      );
      res.status(200).json({
        status: "sucess",
        message: createdtask,
      });
    } catch (error) {
      console.log(error.status);
      res.status(error.status).json({
        message: error.message,
      });
    }
  }

  static async getAllTasks(req, res) {
    try {
      const allTasks = await TaskRepositroy.getAllTask();
      if (allTasks.length === 0) throw errorBuilder("GETALL_TASKS_ZERO");
      res.status(200).json({
        status: "sucess",
        message: allTasks,
      });
    } catch (error) {
      console.log(error.status);
      if (!error.status) error.status = 500;
      res.status(error.status).json({
        status: "Failed",
        message: error.message,
      });
    }
  }

  static async getTasksByid(req, res) {
    try {
      const { id } = req.params;
      const taskByid = await TaskRepositroy.getTaskById(id);
      if (taskByid.length === 0) throw errorBuilder("GET_TASKS_ZERO_ID");
      res.status(200).json({
        status: "sucess",
        message: taskByid,
      });
    } catch (error) {
      if (!error.status) error.status = 500;
      res.status(error.status).json({
        message: error.message,
      });
    }
  }

  static async updatedTaskById(req, res) {
    try {
      const { id } = req.params;
      const taskByid = await TaskRepositroy.getTaskById(id);
      if (taskByid.length === 0) throw errorBuilder("GET_TASKS_ZERO_ID");
      const { error } = updateValidator(req.body);
      const { status } = req.body;
      if (error) throw joiValidationError(error);
      const updateQuery = await TaskRepositroy.updateQuery(status, id);
      res.status(200).json({
        status: "sucess",
        message: updateQuery,
      });
    } catch (error) {
      if (!error.status) error.status = 500;
      res.status(error.status).json({
        message: error.message,
      });
    }
  }

  static async deleteTaskController(req, res) {
    try {
      const { id } = req.params;
      const taskByid = await TaskRepositroy.getTaskById(id);
      if (taskByid.length === 0) throw errorBuilder("GET_TASKS_ZERO_ID");
      const deletedTasks = await TaskRepositroy.deleteQuery(id);
      res.status(200).json({
        status: "sucess",
        messsage: deletedTasks,
      });
    } catch (error) {
      console.log(error.status);
      if (!error.status) error.status = 500;
      res.status(error.status).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}
module.exports = TaskController;
