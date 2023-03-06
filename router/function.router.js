const Router = require("koa-router");
const functionHandle = require("../router_handdle/function.handle");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/user.middleware");
const { verufyExitsLabel } = require("../middleware/label.middleware");

const FunctionRouter = new Router({ prefix: "/my" });

FunctionRouter.post("/moment", verifyAuth, functionHandle.moment);

FunctionRouter.get("/moment/:momentId", functionHandle.detail);

FunctionRouter.get("/moment", functionHandle.list);
//1.用户必须登录 2.用户具有的权限
FunctionRouter.patch(
  "/moment/:momentId",
  verifyAuth,
  verifyPermission,
  functionHandle.updata
);
FunctionRouter.delete(
  "/moment/:momentId",
  verifyAuth,
  verifyPermission,
  functionHandle.delete
);
//给动态添加标签
FunctionRouter.post(
  "/moment/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verufyExitsLabel,
  functionHandle.addLabel
);
module.exports = FunctionRouter;
