const Router = require("koa-router");
const momentHandle = require("../router_handdle/moment.handle");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/user.middleware");
const { verufyExitsLabel } = require("../middleware/label.middleware");

const FunctionRouter = new Router({ prefix: "/my" });
FunctionRouter.post("/moment", verifyAuth, momentHandle.create);
FunctionRouter.get("/moment/:momentId", momentHandle.detail);
FunctionRouter.get("/moment", momentHandle.list);
//1.用户必须登录 2.用户具有的权限
FunctionRouter.patch(
  "/moment/:momentId",
  verifyAuth,
  verifyPermission,
  momentHandle.updata
);
FunctionRouter.delete(
  "/moment/:momentId",
  verifyAuth,
  verifyPermission,
  momentHandle.delete
);

//给动态添加标签
FunctionRouter.post(
  "/moment/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verufyExitsLabel,
  momentHandle.addLabel
);
FunctionRouter.get("/moment/images/:picname", momentHandle.picInfo);

module.exports = FunctionRouter;
