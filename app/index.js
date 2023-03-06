const Koa = require('koa')
const cors = require("koa2-cors")

const app = new Koa();

app.use(cors())

const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/index.js');
const errorhandle = require('./errhandle');


app.use(bodyParser());
userRouter(app)


app.on('error', errorhandle)






















module.exports = app;