import Vue from 'vue'
import VueRouter from 'vue-router'
import appConfig from "./appConfig.js"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/eu"
  },
  {
    path: '/:region',
    name: 'Home',
    component: () => import("./views/Home.vue"),
    props: true
  },
  {
    path: '/:region/search/:serverId?/:playerId?',
    name: 'Search',
    component: () => import("./views/Search.vue"),
    props: true
  },
  {
    path: '/:region/top/',
    name: 'Top',
    component: () => import("./views/Top.vue"),
    props: true
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: () => import("./views/DetailedRun.vue"),
    props: true
  },
  {
    path: '/info/about',
    name: 'About',
    component: () => import("./views/information/About.vue"),
  },
  {
    path: '/info/api',
    name: 'Api',
    component: () => import("./views/information/Api.vue"),
  },
  {
    path: '/info/uploads',
    name: 'Uploads',
    component: () => import("./views/information/Uploads.vue"),
  },
  {
    path: '*',
    redirect: '/eu'
  }
]


const router = new VueRouter({
  routes
})
router.beforeResolve((to, from, next) => {
  console.log(to, from)
  if (to.name && to.params.region && !appConfig.allowedRegions.includes(to.params.region)) {
    const newParams = {...to.params};
    newParams.region = appConfig.defaultRegionParamOverride;
    next({ name: to.name, params: newParams})
  }
  else next();
});

export default router
