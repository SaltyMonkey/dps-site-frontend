import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from '@/locales/ru.js';
import en from '@/locales/en.js';
import it from '@/locales/it.js';

Vuetify.config.silent = true;

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { ru, en, it },
    current: 'en',
  },
  theme: {
    themes: {
      light: {
        background: "#ececec"
      },
      dark: {
        
      }
    }
  },
  icons: {
    iconfont: 'mdi',
  },
});
