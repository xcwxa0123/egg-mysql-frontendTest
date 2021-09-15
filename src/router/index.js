import Vue from 'vue'
import Router from 'vue-router'

import LOGIN from '@/view/login/router.js'
import HOME from '@/view/home/router.js'
Vue.use(Router)

const routes = [];
Array.prototype.push.apply(routes, LOGIN)
Array.prototype.push.apply(routes, HOME)


export default new Router({
  mode: 'history',
  routes
})
