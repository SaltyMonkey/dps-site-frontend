import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/information/About.vue'
import Api from '../views/information/Api.vue'
import Test from '../views/information/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/eu"
  },
  {
    path: '/:region',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/:region/top/:val',
    name: 'Test',
    component: Test,
    props: true
  },
  {
    path: '/info/about',
    name: 'About',
    component: About
  },
  {
    path: '/info/api',
    name: 'Api',
    component: Api
  },
  {
      path: '*',
      redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
