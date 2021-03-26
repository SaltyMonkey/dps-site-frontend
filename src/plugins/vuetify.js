import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import ru from "@/locales/ru.js";
import en from "@/locales/en.js";
import it from "@/locales/it.js";

import lancer from "@/components/class-icons/lancer.vue";
import archer from "@/components/class-icons/archer.vue";
import berserker from "@/components/class-icons/berserker.vue";
import boss from "@/components/class-icons/boss.vue";
import brawler from "@/components/class-icons/brawler.vue";
import gunner from "@/components/class-icons/gunner.vue";
import mystic from "@/components/class-icons/mystic.vue";
import ninja from "@/components/class-icons/ninja.vue";
import priest from "@/components/class-icons/priest.vue";
import reaper from "@/components/class-icons/reaper.vue";
import slayer from "@/components/class-icons/slayer.vue";
import sorcerer from "@/components/class-icons/sorcerer.vue";
import valkyrie from "@/components/class-icons/valkyrie.vue";
import warrior from "@/components/class-icons/warrior.vue";


Vuetify.config.silent = true;

Vue.use(Vuetify);

export default new Vuetify({
	lang: {
		locales: { ru, en, it },
		current: "en",
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
		iconfont: "mdiSvg",
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
