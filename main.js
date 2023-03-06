const app = require('./app/index')
const config = require('./app/config')
    //require('./app/database')
app.listen(config.APP_PORT, () => {
    console.log('有人访问了')
    console.log(`服务器${config.App_PORT}启动成功！！！`);
})