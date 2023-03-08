const Router = require("koa-router");
const labeltHandle = require("../router_handdle/label.handle");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/user.middleware");
const FunctionRouter = new Router({ prefix: "/label" });
FunctionRouter.post("/", verifyAuth, labeltHandle.creat);
FunctionRouter.post("/list", verifyAuth, labeltHandle.list);
module.exports = FunctionRouter;
