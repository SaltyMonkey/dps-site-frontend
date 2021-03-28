<template>
	<v-card class="pa-0 ma-0" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light"
			>Skills breakdown:</v-card-title
		>
		<v-container fluid>
			<v-row>
				<v-data-table
					dense
					class="elevation-2"
					:headers="configuredHeaders"
					:items="items"
					hide-default-footer
					disable-pagination
					disable-filtering
					calculate-widths
				></v-data-table>
			</v-row>
		</v-container>
	</v-card>
</template>


<script>
export default {
	props: ["dpsData"],
	name: "SkillBreakdownCard",
	components: {},
	data: () => ({
		configuredHeaders: [],
		items: []
	}),
	mounted: function() {
		console.log(this.dpsData);
		this.items = this.dpsData.skillLog;
		let temp = [];
		Object.keys(this.dpsData.skillLog[0]).forEach(field => {
			temp.push({text: field, value: field});
		});

		this.configuredHeaders = temp;
	}
};
</script>
