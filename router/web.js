const createApp = require('../src/enter-server')
const Router = require('koa-router');
const router = new Router()
router.all('/*', function(ctx, next){
    // const app = new Vue({
    //     data: {
    //       url: ctx.url
    //     },
    //     template: `<div>访问的 URL 是： {{ url }}</div>`
    //   })
    //   renderer.renderToString(app, (err, html) => {
    //     if (err) {
    //         console.log(err)
    //       ctx.status = 500
    //       return
    //     }
    //     ctx.body = '<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body>1231312</body></html>'
    //   })
    createApp(ctx).then(app => {
        renderer.renderToString(app, (err, html) => {
          if (err) {
            if (err.code === 404) {
                ctx.status(404)
                ctx.body('Page not found')
            } else {
                ctx.status(500)
                ctx.body('Internal Server Error')
            }
          } else {
            ctx.body(html)
          }
        })
    }).catch( err => {
        console.log(err);
    })
})
module.exports = router