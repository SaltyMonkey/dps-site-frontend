import VueHighlightJS from "vue-highlight.js";

export function useHighlight(app) {
	app.use(VueHighlightJS, {
		languages: {
			json: require("highlight.js/lib/languages/json")
		}
	});
}