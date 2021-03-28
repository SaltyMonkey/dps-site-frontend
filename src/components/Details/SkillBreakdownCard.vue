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

<style>
.v-data-table__wrapper {
	font-family: Georgia, 'Times New Roman', Times, serif !important; 
}

.v-data-table.theme--dark > .v-data-table__wrapper::-webkit-scrollbar {
	width: 15px;
}

.v-data-table.theme--dark > .v-data-table__wrapper::-webkit-scrollbar-track {
	background: transparent;
	border-left: 1px solid #2c2c2c;
}

.v-data-table.theme--dark > .v-data-table__wrapper::-webkit-scrollbar-thumb {
	background: #3e3e3e;
	border: solid 3px #202020;
}

.v-data-table.theme--dark > .v-data-table__wrapper::-webkit-scrollbar-thumb:hover {
	background: grey;
}


.v-data-table.theme--light > .v-data-table__wrapper::-webkit-scrollbar {
	width: 15px;
}

.v-data-table.theme--light > .v-data-table__wrapper::-webkit-scrollbar-track {
	background: transparent;
	border-left: 1px solid #dadada;
}

.v-data-table.theme--light > .v-data-table__wrapper::-webkit-scrollbar-thumb {
	background: #b0b0b0;
	border: solid 3px #e6e6e6;
}

.v-data-table.theme--light > .v-data-table__wrapper::-webkit-scrollbar-thumb:hover {
	background: grey;
}
</style>


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
