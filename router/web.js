// const createApp = require('../src/enter-server')
const Router = require('koa-router');
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
// const renderer = require('vue-server-renderer').createRenderer({
//     template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
// })
const serverBundleJson = path.resolve(__dirname,'../dist/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(serverBundleJson, {
    runInNewContext: false, // 推荐
    template: require('fs').readFileSync(path.resolve(__dirname, '../src/index.template.html'), 'utf-8') // （可选）页面模板
  })
const router = new Router()
router.all('/*', async function(ctx, next){
  await renderer.renderToString(ctx, (err, html) => {
    if (err) {
      console.log(err)
    } else {
      console.log("html: "+ html)
      ctx.response.body = html
    }
  })
  console.log(ctx.body)
  await next()
})
module.exports = router