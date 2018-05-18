import Vue from "vue";
import createRouter from "./router/index";
import Vuetify from "vuetify";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify)
export default function createApp() {
	const router = createRouter();
	const app = new Vue({
		router,
		// 根实例简单的渲染应用程序组件。
		render: h => h(App)
	});
	return { app, router };
}