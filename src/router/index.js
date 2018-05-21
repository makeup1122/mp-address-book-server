// router.js
import Vue from "vue";
import VueRouter from "vue-router";
// import Index from "../views/index.vue"
function _import(file) {
	return require('../views/' + file + '.vue').default
}
Vue.use(VueRouter)
export default function createRouter() {
	const router = new VueRouter({
		mode: 'history',
		// base: '/web/',
		routes: [
			{ path: '/web/login', name: 'Login', meta: { role: 'super-admin' }, component: _import('public/login') },
			{ path: '/web/members/:tablexid', name: "Members", props: true, meta: {role: 'super-admin'}, component: _import('index/members')},
			{ path: '/web/index', name: 'Index', meta: { role: 'super-admin' }, component: _import('index/index') },
			{ path: "/web", name: 'Root', meta: { role: 'super-admin' }, component: _import('index/index') },
		]
	});
	return router
}