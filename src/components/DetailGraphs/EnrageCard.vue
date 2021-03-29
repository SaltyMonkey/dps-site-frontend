<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			Enrage uptime:
		</v-card-title>
		<v-container fluid>
			<v-row>
				<v-col class="pa-1">
					<v-progress-linear color="#BF360C" height="25" :value="uptime">
						<template v-slot:default="{ value }">
								<v-subheader class="text-right text--primary">{{ value }}%</v-subheader>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["uptime"],
	name: "BossEnrageCard",
	components: {}
};
</script>
