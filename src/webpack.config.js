const nodeExternals = require('webpack-node-externals')
const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const { VueLoaderPlugin } = require('vue-loader')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
  }
const config = {
    mode: 'none',
    entry: './src/enter-server.js',
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                  compilerOptions: {
                    preserveWhitespace: false
                  }
                }
              }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('src'),
        }
      },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，
    // 并生成较小的 bundle 文件。
    externals: nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        whitelist: /\.css$/
    }),

    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin(),
        new VueLoaderPlugin()
    ]
}
module.exports = config