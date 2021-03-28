<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light"
			>Average crit rate:</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in members" :key="index">
				<v-col class="pa-1">
					<v-progress-linear height="22" color="green" :value="item.playerAverageCritRate">
						<template v-slot:default="{ value }">
								<v-icon
									left
									class="ml-3"
								>$class-{{formatStringLowerCase(item.playerClass)}}</v-icon>
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
	props: ["members"],
	name: "PlayersAverageCritCard",
	components: {},
	data: () => ({})
};
</script>
