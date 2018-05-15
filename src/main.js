// import Vue from 'vue'
import Vue from "vue";
// import { createRouter } from './router/index'
import createRouter from "./router/index";
// import App from './App.vue'
import App from "./App.vue";
export default function createApp() {
	const router = createRouter();
	console.log('router.currentRoute: ' + router.currentRoute);
	console.log(router.currentRoute);
	const app = new Vue({
		router,
		// 根实例简单的渲染应用程序组件。
		render: h => h(App)
	});
	return { app, router };
}