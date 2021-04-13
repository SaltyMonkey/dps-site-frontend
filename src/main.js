import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import VueTimeago from "vue-timeago";

import VueHighlightJS from "vue-highlight.js";
import json from "highlight.js/lib/languages/json";

import backendApi from "./wrappers/api/backend.js";
import resourcesApi from "./wrappers/api/resources.js";
import storage from "./wrappers/storage";
import appConfig from "./appConfig.js";

import vuetifyThemeMixin from "./mixins/global/vuetifyTheme.js";
import dpsDataMethods from "./mixins/global/dpsDataMethods.js";

import(/* webpackPreload: true */"@fontsource/open-sans");
import "./assets/css/global.css";

Vue.config.productionTip = false;

Vue.prototype.$ls = storage;
Vue.prototype.$appConfig = appConfig;
Vue.prototype.$api = backendApi(appConfig.apiUrl);
Vue.prototype.$res = resourcesApi(appConfig.filesUrl);

Vue.mixin(vuetifyThemeMixin);
Vue.mixin(dpsDataMethods);

Vue.use(VueTimeago, {
	locales: {
		en: require("date-fns/locale/en"),
		ru: require("date-fns/locale/ru"),
		fr: require("date-fns/locale/fr"),
		de: require("date-fns/locale/de")
	}
});

Vue.use(VueHighlightJS, {
	languages: {
		json
	}
});

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount("#app");
