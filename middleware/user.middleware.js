const connection = require("../app/database");
const bcrypt = require("bcryptjs");
const md5password = require("../utilis/Md5password");
const Joi = require("joi");
// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");
const { PUBLIC_KEY, PRIVATE_KEY } = require("../app/config");
const userServer = require("../service/user.server");
const authVerify = require("./auth.middleware");
const verifyUser = async (ctx, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { username, password } = ctx.request.body;
  const { error, value } = schema.validate({ username, password });
  if (error) {
    const errorMesage = new Error(error.message);
    return ctx.app.emit("error", errorMesage, ctx);
  }
  const result = await userServer.chaxun(username);
  if (result.length > 0) {
    const error = new Error("用户名已被占用啦！！！");
    return ctx.app.emit("error", error, ctx);
  }

  await next();
};

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;

  // 判断数据是否合法
  if (!username || !password) {
    const error = new Error("请输入用户名或密码");
    return ctx.app.emit("error", error, ctx);
  }

  await userServer
    .chaxun(username)
    .then((results) => {
      if (results.length == 0) {
        const error = new Error("您输入的账号还未注册，请重试！！！");
        return ctx.app.emit("error", error, ctx);
      }

      // TODO：判断用户输入的登录密码是否和数据库中的密码一致
      // 拿着用户输入的密码,和数据库中存储的密码进行对比
      const compareResult = md5password(password);
      if (compareResult !== results[0].password) {
        const error = new Error("您输入的密码有误，请重试");
        return ctx.app.emit("error", error, ctx);
      }

      // TODO：登录成功，生成 Token 字符串
      // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
      const { id, username } = results[0];

      // 生成 Token 字符串
      const tokenStr = jwt.sign({ id, username }, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24,
        algorithm: "RS256",
      });
      ctx.status = 200;
      ctx.body = {
        id,
        username,
        token: "Bearer " + tokenStr,
      };
    })
    .catch((err) => {
      const error = new Error("登陆时数据库出现未知错误");
      return ctx.app.emit("error", error, ctx);
    });
};

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  // console.log(ctx.req);

  const authorization = ctx.headers.authorization;

  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    ctx.state.user = result;
    await next();
  } catch (error) {
    ctx.assert(ctx.state.user, 401, "token错误~~~");
  }
};
const verifyPermission = async (ctx, next) => {
  console.log("验证修改动态的权限的middleware");
  const [Keys] = Object.keys(ctx.params);
  const tableName = Keys.replace("Id", "s");

  const ID = ctx.params[Keys];
  const { id } = ctx.state.user;
  try {
    const isPermission = await authVerify.moment(tableName, ID, id);

    if (!isPermission) {
      const error = new Error("不具备该动态的修改权限！！！");
      return ctx.app.emit("error", error, ctx);
    }

    await next();
  } catch (error) {
    ctx.assert(ctx.state.user, 401, "验证权限时出现的错误~~~");
  }
};

module.exports = { verifyUser, verifyLogin, verifyAuth, verifyPermission };
