const commentServer = require("../service/comment.server");
class commentHandle {
  //发一条评论
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.state.user;
    const result = await commentServer.create(momentId, content, id);
    ctx.body = result;
  }
  //针对某条动态下的某条评论的回复
  async reply(ctx, next) {
    const { momentId, content, commentId } = ctx.request.body;
    const { id } = ctx.state.user;
    const result = await commentServer.reply(momentId, content, id, commentId);
    ctx.body = result;
  }
  async updata(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentServer.updata(commentId, content);
    ctx.body = result;
  }
  async delete(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentServer.delete(commentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    const { momentId } = ctx.request.body;
    const result = await commentServer.list(momentId);
    ctx.body = result;
  }
}
module.exports = new commentHandle();
