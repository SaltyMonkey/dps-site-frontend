<template>
	<v-card class="elevation-3 mb-0" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.contribution`) }}
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in dt" :key="index">
				<v-col class="pa-1">
					<v-progress-linear
						height="25"
						:value="item.playerTotalDamagePercentage">
						<template v-slot:default="{ value }">
							<v-icon dense left class="ml-3">$class-{{ formatStringLowerCase(item.playerClass) }}</v-icon>
							<v-subheader class="mr-auto text--primary">{{item.playerName}}</v-subheader>
							<v-subheader class="text--secondary text-right">
								{{ formatStringAsDamage(item.playerTotalDamage) }}/{{ formatStringAsDamage(item.critDamage)	}}
							</v-subheader>
							<v-subheader class="text--primary text-right">
								{{ value }}%
							</v-subheader>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: {
		members: Array
	},
	name: "PlayersContributionCard",
	components: {},
	data: () => ({}),
	computed: {
		dt() {
			let data = [];
			this.members.forEach((member) => {
				let summ = 0;
				member.skillLog.forEach((skill) => {
					if (skill.skillTotalCritDamage)
						summ += Number(skill.skillTotalCritDamage);
				});
				data.push({
					playerName: member.playerName,
					playerTotalDamage: member.playerTotalDamage,
					playerClass: member.playerClass,
					critDamage: summ.toString(),
					playerTotalDamagePercentage: member.playerTotalDamagePercentage,
				});
			});
			return data;
		},
	},
};
</script>
