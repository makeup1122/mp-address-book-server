// const createApp = require('../src/enter-server')
const Router = require('koa-router');
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

// 判断运行环境类别
const isProd = process.env.NODE_ENV === 'production'
var renderer = null;
if(isProd){
  renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./src/index.template.html', 'utf-8')
  })
}else{
  const serverBundleJson = path.resolve(__dirname,'../dist/vue-ssr-server-bundle.json')
  renderer = createBundleRenderer(serverBundleJson, {
    runInNewContext: false, // 推荐
    template: require('fs').readFileSync(path.resolve(__dirname, '../src/index.template.html'), 'utf-8') // （可选）页面模板
  })
}

const router = new Router()
router.all('/*', async function(ctx, next){
  await renderer.renderToString(ctx).then(function(html){
    ctx.body = html
  }).catch(function(err){
    console.log(err)
  })
  next()
})
module.exports = router