const Vue = require("vue")
const createRouter = require("./router/index")
const Vuetify = require('vuetify')
const App = require("./App.vue")
require('vuetify/dist/vuetify.min.css')
Vue.use(Vuetify)
module.exports = function createApp() {
	const router = createRouter();
	const app = new Vue({
		router,
		// 根实例简单的渲染应用程序组件。
		render: h => h(App)
	});
	return { app, router };
}