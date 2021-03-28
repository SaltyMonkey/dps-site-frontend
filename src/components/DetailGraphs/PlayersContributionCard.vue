<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light"
			>Contribution:</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in data" :key="index">
				<v-col class="pa-1">
					<v-progress-linear height="22" :value="item.playerTotalDamagePercentage">
						<template v-slot:default="{ value }">
								<v-icon
									left
									class="ml-3"
								>$class-{{formatStringLowerCase(item.playerClass)}}</v-icon>
								<v-subheader class="mr-auto text--primary">{{ item.playerName }}</v-subheader>
								<v-subheader class="pr-1 text--secondary text-right">{{formatStringAsDamage(item.playerTotalDamage)}}/{{formatStringAsDamage(item.critDamage)}}</v-subheader>
								<v-subheader class="pl-1 text--primary text-right">{{ value }}%</v-subheader>
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
	name: "PlayerContributionCard",
	components: {},
	data: () => ({
		data: []
	}),
	mounted: function () {
		this.members.forEach(member => {
			let summ = 0;
			member.skillLog.forEach(skill => {
				console.log(skill);
				if(skill.skillTotalCritDamage) summ += Number(skill.skillTotalCritDamage);
			});
			this.data.push({playerName: member.playerName, playerTotalDamage: member.playerTotalDamage, playerClass: member.playerClass, critDamage: summ.toString(), playerTotalDamagePercentage: member.playerTotalDamagePercentage});
		});
	}
};
</script>
