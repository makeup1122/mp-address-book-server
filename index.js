const Koa = require('koa')
const koaBody = require('koa-body');
const serve = require('koa-static')
const router = require('./router/index')
const config = require('./config')
const path = require('path')
// 注册Koa服务
const app = new Koa();

// app.use(serve(path.resolve(__dirname,'./dist')))
app.use(serve('./dist'))
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