// router.js
import Vue from 'vue'
// const Vue = require('vue')
import Router from 'vue-router'
import Index from "../views/index.vue";
// const Router = require('vue-router')
Vue.use(Router)
export default function createRouter() {
	return new Router({
		mode: 'history',
		// base: '/web/',
		routes: [
			// ...
			{
				path: "/web/index",
				name: 'Index',
				meta: {
					role: 'super-admin'
				},
				component: Index
			},
			{
				path: "/",
				name: 'Root',
				meta: {
					role: 'super-admin'
				},
				component: Index
			}
		]
	});
}