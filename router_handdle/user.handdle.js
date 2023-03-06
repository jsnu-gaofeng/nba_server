const userServer = require("../service/user.server");
const fs = require("fs");
class userHandle {
  async create(ctx, next) {
    const { username, password } = ctx.request.body;
    // 判断数据是否合法
    if (!username || !password) {
      const error = new Error("用户名或密码不能为空");
      return ctx.app.emit("error", error, ctx);
    }
    const result1 = await userServer.chaxun(username);
    if (result1[0].length > 0) {
      console.log("第一次没执行");
      const error = new Error("用户名已被占用啦！！！");
      return ctx.app.emit("error", error, ctx);
    }

    //获取用户信息传过来的数据

    const user = ctx.request.body;
    //将user存储到数据库中
    const result = await userServer.Insert(user, ctx);
    // console.log(result);

    console.log("返回数据", result);
    ctx.body = {
      message: "插入成功",
      id: result.insertId,
    };
  }

  async login(ctx, next) {
    console.log('888888');
    
    ctx.body = "授权成功";
  }
  async avatarInfo(ctx, next) {
    //1.
    const { userId } = ctx.params;
    const result = await userServer.getAvatarByuserId(userId);
    const pics = fs.createReadStream(
      `./files/avatar/${result[result.length - 1].filename}`
    );
    ctx.response.set("content-type", result[result.length - 1].mimetype);

    ctx.body = pics;
  }
}

module.exports = new userHandle();
