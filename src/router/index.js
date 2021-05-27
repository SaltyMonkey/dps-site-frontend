import VueRouter from "vue-router";

export function useRouter(app) {
	app.use(VueRouter);
}

export function createRouter(appConfig, storage) {
	const routes = [
		{
			path: "/",
			redirect: () => {
				const savedMainRegion = storage.get("region");
				if(savedMainRegion && appConfig.allowedRegions.includes(savedMainRegion))
					return `/${savedMainRegion}`;
				else
					return `/${appConfig.defaultRegionParamOverride}`;
			},
			meta: {
				title: appConfig.windowTitle
			}
		},
		{
			path: "/:region",
			name: "Home",
			component: () => import("../views/Home.vue"),
			props: true,
			meta: {
				title: appConfig.windowTitle
			}
		},
		{
			path: "/:region/search",
			name: "Search",
			component: () => import(/* webpackChunkName: "search" */"../views/Search.vue"),
			props: true,
			meta: {
				title: appConfig.windowTitleSearch
			}
		},
		{
			path: "/:region/top/",
			name: "Top",
			component: () => import(/* webpackChunkName: "search" */"../views/Top.vue"),
			props: true,
			meta: {
				title: appConfig.windowTitleSearchTop
			}
		},
		{
			path: "/details/:runId",
			name: "Details",
			component: () => import("../views/DetailedRun.vue"),
			props: true,
			meta: {
				title: appConfig.windowTitleDetails
			}
		},
		{
			path: "/info/about",
			name: "About",
			component: () => import(/* webpackChunkName: "info" */"../views/info/About.vue"),
			meta: {
				title: appConfig.windowTitleAbout
			}
		},
		{
			path: "/info/api",
			name: "Api",
			component: () => import(/* webpackChunkName: "info" */"../views/info/Api.vue"),
			meta: {
				title: appConfig.windowTitleApi
			}
		},
		{
			path: "/info/uploads",
			name: "Uploads",
			component: () => import(/* webpackChunkName: "info" */ "../views/info/Uploads.vue"),
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
		mode: "history",
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

	return router;
}
