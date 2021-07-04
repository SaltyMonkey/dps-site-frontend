<template>
	<v-card class="elevation-3 mb-0" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.avgCritRate`) }}
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in members" :key="index">
				<v-col class="pa-1">
					<v-progress-linear height="25" color="green" :value="item.playerAverageCritRate">
						<template v-slot:default="{ value }">
							<v-icon
								dense
								left
								class="ml-3">$class-{{ item.playerClass.toLowerCase() }}</v-icon>
							<v-subheader class="mr-auto text--primary">{{ item.playerName }}</v-subheader>
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
	name: "PlayersAverageCritCard",
	components: {},
	props: {
		members: Array
	},
	data: () => ({})
};
</script>
