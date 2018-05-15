const Router = require('koa-router')
const address = require('./address')
const wx = require('./wx')
const web = require('./web')
const router = new Router()
router.all('/*',function(ctx,next){
    console.log("[koa] URL : " + ctx.url)
    next();
})
router.use('/address', address.routes(), address.allowedMethods())
router.use('/wx', wx.routes(), wx.allowedMethods())
router.use('/web', web.routes(), web.allowedMethods())

module.exports = router