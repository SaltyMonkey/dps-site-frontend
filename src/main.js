import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import vuetify from './plugins/vuetify';
import VueTimeago from 'vue-timeago'

import axios from './wrappers/axios';
import storage from "./wrappers/storage";
import appConfig from "./appConfig.js";

import './assets/css/global.css';

import vuetifyThemeMixin from "./mixins/global/vuetifyThemeMixin.js";
import getDpsPerSecString from "./mixins/global/getDpsPerSecStrMixin.js";
import getFormattedSec from "./mixins/global/getFormattedSecMixin.js";

Vue.config.productionTip = false;

Vue.prototype.$ls = storage;
Vue.prototype.$http = axios(appConfig.apiUrl);
Vue.prototype.$appConfig = appConfig;

Vue.mixin(vuetifyThemeMixin);
Vue.mixin(getDpsPerSecString);
Vue.mixin(getFormattedSec);
Vue.use(VueTimeago, {
  locales: {
    en: require('date-fns/locale/en'),
    ru: require('date-fns/locale/ru'),
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
