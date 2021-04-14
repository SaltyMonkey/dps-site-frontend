import Vuetify from "vuetify/lib";
import ru from "@/locales/ru.js";
import en from "@/locales/en.js";
import fr from "@/locales/fr.js";
import de from "@/locales/de.js";
import { icons } from "./icons";

Vuetify.config.silent = true;

export function useVuetify (app) {
	app.use(Vuetify);
}
export function createVuetify () {
	const vuetify = new Vuetify({
		lang: {
			locales: { ru, en, fr, de },
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
			dark: true
		},
		icons: icons
	});

	return vuetify;
}