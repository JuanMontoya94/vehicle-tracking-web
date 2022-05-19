import Vue from 'vue'
import VueRouter from 'vue-router'
import CrudApp from '../views/CrudApp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Appointment',
    component: CrudApp
  },
  {
    path: '/customer',
    name: 'Customer',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Customer.vue')
  },
  {
    path: '/customerTest',
    name: 'CustomerTest',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomerTest.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
