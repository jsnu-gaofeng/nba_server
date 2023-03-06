const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "../keys/private.key")
);
const PUBLIC_KEY = fs.readFileSync(
  path.resolve(__dirname, "../keys/public.key")
);

dotenv.config(); //直接加载到环境变量里面
// console.log(process.env.APP_PORT)
module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
