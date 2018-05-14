// import Vue from 'vue'
const Vue = require('vue')
// import { createRouter } from './router/index'
const createRouter = require('./router/index')
// import App from './App.vue'
const App = require('./App.vue')
module.exports = function createApp () {
	const router = createRouter()
	const app = new Vue({
		router,
		// 根实例简单的渲染应用程序组件。
		render: h => h(App)
	})
	return { app, router }
}