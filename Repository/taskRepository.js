const mysqlPool = require("./db");

class TaskRepositroy {
  static async createTask(
    title,
    status,
    description,
    image1name,
    image1url,
    image2name,
    image2url
  ) {
    // eslint-disable-next-line no-useless-catch
    try {
      const [result] = await mysqlPool.query(
        `
            INSERT INTO tasks 
            (title, status,description, created_at ,updated_at, image1name, image1url, image2name, image2url)
            VALUES (?,?,?,?,?,?,?,?,?)
            `,
        [
          title,
          status,
          description,
          new Date(),
          new Date(),
          image1name,
          image1url,
          image2name,
          image2url,
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAllTask() {
    // eslint-disable-next-line no-useless-catch
    try {
      const [result] = await mysqlPool.query(`
                SELECT title,description ,status,image1name, image1url, image2name, image2url FROM tasks
                `);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getTaskById(id) {
    // eslint-disable-next-line no-useless-catch
    try {
      const [result] = await mysqlPool.query(
        `
                SELECT title,description, status,image1name, image1url, image2name, image2url  FROM tasks where id = ?
                `,
        [id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateQuery(status, id) {
    // eslint-disable-next-line no-useless-catch
    try {
      const [result] = await mysqlPool.query(
        `
                UPDATE tasks SET status = ?,updated_at = ? WHERE id = ?
                `,
        [status, new Date(), id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async deleteQuery(id) {
    // eslint-disable-next-line no-useless-catch
    try {
      const [result] = await mysqlPool.query(
        `
                DELETE FROM tasks WHERE  id = ?
                `,
        [id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TaskRepositroy;
