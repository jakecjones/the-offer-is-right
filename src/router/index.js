import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: MainView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
