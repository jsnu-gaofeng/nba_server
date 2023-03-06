const Router = require("koa-router");
const Multer = require("koa-multer");
const fileHandle = require("../router_handdle/file.handle");
const {
  verifyAuth,
  verifyPermission,
} = require("../middleware/user.middleware");
const { avatarHandler,pictureHandler,pictureResiza } = require("../middleware/pic.middleware");
// const avatarUpload = Multer({
//   dest: "./files/avatar",
// });
// const avatarHandler = avatarUpload.single("avatar");
const FileRouter = new Router({ prefix: "/upload" });

FileRouter.post("/avatar", verifyAuth, avatarHandler, fileHandle.upload_avatar);

FileRouter.post("/picture", verifyAuth, pictureHandler,pictureResiza, fileHandle.upload_picture);
module.exports = FileRouter;
