const connection = require("../app/database");
class AuthVerify {
  async moment(tableName, Id, user_id) {
    try {
      const statement = `select * from ${tableName} where id = ? and user_id = ?`;
      const [result] = await connection.execute(statement, [Id, user_id]);

      return result.length === 0 ? false : true;
    } catch (error) {
      ctx.assert(ctx.state.user, 401, "验证权限时出现的错误~~~");
    }
  }
}

module.exports = new AuthVerify();
