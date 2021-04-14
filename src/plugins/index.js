
import { useTimeago } from "./vueTimeago";
import { useHighlight } from "./vueHighlight";
import { useVuetify } from "@/vuetify";

export function registerPlugins (app) {
	useTimeago(app);
	useHighlight(app);
	useVuetify(app);
}