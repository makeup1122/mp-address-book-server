// router.js
import Vue from 'vue'
// const Vue = require('vue')
import VueRouter from 'vue-router'
import Index from "../views/index.vue";
const User = {
	template: '<div>User</div>'
  }
// const Router = require('vue-router')
Vue.use(VueRouter)
export default function createRouter() {
	return new VueRouter({
		mode: 'history',
		base: '/web/',
		routes: [
			// ...
			{
				path: '/index',
				name: 'Index',
				meta: {
					role: 'super-admin'
				},
				component: User
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