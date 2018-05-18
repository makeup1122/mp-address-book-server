const merge = require('webpack-merge')
const BaseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(BaseConfig,{
    entry: './src/enter-client.js',
    plugins: [
        new VueSSRClientPlugin()
    ]
})