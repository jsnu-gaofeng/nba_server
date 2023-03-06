const connection = require("../app/database");
class labelServer {
  async creat(name) {
    try {
      const sql = `insert into labels (name) values (?)`;
      const result = await connection.execute(sql, [name]);
      return result;
    } catch (error) {
      const error1 = new Error("数据库出现系统错误lele ！！！");
      ctx.app.emit("error", error1, ctx);
    }
  }
  async isExistLabel(label) {
    const sql = "select * from labels where name = ?";
    const [result] = await connection.execute(sql, [label]);
    return result.length === 0 ? false : true;
  }
  async isInsertLabel(momentId, label) {
    const sql =
      "select * from moments_labels where moment_id = ? and label = ?";
    const [result] = await connection.execute(sql, [momentId, label]);
    return result.length === 0 ? false : true;
  }
  async addLabel(momentId, label) {
    const statement =
      "insert into moments_labels (moment_id,label) values (?,?)";
    const [result] = await connection.execute(statement, [momentId, label]);
    console.log("666");

    return result;
  }
  async getLabels(limit, offset) {
    const statement = "select * from labels limit ?,?";
    const [result] = await connection.execute(statement, [offset, limit]);
    return result
  }
}
module.exports = new labelServer();
