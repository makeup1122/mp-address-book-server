const Router = require('koa-router')
const db = require("../sqlite")

// 路由实例
const router = new Router()

// 记录全部请求
router.all('/*', async function(ctx, next){
    await next()
})
// 根据openId获取通讯录列表
router.get('/classes', async function(ctx, next){
    await db.getClaseees().then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})
router.get('/members',async function(ctx,next){
    await db.getMembers(ctx.query.tablexid).then(function(rows){
        ctx.response.body = rows
    }).catch(function(err){console.log(err)})
    next();
})
module.exports = router