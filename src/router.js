import Vue from "vue";
import VueRouter from "vue-router";
import appConfig from "./appConfig.js";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		redirect: "/eu",
		meta: {
			title: appConfig.windowTitle
		}
	},
	{
		path: "/:region",
		name: "Home",
		component: () => import(/* webpackChunkName: "main-group" */"./views/Home.vue"),
		props: true,
		meta: {
			title: appConfig.windowTitle
		}
	},
	{
		path: "/:region/search",
		name: "Search",
		component: () => import(/* webpackChunkName: "search-group" */ "./views/Search.vue"),
		props: true,
		meta: {
			title: appConfig.windowTitleSearch
		}
	},
	{
		path: "/:region/top/",
		name: "Top",
		component: () => import(/* webpackChunkName: "search-group" */ "./views/Top.vue"),
		props: true,
		meta: {
			title: appConfig.windowTitleSearchTop
		}
	},
	{
		path: "/details/:runId",
		name: "Details",
		component: () => import(/* webpackChunkName: "main-group" */"./views/DetailedRun.vue"),
		props: true,
		meta: {
			title: appConfig.windowTitleDetails
		}
	},
	{
		path: "/info/about",
		name: "About",
		component: () => import(/* webpackChunkName: "info-group" */"./views/information/About.vue"),
		meta: {
			title: appConfig.windowTitleAbout
		}
	},
	{
		path: "/info/api",
		name: "Api",
		component: () => import(/* webpackChunkName: "info-group" */"./views/information/Api.vue"),
		meta: {
			title: appConfig.windowTitleApi
		}
	},
	{
		path: "/info/uploads",
		name: "Uploads",
		component: () => import(/* webpackChunkName: "info-group" */"./views/information/Uploads.vue"),
	},
	{
		path: "*",
		redirect: "/eu",
		meta: {
			title: appConfig.windowTitle
		}
	}
];

const router = new VueRouter({
	routes
});
router.beforeResolve((to, _from, next) => {
	document.title = to.meta.title || appConfig.windowTitle;
	if (to.name && to.params.region && !appConfig.allowedRegions.includes(to.params.region)) {
		const newParams = { ...to.params };
		newParams.region = appConfig.defaultRegionParamOverride;
		next({ name: to.name, params: newParams });
	}
	else next();
});

export default router;
