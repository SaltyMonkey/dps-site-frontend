
import { useTimeago } from "./vueTimeago";
import { useHighlight } from "./vueHighlight";
import { useVuetify } from "@/vuetify";
import { useRouter } from "@/router";
//import { useApexCharts } from "./vueApexCharts";

export function registerPlugins (app) {
	//useApexCharts(app);
	useRouter(app);
	useTimeago(app);
	useHighlight(app);
	useVuetify(app);
}