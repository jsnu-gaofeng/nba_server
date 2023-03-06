const bcrypt = require("bcryptjs");
const functionServer = require("../service/function.server");
const labelServer = require("../service/label.server");

class FunctionHandle {
  async moment(ctx, next) {
    //1.获取数据（user_id,content）
    const user_id = ctx.state.user.id;
    const content = ctx.request.body.content;
    //2.将数据插入数据库
    console.log("准备");

    const result = await functionServer.moment(user_id, content);
    console.log("@@@", result);

    ctx.body = result;
  }
  async detail(ctx, next) {
    //1.获取客户端传过来的ID
    const momentId = ctx.params.momentId;
    //2.根据动态的Id查询动态
    const result = await functionServer.searchMoment(momentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    //1.获取客户端传过来的ID
    const { offset, size } = ctx.query;
    //2.根据动态的Id查询动态
    const result = await functionServer.searchList(offset, size);
    ctx.body = result;
  }
  async updata(ctx, next) {
    //1.获取客户端传过来的ID
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await functionServer.updataMoment(momentId, content);

    ctx.body = result;
  }
  async delete(ctx, next) {
    //1.获取客户端传过来的ID
    const { momentId } = ctx.params;
    const result = await functionServer.deleteMoment(momentId);

    ctx.body = result;
  }
  async addLabel(ctx, next) {
    const { labels } = ctx.request.body;
    const { momentId } = ctx.params;
    console.log(labels, momentId);
    //给动态添加上独影的标签，需要注意 动态可能已经有标签了，要避免重复
    for (let label of labels) {
      const isInsert = await labelServer.isInsertLabel(momentId, label);
      console.log(isInsert);

      if (!isInsert) {
        const result = await labelServer.addLabel(momentId, label);
        ctx.body = "标签和动态对应成功~~~";
      }
    }

    const result = await commentServer.addLabel(labels, momentId);
    ctx.body = result;
  }
}

module.exports = new FunctionHandle();
