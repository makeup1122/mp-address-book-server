const Router = require('koa-router')
const db = require("./sqlite")
const wx = require("./wx")

// 路由实例
const router = new Router()

// 记录全部请求
router.all('/*', async function(ctx, next){
    await next()
    console.log(ctx.method+" - " + ctx.path +"   [" + ctx.status + "]   " + JSON.stringify(ctx.body))
})

// 根据openId获取通讯录列表
router.get('/address/tables', async function(ctx, next){
    await db.getTables(ctx.request.body).then(function(rows){ctx.response.body=rows}).catch(function(err){console.log(err)})
    next();
})

// 根据openId插入可获得通讯录信息
router.post('/address/tables', async function(ctx, next){
    await db.insertTables(ctx.request.body).then(async function(body, next){
        // 重新获取可获得的通讯录列表并返回
        await db.getTables(body).then(function(rows){ctx.response.body=rows}).catch(function(err){console.log(err)})
        next()
        // 创建同名的通讯录表结构
        await db.createTable(body).then(function(rows){console.log(rows)}).catch(function(err){console.log(err)})
        next()
    }).catch(function(err){console.log(err)})
    next()
})

// 获取选定的通讯录详细信息
router.get('/address/list', async function(ctx, next){
    await db.getDetail(ctx.request.body).then(function(rows){ctx.response.body=rows}).catch(function(err){result = err;})
    next();
})

// 向选定的通讯录中插入新的详细信息
router.post('/address/list', async function(ctx, next){
    await db.insertDetail(ctx.request.body).then(async function(body, next){
        // 重新获取选定的通讯录中全部的详细信息
        await db.getDetail(body).then(function(rows){ctx.response.body=rows}).catch(function(err){result = err;})
        next();
    }).catch(function(err){result = err;})
    next();
})

// 修改选定的通讯录中的详细信息
router.put('/address/list', async function(ctx, next){
    await db.updateDetail(ctx.recent.body).then(async function(body, next){
        // 重新获取选定的通讯录中全部的详细信息
        await db.getDetail(body).then(function(rows){ctx.response.body=rows}).catch(function(err){result = err;})
        next();
    }).catch(function(err){result = err;})
    next();
})

// 根据code获取openid
router.get('/wx/onLogin', async function(ctx, next){
    let code = ctx.request.body.code;
    let result = null;
    await wx.getSessionKey(code).then(function(res){
        result = JSON.parse(res)
        ctx.response.body = result
    }).catch(function(err){
        console.log(err)
    })
})

module.exports = router