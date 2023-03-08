const Multer = require("koa-multer");
const jimp = require("jimp");
const path = require("path");
const avatarUpload = Multer({
  dest: "./files/avatar",
});
const avatarHandler = avatarUpload.single("avatar");
const pictureUpload = Multer({
  dest: "./files/picture",
});
const pictureHandler = pictureUpload.array("picture", 9);
// const pictureHandler = pictureUpload.fields([{ name: "picture", maxCount: 3 }]);
//这里缺一个next() 需要解决一下！！！！！！！！！！！！！！ 回：第三方模块有
const pictureResiza = async (ctx, next) => {
  const files = ctx.req.files;
  for (let file of files) {
    const destPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then((image) => {
      image.resize(1280, jimp.AUTO).write(`${destPath}-large`);
    });
    //对上传的图像进行处理
  }
  await next();
};
module.exports = { avatarHandler, pictureHandler, pictureResiza };
