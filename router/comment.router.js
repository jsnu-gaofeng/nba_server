const Router = require("koa-router");
const commentHandle = require("../router_handdle/comment.handle");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/user.middleware");
const FunctionRouter = new Router({ prefix: "/comment" });
//1.发表
FunctionRouter.post("/", verifyAuth, commentHandle.create);
FunctionRouter.post("/reply", verifyAuth, commentHandle.reply);
FunctionRouter.patch(
  "/updata/:commentId",
  verifyAuth,
  verifyPermission,
  commentHandle.updata
);
FunctionRouter.delete(
  "/delete/:commentId",
  verifyAuth,
  verifyPermission,
  commentHandle.delete
);
//查询多个东台市，显示评论的个数
//查询单个动态时，显示评论的列表
FunctionRouter.post("/list", commentHandle.list);


module.exports = FunctionRouter;
