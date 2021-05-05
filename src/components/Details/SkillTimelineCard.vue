<template>
	<v-card class="ma-0 pa-0" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.skillsBreakdown`) }}
		</v-card-title>
		<v-container fluid>
			<Apexchart :series="series" height="100%" :options="chartOptions"></Apexchart>
		</v-container>
	</v-card>
</template>

<script>
export default {
	name: "SkillTimelineCard",
	components: {},
	data: () => ({
		chartOptions: {
			legend: {
				show: true,
				showForSingleSeries: true,
				position: "top",
				horizontalAlign: "left",
			},
			theme: {
				mode: "dark"
			},
			chart: {
				id: "vuechart-example",
				type: "rangeBar"
			},
			plotOptions: {
				bar: {
					horizontal: true,
				}
			},
			tooltip: {
				enabled: true,
				x: {
					show: true,
					formatter: (val, obj) => {
						console.log(val, obj);
						if (!obj) return val;
					},
				},
			},
			xaxis: {
				type: "datetime"
			},
		},
		series: [ {
			name: "Bob",
			data: [
				{
					x: "test skill 1",
					y: [
						0,
						100
					]
				},
				{
					x: "test skill 2",
					y: [
						200,
						300
					]
				},
				{
					x: "test skill 2",
					y: [
						600,
						900
					]
				},	{
					x: "test skill 2",
					y: [
						1000,
						1300
					]
				},	{
					x: "test skill 2",
					y: [
						1700,
						2000
					]
				},	{
					x: "test skill 2",
					y: [
						2150,
						7000
					]
				}
			]
		}
		]
	})
};

</script>
