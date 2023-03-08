const userServer = require("../service/user.server");
const md5password = require('../utilis/Md5password')
const fs = require("fs");
class userHandle {
  async create(ctx, next) {
    const user = ctx.request.body;
    //将user存储到数据库中
    const { username, password } = user;

    // let password1 = bcrypt.hashSync(password, 10);
    const password1 = md5password(password)
    const result = await userServer.Insert(password1, username);

    ctx.body = {
      message: "插入成功",
      id: result.insertId,
    };
  }

  async login(ctx, next) {
    //没有让到这里
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
    //想要直接展示必须这样设置
    ctx.response.set("content-type", result[result.length - 1].mimetype);
    ctx.body = pics;
  }
}

module.exports = new userHandle();
