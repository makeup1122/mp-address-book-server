const path = require('path')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
    module: {
        noParse: /es6-promise\.js$/, // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件。
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.styl$/,
                loader: ['vue-style-loader', 'css-loader', 'stylus-loader']
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
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    plugins: [
        new VueSSRServerPlugin(),
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin()
    ]
}