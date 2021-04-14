import VueTimeago from "vue-timeago";

export function useTimeago(app) {
	app.use(VueTimeago, {
		locales: {
			en: require("date-fns/locale/en"),
			ru: require("date-fns/locale/ru"),
			fr: require("date-fns/locale/fr"),
			de: require("date-fns/locale/de")
		}
	});
}