const Router = require("koa-router");

const userRouter = new Router({ prefix: "/api" });
//注册、登录处理函数
const userHandle = require("../router_handdle/user.handdle");
const {
  verifyUser,
  verifyLogin,
  verifyAuth,
} = require("../middleware/user.middleware");

//注册接口
userRouter.post("/reguser", verifyUser, userHandle.create);

//登录接口
userRouter.post("/login", verifyLogin, userHandle.login);

userRouter.post("/avatar/:userId", verifyAuth, userHandle.avatarInfo);
module.exports = userRouter;
