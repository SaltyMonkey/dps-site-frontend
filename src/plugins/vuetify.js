import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import ru from '@/locales/ru.js';
import en from '@/locales/en.js';
import it from '@/locales/it.js';

import lancer from "@/components/ic/lancer.vue";
import archer from "@/components/ic/archer.vue";
import berserker from "@/components/ic/archer.vue";
import boss from "@/components/ic/boss.vue";
import brawler from "@/components/ic/brawler.vue";
import gunner from "@/components/ic/gunner.vue";
import mystic from "@/components/ic/mystic.vue";
import ninja from "@/components/ic/ninja.vue";
import priest from "@/components/ic/priest.vue";
import reaper from "@/components/ic/reaper.vue";
import slayer from "@/components/ic/slayer.vue";
import sorcerer from "@/components/ic/sorcerer.vue";
import valkyrie from "@/components/ic/valkyrie.vue";
import warrior from "@/components/ic/warrior.vue";


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
    },
    theme: { dark: true }
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      "class-lancer": {
        component: lancer
      },
      "class-archer": {
        component: archer
      },
      "class-berserker": {
        component: berserker
      },
      "boss": {
        component: boss
      },
      "class-brawler": {
        component: brawler
      },
      "class-gunner": {
        component: gunner
      },
      "class-mystic": {
        component: mystic
      },
      "class-ninja": {
        component: ninja
      },
      "class-priest": {
        component: priest
      },
      "class-reaper": {
        component: reaper
      },
      "class-slayer": {
        component: slayer
      },
      "class-sorcerer": {
        component: sorcerer
      },
      "class-valkyrie": {
        component: valkyrie
      },
      "class-warrior": {
        component: warrior
      },
    }
  },
});
