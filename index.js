const Koa = require('koa')
const koaBody = require('koa-body');
const router = require('./router/index')
const config = require('./config')
// 注册Koa服务
const app = new Koa();

app.use(koaBody())
// 装载路由
app.use(router.routes())
app.use(router.allowedMethods())

// 出错处理
app.on('error',err=> {
    console.log(err);
})

// 监听端口
app.listen(config.PORT);