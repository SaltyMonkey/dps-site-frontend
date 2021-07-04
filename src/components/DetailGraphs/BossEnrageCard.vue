<template>
	<v-card class="elevation-3 mb-2" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.enrageUptime`) }}
		</v-card-title>
		<v-container fluid>
			<v-row>
				<v-col class="pa-1">
					<v-progress-linear color="red darken-1" height="25" :value="uptime">
						<template v-slot:default="{ value }">
							<v-subheader class="text--primary text-right">{{ value }}%</v-subheader>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	name: "BossEnrageCard",
	components: {},
	props: {
		uptime: Number
	}
};
</script>
