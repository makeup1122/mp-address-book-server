// router.js
const Vue = require('vue')
const VueRouter = require('vue-router')
// import Index from "../views/index.vue"
function _import(file) {
	return require('../views/' + file + '.vue').default
}
Vue.use(VueRouter)
module.exports = function createRouter() {
	return new VueRouter({
		mode: 'history',
		base: '/web/',
		routes: [
			{ path: '/web/login', name: 'Login', meta: { role: 'super-admin' }, component: _import('public/login')},
			{ path: '/web/index', name: 'Index', meta: { role: 'super-admin' }, component: _import('index/index') },
			{ path: "/web", name: 'Root', meta: { role: 'super-admin' }, component: _import('index/index') },
		]
	});
}