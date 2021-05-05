import VueApexCharts from "vue-apexcharts";

export function useApexCharts(app) {
	app.use(VueApexCharts);
	app.component("Apexchart", VueApexCharts);
}