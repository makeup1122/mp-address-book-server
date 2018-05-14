const Router = require('koa-router')
const wx = require("../wx")
const router = new Router()

// 根据code获取openid
router.get('/onLogin', async function(ctx, next){
    let code = ctx.request.query.code;
    await wx.getSessionKey(code).then(function(res){
        console.log(res)
        ctx.response.body = res
    }).catch(function(err){
        console.log(err)
    })
})
 module.exports = router