const Router = require("koa-router");
const commentHandle = require("../router_handdle/comment.handle");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/user.middleware");
const FunctionRouter = new Router({ prefix: "/comment" });

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
FunctionRouter.get("/list", commentHandle.list);


module.exports = FunctionRouter;
