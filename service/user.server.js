const bcrypt = require("bcryptjs");
const connection = require("../app/database");
class userServer {
  async Insert(user, ctx) {
    //将user存储到数据库中
    const { username, password } = user;

    let password1 = bcrypt.hashSync(password, 10);

    const sql = "insert into users (username, password) values (?,?)";
    // console.log(connection.execute(sql, [username, password1]));
    try {
      const results = await connection.execute(sql, [username, password1]);
      if (results[0].affectedRows == 1) {
        return results[0];
      } else {
        const error = new Error("数据库出现系统错误le ！！！");
        ctx.app.emit("error", error, ctx);
      }
    } catch (error) {
      const error1 = new Error("数据库出现系统错误lele ！！！");
      ctx.app.emit("error", error1, ctx);
    }
  }

  async chaxun(username) {
    const sql = "select * from users where username = ?";
    const [result] = await connection.execute(sql, [username]);
    console.log('*******',result);
    
    return result;
  }

  async login(ctx, next) {}
  async getAvatarByuserId(userId) {
    const sql = "select * from avatar where user_id = ?";
    const [result] = await connection.execute(sql, [userId]);
    return result;
  }
  async updateAvatarUrlById(userId, pic_url) {
    const statement = `update users set avatar = ? where id = ?`;
    const [result] = await connection.execute(statement, [pic_url, userId]);
    return result;
  }
}

module.exports = new userServer();
