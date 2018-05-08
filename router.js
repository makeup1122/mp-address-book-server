const Router = require('koa-router')
const db = require("./sqlite")
const wx = require("./wx")

// 路由实例
const router = new Router()

// 记录全部请求
router.all('/*', async function(ctx, next){
    await next()
    console.log(new Date() + ' :' +ctx.method+" - " + ctx.path +"   [" + ctx.status + "]   " + JSON.stringify(ctx.body))
})

// 根据openId获取通讯录列表
router.get('/address/tables', async function(ctx, next){
    await db.getTables(ctx.request.query).then(function(rows){
	console.log(rows)
	ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 根据openId插入可获得通讯录信息
router.post('/address/tables', async function(ctx, next){
    await db.insertTables(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next()
})

// 通过分享增加可获得通讯录信息
router.post('/address/share', async function(ctx, next){
    await db.shareTables(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 获取选定的通讯录详细信息
router.get('/address/list', async function(ctx, next){
    await db.getDetail(ctx.request.query).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 向选定的通讯录中插入新的详细信息
router.post('/address/list', async function(ctx, next){
    console.log(ctx.request.body)
    await db.insertDetail(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 修改选定的通讯录中的详细信息
router.put('/address/list', async function(ctx, next){
    await db.updateDetail(ctx.request.body).then(function(rows){
        ctx.response.body=rows
    }).catch(function(err){console.log(err)})
    next();
})

// 根据code获取openid
router.get('/wx/onLogin', async function(ctx, next){
    let code = ctx.request.query.code;
    await wx.getSessionKey(code).then(function(res){
	console.log(res)
        ctx.response.body = res
    }).catch(function(err){
        console.log(err)
    })
})

module.exports = router
