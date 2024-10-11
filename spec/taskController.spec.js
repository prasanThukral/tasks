/* eslint-disable no-undef */
// spec/taskController.spec.js
const TaskController = require("../controller/taskController");
const TaskRepositroy = require("../Repository/taskRepository");

describe("TaskController", () => {
  // Your Jasmine tests here
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jasmine.createSpy().and.returnValue({
        json: jasmine.createSpy(),
      }),
    };
  });
  describe("createTaskController", () => {
    it("success create task", async () => {
      const mockTask = { id: 1, title: "Test Task" };
      spyOn(TaskRepositroy, "createTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      req.body = {
        title: "Test Task",
        status: "OPEN",
        description: "Description",
        image1name: "image1.jpg",
        image1url: "https://abc.com/abc.png",
        image2name: "image2.jpg",
        image2url: "https://abc.com/abc.png",
      };
      await TaskController.createTaskController(req, res);
      expect(res.status().json).toHaveBeenCalledWith({
        status: "sucess",
        message: mockTask,
      });
    });

    it("success create task with status as in progress", async () => {
      const mockTask = { id: 1, title: "Test Task" };
      spyOn(TaskRepositroy, "createTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      req.body = {
        title: "Test Task",
        status: "INPROGRESS",
        description: "Description",
        image1name: "image1.jpg",
        image1url: "https://abc.com/abc.jpeg",
        image2name: "image2.jpg",
        image2url: "https://abc.com/abc.jpeg",
      };
      await TaskController.createTaskController(req, res);
      expect(res.status().json).toHaveBeenCalledWith({
        status: "sucess",
        message: mockTask,
      });
    });

    it("failure create task with status as wrong name", async () => {
      const mockTask = { id: 1, title: "Test Task" };
      spyOn(TaskRepositroy, "createTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      req.body = {
        title: "Test Task",
        status: "INPROGRES",
        description: "Description",
        image1name: "image1.jpg",
        image1url: "https://abc.com/abc.jpeg",
        image2name: "image2.jpg",
        image2url: "https://abc.com/abc.jpeg",
      };
      await TaskController.createTaskController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("failure create task with image file is wrong name", async () => {
      const mockTask = { id: 1, title: "Test Task" };
      spyOn(TaskRepositroy, "createTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      req.body = {
        title: "Test Task",
        status: "INPROGRES",
        description: "Description",
        image1name: "image1.jpg",
        image1url: "https://abc.com/abc.ggg",
        image2name: "image2.jpg",
        image2url: "https://abc.com/abc.ggg",
      };
      await TaskController.createTaskController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("failure create task as getting error from task repository", async () => {
      const mockTask = new Error();
      spyOn(TaskRepositroy, "createTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      req.body = {
        title: "Test Task",
        status: "INPROGRES",
        description: "Description",
        image1name: "image1.jpg",
        image1url: "https://abc.com/abc.ggg",
        image2name: "image2.jpg",
        image2url: "https://abc.com/abc.ggg",
      };
      await TaskController.createTaskController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe("getAllTaskController", () => {
    it("success get all tasks", async () => {
      const mockTask = [
        { id: 1, title: "Test Task", description: "anything" },
        { id: 1, title: "Test Task", description: "anything" },
      ];
      spyOn(TaskRepositroy, "getAllTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      await TaskController.getAllTasks(req, res);
      expect(res.status().json).toHaveBeenCalledWith({
        status: "sucess",
        message: mockTask,
      });
    });
    it("failure empty response get all tasks", async () => {
      const mockTask = [];
      spyOn(TaskRepositroy, "getAllTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      await TaskController.getAllTasks(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("failure empty response get all tasks", async () => {
      spyOn(TaskRepositroy, "getAllTask").and.throwError("general error");
      await TaskController.getAllTasks(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("getTasksByid", () => {
    it("success task by id", async () => {
      req.params = { id: 1 };
      const mockTask = [{ id: 1, title: "Test Task", description: "anything" }];
      spyOn(TaskRepositroy, "getTaskById").and.returnValue(
        Promise.resolve(mockTask)
      );
      await TaskController.getTasksByid(req, res);
      expect(res.status().json).toHaveBeenCalledWith({
        status: "sucess",
        message: mockTask,
      });
    });
    it("failure  task by id no value found", async () => {
      req.params = { id: 1 };
      const mockTask = [];
      spyOn(TaskRepositroy, "getAllTask").and.returnValue(
        Promise.resolve(mockTask)
      );
      await TaskController.getAllTasks(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("failure  task by id no value found", async () => {
      req.params = { id: 1 };
      const mockTask = [];
      spyOn(TaskRepositroy, "getAllTask").and.throwError("general error");
      await TaskController.getAllTasks(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("updateTaskById", () => {
    it("success updateTaskById", async () => {
      req.params = { id: 1 };
      req.body = { status: "OPEN" };
      const mockTask = [{ id: 1, title: "Test Task", description: "anything" }];
      const updateTask = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: "Rows matched: 1  Changed: 0  Warnings: 1",
        serverStatus: 2,
        warningStatus: 1,
        changedRows: 0,
      };
      spyOn(TaskRepositroy, "getTaskById").and.returnValue(
        Promise.resolve(mockTask)
      );
      spyOn(TaskRepositroy, "updateQuery").and.returnValue(
        Promise.resolve(updateTask)
      );
      await TaskController.updatedTaskById(req, res);
      expect(res.status().json).toHaveBeenCalledWith({
        status: "sucess",
        message: updateTask,
      });
    });
    it("failure updateTaskById id not found", async () => {
      req.params = { id: 1 };
      req.body = { status: "OPEN" };
      const mockTask = [];
      const updateTask = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: "Rows matched: 1  Changed: 0  Warnings: 1",
        serverStatus: 2,
        warningStatus: 1,
        changedRows: 0,
      };
      spyOn(TaskRepositroy, "getTaskById").and.returnValue(
        Promise.resolve(mockTask)
      );
      spyOn(TaskRepositroy, "updateQuery").and.returnValue(
        Promise.resolve(updateTask)
      );
      await TaskController.updatedTaskById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("failure updateTaskById id not found", async () => {
      req.params = { id: 1 };
      req.body = { status: "OPEN" };
      const mockTask = [];
      const updateTask = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: "Rows matched: 1  Changed: 0  Warnings: 1",
        serverStatus: 2,
        warningStatus: 1,
        changedRows: 0,
      };
      spyOn(TaskRepositroy, "getTaskById").and.returnValue(
        Promise.resolve(mockTask)
      );
      spyOn(TaskRepositroy, "updateQuery").and.throwError("general error");
      await TaskController.updatedTaskById(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
  describe("deleteTaskController", () => {
    it("if task does not exist", async () => {
      req.params = { id: 1 };
      const mockTask = [];
      const deleteMock = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: "",
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 0,
      };
      spyOn(TaskRepositroy, "getTaskById").and.returnValue(
        Promise.resolve(mockTask)
      );
      spyOn(TaskRepositroy, "deleteQuery").and.returnValue(
        Promise.resolve(deleteMock)
      );
      await TaskController.deleteTaskController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("if there is error coming from repo", async () => {
      req.params = { id: 1 };
      const mockTask = [{ id: 1, title: "Test Task", description: "anything" }];
      spyOn(TaskRepositroy, "getTaskById").and.returnValue(
        Promise.resolve(mockTask)
      );
      spyOn(TaskRepositroy, "deleteQuery").and.throwError("general error");
      await TaskController.deleteTaskController(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
