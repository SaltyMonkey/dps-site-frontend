import VueHighlightJS from "vue-highlight.js";
import "highlight.js/styles/default.css";

export function useHighlight(app) {
	app.use(VueHighlightJS, {
		languages: {
			json: require("highlight.js/lib/languages/json")
		}
	});
}