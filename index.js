const Koa = require('koa')
const router = require('./router')
// 注册Koa服务
const app = new Koa();

// 装载路由
app.use(router.routes())
app.use(router.allowedMethods())

// 出错处理
app.on('error',err=> {
    console.log(err);
})

// 监听端口
app.listen(3000);