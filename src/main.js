import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import vuetify from './plugins/vuetify';
import axios from './wrappers/axios';
import storage from "./wrappers/storage";
import appConfig from "./appConfig.js";

import './assets/css/global.css';
import vuetifyThemeMixin from "./mixins/global/vuetifyThemeMixin.js"

Vue.config.productionTip = false;

Vue.prototype.$ls = storage;
Vue.prototype.$http = axios(appConfig.apiUrl);
Vue.prototype.$appConfig = appConfig;

Vue.mixin(vuetifyThemeMixin);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');