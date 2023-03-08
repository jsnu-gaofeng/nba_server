const bcrypt = require("bcryptjs");
const functionServer = require("../service/moment.server");
const labelServer = require("../service/label.server");
const fs = require('fs')
class FunctionHandle {
  async create(ctx, next) {
    //1.获取数据（user_id,content）
    const user_id = ctx.state.user.id;
    const user_name = ctx.state.user.username;
    const content = ctx.request.body.content;
    //2.将数据插入数据库
    const result = await functionServer.insert(user_id, content);
    if (result[0].affectedRows === 1) {
      ctx.body = `用户${user_name}动态发表成功啦！！！`;
    }
  }
  async detail(ctx, next) {
    //1.获取客户端传过来的ID
    const momentId = ctx.params.momentId;
    //2.根据动态的Id查询动态
    const result = await functionServer.searchMoment(momentId);
    ctx.body = result[0];
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

    //给动态添加上独有的标签，需要注意 动态可能已经有标签了，要避免重复
    for (let label of labels) {
      const isInsert = await labelServer.isInsertLabel(momentId, label);
      if (!isInsert) {
        const result = await labelServer.addLabel(momentId, label);
        ctx.body = "标签和动态对应成功~~~";
      }
    }
  }
  async picInfo(ctx, next) {
    const { picname } = ctx.params;
    const result = await functionServer.getPictureInfo(picname)
    const pics = fs.createReadStream(
      `./files/picture/${result[result.length - 1].filename}`
    );
    //想要直接展示必须这样设置
    ctx.response.set("content-type", result[result.length - 1].mimetype);
    ctx.body = pics;

  }
}

module.exports = new FunctionHandle();
