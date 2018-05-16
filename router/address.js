const Router = require('koa-router')
const db = require("../sqlite")

// 路由实例
const router = new Router()

// 记录全部请求
router.all('/*', async function(ctx, next){
    await next()
})

// 根据openId获取通讯录列表
router.get('/tables', async function(ctx, next){
    await db.getTables(ctx.request.query).then(function(rows){
        console.log(rows)
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 根据openId插入可获得通讯录信息
router.post('/tables', async function(ctx, next){
    await db.insertTables(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next()
})

// 通过分享增加可获得通讯录信息
router.post('/share', async function(ctx, next){
    await db.shareTables(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 获取选定的通讯录详细信息
router.get('/list', async function(ctx, next){
    await db.getDetail(ctx.request.query).then(function(rows){
        ctx.response.body=rows
	}).catch(function(err){console.log(err)})
    next();
})

// 向选定的通讯录中插入新的详细信息
router.post('/list', async function(ctx, next){
    console.log(ctx.request.body)
    await db.insertDetail(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 修改选定的通讯录中的详细信息
router.put('/list', async function(ctx, next){
    await db.updateDetail(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

module.exports = router
