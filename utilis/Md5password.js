const crypto = require("crypto");
const md5password = (content) => {
  let md5 = crypto.createHash("md5"); //创建
  return md5.update(content).digest("hex"); //16进制
};
module.exports = md5password;
