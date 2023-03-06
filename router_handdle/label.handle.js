const labelServer = require("../service/label.server");
class labeltHandle {
  async creat(ctx, next) {
    const { name } = ctx.request.body;
    const result = await labelServer.creat(name);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { limit, offset } = ctx.query;
    const result = await labelServer.getLabels(limit, offset);
    ctx.body = result;
  }
}
module.exports = new labeltHandle();
