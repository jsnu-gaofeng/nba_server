const connection = require("../app/database");
class fileServer {
  async storage(filename, mimetype, size, userId) {
    const sql =
      "insert into avatar (filename,mimetype,size,user_id) values (?,?,?,?)";
    const [result] = await connection.execute(sql, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
  async storagePicture(filename, mimetype, size, userId, moment_id) {
    const sql =
      "insert into pictures (filename,mimetype,size,user_id,moment_id) values (?,?,?,?,?)";
    const [result] = await connection.execute(sql, [
      filename,
      mimetype,
      size,
      userId,
      moment_id,
    ]);
    return result
  }
}
module.exports = new fileServer();
