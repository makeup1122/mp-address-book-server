import Vue from "vue";
import createRouter from "./router/index";
import createStore  from "./store/index";
import Vuetify from "vuetify";
import App from "./App.vue";
import { sync } from 'vuex-router-sync'
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify)
export default function createApp() {
	// 创建 router 和 store 实例
	const router = createRouter();
	const store = createStore();
	// 同步路由状态(route state)到 store
	sync(store, router)
	// 创建应用程序实例，将 router 和 store 注入
	const app = new Vue({
		router,
		store,
		// 根实例简单的渲染应用程序组件。
		render: h => h(App)
	});
	// 暴露 app, router 和 store。
	return { app, router, store };
}