const bcrypt = require("bcryptjs");
const connection = require("../app/database");
class functionServer {
  async moment(user_id, content) {
    //将user存储到数据库中
    console.log(user_id, content);
    const sql = "insert into moments (user_id,content) values (?,?)";

    const result = await connection.execute(sql, [user_id, content]);
    console.log("_________");
    return result;
  }

  async searchMoment(id) {
    console.log("111");
    const sql = "select * from moments where user_id = ?";
    const [result] = await connection.execute(sql, [id]);
    return result;
  }
  async searchList(offset, size) {
    const sql = `
    select
      m.id id,m.content content,m.createAt createTime,m.updataAt updateTime,
      JSON_object('id',u.id,'username',u.username) author,
      (select count(*) from comments c where c.moment_id = m.id) commentsCount
    from moments m
    left JOIN users u ON m.user_id = u.id
    limit ?,?;
    `;
    const [result] = await connection.execute(sql, [offset, size]);
    return result;
  }
  async updataMoment(momentId, content) {
    const statement = `update moments set content = ? where id = ?`;
    const [result] = await connection.execute(statement, [content, momentId]);

    return result;
  }
  async deleteMoment(momentId) {
    const statement = `delete from moments where id = ?`;
    const [result] = await connection.execute(statement, [momentId]);

    return result;
  }
}

module.exports = new functionServer();
