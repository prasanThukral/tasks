/* eslint-disable no-undef */
const TaskRepository = require("../Repository/taskRepository");
const mysqlPool = require("../Repository/db");

describe("TaskRepository", () => {
  describe("createTask", () => {
    it("should insert a task and return the result", async () => {
      // Mock MySQL query result
      const mockResult = { insertId: 1 };
      spyOn(mysqlPool, "query").and.returnValue(Promise.resolve([mockResult]));

      const title = "Test Task";
      const status = "pending";
      const description = "This is a test task";
      const image1name = "image1.jpg";
      const image1url = "http://example.com/image1.jpeg";
      const image2name = "image2.jpg";
      const image2url = "http://example.com/image2.jpeg";
      const result = await TaskRepository.createTask(
        title,
        status,
        description,
        image1name,
        image1url,
        image2name,
        image2url
      );
      expect(result).toEqual(mockResult);
    });
    it("should throw an error when MySQL query fails", async () => {
      // Mock MySQL query to reject with an error
      const mockError = new Error("MySQL Error");
      spyOn(mysqlPool, "query").and.returnValue(Promise.reject(mockError));

      const title = "Test Task";
      const status = "pending";
      const description = "This is a test task";
      const image1name = "image1.jpg";
      const image1url = "http://example.com/image1.jpeg";
      const image2name = "image2.jpg";
      const image2url = "http://example.com/image2.jpeg";

      // Handle the async error with `await expectAsync`
      await expectAsync(
        TaskRepository.createTask(
          title,
          status,
          description,
          image1name,
          image1url,
          image2name,
          image2url
        )
      ).toBeRejectedWith(mockError);
      expect(mysqlPool.query).toHaveBeenCalledWith(jasmine.any(String), [
        title,
        status,
        description,
        jasmine.any(Date),
        jasmine.any(Date),
        image1name,
        image1url,
        image2name,
        image2url,
      ]);
    });
  });
  describe("getAllTask", () => {
    it("", async () => {
      const mockResult = [{ Id: 1, title: "hello demo", detail: "ddcc" }];
      spyOn(mysqlPool, "query").and.returnValue(Promise.resolve([mockResult]));
      const result = await TaskRepository.getAllTask();
      expect(result).toEqual(mockResult);
    });
    it("should throw an error when MySQL query fails", async () => {
      const mockError = new Error("MySQL Error");
      spyOn(mysqlPool, "query").and.returnValue(Promise.reject(mockError));

      await expectAsync(TaskRepository.getAllTask()).toBeRejectedWith(
        mockError
      );

      expect(mysqlPool.query).toHaveBeenCalledWith(jasmine.any(String));
    });
  });
  describe("getTaskBYid", () => {
    it("", async () => {
      const mockResult = [{ Id: 1, title: "hello demo", detail: "ddcc" }];
      spyOn(mysqlPool, "query").and.returnValue(Promise.resolve([mockResult]));
      const result = await TaskRepository.getTaskById(2);
      expect(result).toEqual(mockResult);
    });
    it("should throw an error when MySQL query fails", async () => {
      const mockError = new Error("MySQL Error");
      spyOn(mysqlPool, "query").and.returnValue(Promise.reject(mockError));

      const taskId = 1;

      await expectAsync(TaskRepository.getTaskById(taskId)).toBeRejectedWith(
        mockError
      );

      expect(mysqlPool.query).toHaveBeenCalledWith(jasmine.any(String), [
        taskId,
      ]);
    });
  });
  describe("updateTaskByid", () => {
    it("success testing", async () => {
      const mockResult = [
        {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: "Rows matched: 1  Changed: 0  Warnings: 1",
          serverStatus: 2,
          warningStatus: 1,
          changedRows: 0,
        },
      ];
      spyOn(mysqlPool, "query").and.returnValue(Promise.resolve([mockResult]));
      const result = await TaskRepository.updateQuery("INPROGRESS", 1);
      expect(result).toEqual(mockResult);
    });
    it("delete query testing", async () => {
      const mockResult = [
        {
          fieldCount: 0,
          affectedRows: 1,
          insertId: 0,
          info: "",
          serverStatus: 2,
          warningStatus: 1,
          changedRows: 0,
        },
      ];
      spyOn(mysqlPool, "query").and.returnValue(Promise.resolve([mockResult]));
      const result = await TaskRepository.deleteQuery(1);
      expect(result).toEqual(mockResult);
    });
  });
});
