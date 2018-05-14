// router.js
// import Vue from 'vue'
const Vue = require('vue')
// import Router from 'vue-router'
const Index = require('../views/index')
const Router = require('vue-router')
Vue.use(Router)

module.exports = function createRouter () {
	return new Router({
		mode: 'history',
		routes: [
			// ...
			{
				path: "/index",
				componet: Index
			}
		]
	})
}