
<template>
	<v-card class="elevation-3 mb-2" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.aggroStats`) }}
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in dt" :key="index">
				<v-col class="pa-1">
					<template>
						<v-progress-linear color="red" height="25" :value="item.aggro">
							<template v-slot:default="{ value }">
								<v-icon dense left class="ml-3">
									$class-{{ formatStringLowerCase(item.playerClass) }}
								</v-icon>
								<v-subheader class="mr-auto">{{ item.playerName }}</v-subheader>
								<v-subheader class="text-right">{{ formatStringAsTimeSpan(item.aggroTime) }} {{ value }}%</v-subheader>
							</template>
						</v-progress-linear>
					</template>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: {
		fightDuration: String,
		members: Array
	},
	name: "PlayerAggroCard",
	components: {},
	computed: {
		dt() {
			let data = [];
			const time = Number(this.fightDuration);
			this.members.forEach((member) => {
				data.push({
					playerName: member.playerName,
					playerClass: member.playerClass,
					aggro: member.aggro,
					aggroTime: (Math.round((time*Number(member.aggro))/ 100))
				});
			});
			return data;
		},
	},
};
</script>
