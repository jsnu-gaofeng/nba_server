const Router = require('koa-router')

const userRouter = new Router({ prefix: '/my' });
//注册、登录处理函数
const userHandle = require('../router_handdle/user.handdle')
const { verifyAuth } = require('../middleware/user.middleware')

//注册接口
userRouter.post('/test', verifyAuth, async(ctx, next) => {
    console.log(111111111111, ctx.state.user);
    ctx.body = '通过验证了'

})

//登录接口
module.exports = userRouter;