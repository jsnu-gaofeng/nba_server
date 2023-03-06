const connection = require("../app/database");
class commentServer {
  async create(momentId, content, id) {
    //将user存储到数据库中
    const sql =
      "insert into comments (content,moment_id,user_id) values (?,?,?)";
    const [result] = await connection.execute(sql, [content, momentId, id]);
    return result;
  }
  async reply(momentId, content, id, comment_id) {
    //将user存储到数据库中
    console.log(momentId, content, id, comment_id);

    const sql =
      "insert into comments (content,moment_id,user_id,comment_id) values (?,?,?,?)";
    const [result] = await connection.execute(sql, [
      content,
      momentId,
      id,
      comment_id,
    ]);
    return result;
  }
  async updata(commentId, content) {
    //将user存储到数据库中
    const statement = `update comments set content = ? where id = ?`;
    console.log(commentId, content);

    const [result] = await connection.execute(statement, [content, commentId]);
    return result;
  }
  async delete(commentId) {
    const statement = `delete from comments where id = ?`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
  async list(momentId) {
    const statement = `select * from comments where moment_id = ?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }

}

module.exports = new commentServer();
