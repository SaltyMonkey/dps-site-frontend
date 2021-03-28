import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueTimeago from "vue-timeago";

import axios from "./wrappers/axios";
import storage from "./wrappers/storage";
import appConfig from "./appConfig.js";

import "./assets/css/global.css";

import vuetifyThemeMixin from "./mixins/global/vuetifyTheme.js";
import dpsDataMethods from "./mixins/global/dpsDataMethods.js";

Vue.config.productionTip = false;

Vue.prototype.$ls = storage;
Vue.prototype.$http = axios(appConfig.apiUrl);
Vue.prototype.$appConfig = appConfig;

Vue.mixin(vuetifyThemeMixin);
Vue.mixin(dpsDataMethods);

Vue.use(VueTimeago, {
	locales: {
		en: require("date-fns/locale/en"),
		ru: require("date-fns/locale/ru"),
		it: require("date-fns/locale/it"),
		fr: require("date-fns/locale/fr")
	}
});

new Vue({
	router,
	vuetify,
	render: h => h(App)
}).$mount("#app");
