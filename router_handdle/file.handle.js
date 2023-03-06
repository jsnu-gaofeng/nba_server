const userServer = require("../service/user.server");
const fileServer = require("../service/file.server");
const { APP_Host, APP_PORT } = require("../app/config");
class fileHandle {
  async upload_avatar(ctx, next) {
    //1.获取图像相关信息
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.state.user;
    //2.将图像数据信息保存到数据库
    const result = await fileServer.storage(filename, mimetype, size, id);
    //将图片地址保存到user表中
    const avatarInfo = await userServer.getAvatarByuserId(id);
    const pic_url = `${APP_HOST}:${APP_PORT}/api/avatar/${id}`;
    const isUpdata = await userServer.updateAvatarUrlById(id, pic_url);
    ctx.body = "用户上床头像成功";
  }
  async upload_picture(ctx, next) {
    //1.获取图像相关信息
    const files = ctx.req.files;
    const { id } = ctx.state.user;
    const { momentId } = ctx.query;
    //2.将图像数据信息保存到数据库
    for (let file of files) {
      const { filename, mimetype, size } = file;
      const result = await fileServer.storagePicture(
        filename,
        mimetype,
        size,
        id,
        momentId
      );
    }

    ctx.body = "用户动态配图成功";
  }
}

module.exports = new fileHandle();
