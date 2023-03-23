const request = require("../app/request");
const relayServer = require("../service/relay.server");
class relayHandle {
  async get(ctx, next) {
    let picresult = await request({
      url: "https://api.thecatapi.com/v1/images/search?limit=10",
      method: "get",
    });
    let txtresult = await request({
      url: "https://api.uomg.com/api/comments.163?format=json",
      method: "get",
    });
    // console.log("拿到结果了", txtresult.data);
    // console.log("拿到结果了", txtresult.data);
    // console.log(txtresult.data);
    txtresult = txtresult.data.data;
    picresult.data.forEach((item) => {
      item.word = txtresult.content;
    });
    // console.log(picresult.data);
    ctx.body = {
      code: 200,
      data: picresult.data,
    };
  }
}
module.exports = new relayHandle();
