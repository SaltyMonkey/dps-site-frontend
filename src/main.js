import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import backendApi from "./wrappers/api/backend.js";
import resourcesApi from "./wrappers/api/resources.js";
import storage from "./wrappers/storage";
import appConfig from "./appConfig.js";

import vuetifyThemeMixin from "./mixins/global/vuetifyTheme.js";
import dpsDataMethods from "./mixins/global/dpsDataMethods.js";

import(/* webpackPreload: true */"@fontsource/open-sans");
import "./assets/css/global.css";

import { registerPlugins } from "./plugins";
import { createVuetify } from "@/vuetify";

Vue.config.productionTip = false;

Vue.prototype.$ls = storage;
Vue.prototype.$appConfig = appConfig;
Vue.prototype.$api = backendApi(appConfig.apiUrl);
Vue.prototype.$res = resourcesApi(appConfig.filesUrl);

Vue.mixin(vuetifyThemeMixin);
Vue.mixin(dpsDataMethods);

registerPlugins(Vue);

new Vue({
	router,
	vuetify: createVuetify(),
	render: h => h(App)
}).$mount("#app");
