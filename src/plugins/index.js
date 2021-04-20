
import { useTimeago } from "./vueTimeago";
import { useHighlight } from "./vueHighlight";
import { useVuetify } from "@/vuetify";
import { useRouter } from "@/router";

export function registerPlugins (app) {
	useRouter(app);
	useTimeago(app);
	useHighlight(app);
	useVuetify(app);
}