<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 pb-3 text--secondary text-body-2 font-weight-light"
			>Buffs uptime::</v-card-title
		>
		<v-container fluid>
			<v-row>
				<template v-for="(item, index) in buffUptime">
					<v-card min-height="55" min-width="55" outlined class ="ma-1" :key=index>
						<v-row no-gutters justify="center" class="mt-1">
							<v-img max-height="28" max-width="28" :src="`/static/icons/${abnormalsData[item[0]].icon}.png`"></v-img>
						</v-row>
						<v-row class="blabla" no-gutters justify="center">{{item[1][0][1]}}%</v-row>
					</v-card>
				</template>
			</v-row>
		</v-container>
	</v-card>
</template>

<style>
.blabla  {
	font-size: 14px;
}
</style>
<script>
export default {
	props: ["abnormalsData", "buffUptime"],
	name: "BuffUptimeCard",
	components: {},
	data: () => ({})
};
</script>
