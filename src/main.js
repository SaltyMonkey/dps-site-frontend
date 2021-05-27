import Vue from "vue";
import App from "./App.vue";

import backendApi from "./wrappers/api/backend.js";
import resourcesApi from "./wrappers/api/resources.js";
import storage from "./wrappers/storage";
import appConfig from "./appConfig.js";

import vuetifyThemeMixin from "./mixins/global/vuetifyTheme.js";
import dpsDataMethods from "./mixins/global/dpsDataMethods.js";

import "@fontsource/open-sans";
import "./assets/css/global.css";

import { registerPlugins } from "./plugins";
import { createVuetify } from "@/vuetify";
import { createRouter } from "@/router";

Vue.config.productionTip = false;

Vue.prototype.$ls = storage;
Vue.prototype.$appConfig = appConfig;
Vue.prototype.$api = backendApi(process.env.VUE_APP_API_LINK);
Vue.prototype.$res = resourcesApi(process.env.VUE_APP_STATIC_LINK);

Vue.mixin(vuetifyThemeMixin);
Vue.mixin(dpsDataMethods);

registerPlugins(Vue);

new Vue({
	router: createRouter(appConfig, storage),
	vuetify: createVuetify(),
	render: h => h(App)
}).$mount("#app");
