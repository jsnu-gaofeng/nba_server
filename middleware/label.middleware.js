const connection = require("../app/database");
const labelServer = require("../service/label.server");
const verufyExitsLabel = async (ctx, next) => {
  console.log("验证标签是否已经存在的middleware");
  const { labels } = ctx.request.body;
  for (let name of labels) {
    const isExist = await labelServer.isExistLabel(name);
    if (!isExist) {
      const result = await labelServer.creat(name);
    }
  }
  await next();
};
module.exports = { verufyExitsLabel };
