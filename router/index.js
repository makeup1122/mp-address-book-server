const Router = require('koa-router')
const address = require('./address')
const wx = require('./wx')
const web = require('./web')
const router = new Router()

router.redirect('/','/web/index')
router.use('/address', address.routes(), address.allowedMethods())
router.use('/wx', wx.routes(), wx.allowedMethods())
router.use('/web', web.routes(), web.allowedMethods())

router.all('/*',function(ctx,next){
    // console.log('Koa[url] ' + new Date() + ' :' +ctx.method+" - " + ctx.path +"   [" + ctx.status + "]   " + JSON.stringify(ctx.body))
    console.log('Koa[url] ' + new Date() + ' :' +ctx.method+" - " + ctx.path +"   [" + ctx.status + "]   ")
    next();
})
module.exports = router