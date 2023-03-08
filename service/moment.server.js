const bcrypt = require("bcryptjs");
const connection = require("../app/database");
class functionServer {
  async insert(user_id, content) {
    //将user存储到数据库中
    console.log(user_id, content);
    const sql = "insert into moments (user_id,content) values (?,?)";
    const result = await connection.execute(sql, [user_id, content]);
    return result;
  }
  async searchMoment(contentId) {
    console.log('!!!!!!!!');
    const sql = `select m.id id,m.content content,m.createAt createTime,
    json_object('id',u.id,'name',u.username,'avatar',u.avatar) user,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:3688/my/moment/images/',pictures.filename))
    from pictures where m.id = pictures.moment_id) images
    from moments m left join users u on m.user_id=u.id where m.id = ?`;
    const [result] = await connection.execute(sql, [contentId]);
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
  async getPictureInfo(picname) {
    const sql = "select * from pictures where filename = ?";
    const [result] = await connection.execute(sql, [picname]);
    return result;
  }
}

module.exports = new functionServer();
