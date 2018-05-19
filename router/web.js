const Router = require('koa-router');
const path = require('path')
const LRU = require('lru-cache')
const { createBundleRenderer } = require('vue-server-renderer')
// SSR基础页面模板
const template = require('fs').readFileSync(path.resolve(__dirname, '../src/index.server.template.html'), 'utf-8')
// 客户端文件清单
// const clientManifest = require('fs').readFileSync(path.resolve(__dirname,'../dist/vue-ssr-client-manifest.json'),'utf-8')
let clientManifest = require('../dist/vue-ssr-client-manifest.json')
console.log
// 判断运行环境类别
const isProd = process.env.NODE_ENV === 'production'
function createRenderer (bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('../dist'),
    // recommended for performance
    runInNewContext: false,
    clientManifest: clientManifest
  }))
}
let renderer
let readyPromise
if(!isProd){
  readyPromise = require('../build/setup-dev-server')(
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}else{
  // 生产环境，直接读取生成的bundle.json文件
  const serverBundleJson = path.resolve(__dirname,'../dist/vue-ssr-server-bundle.json')
  renderer = createBundleRenderer(serverBundleJson, {
    template: template, // （可选）页面模板
    clientManifest: clientManifest
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