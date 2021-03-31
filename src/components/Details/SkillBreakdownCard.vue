<template>
	<v-card class="pa-0 ma-0" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			{{ $vuetify.lang.t(`$vuetify.skillsBreakdown`) }}
		</v-card-title>
		<v-container fluid>
			<v-row>
				<v-data-table
					dense
					class="elevation-2 mono"
					:headers="configuredHeaders"
					:items="skillLogCompleteValidSkills"
					hide-default-footer
					disable-pagination
					disable-filtering
					disable-sort
					calculate-widths
					multiple
				>
					<!-- eslint-disable next line vue/valid-v-slot -->
					<template v-slot:item.skillId="{ item }">
						<v-row>
							<v-img left class="mr-1" min-width="24" min-height="24" max-width="24" max-height="24" :src="`/static/icons/${getIcon(item.skillId)}.png`"></v-img>
							<span>{{getName(item.skillId)}}</span>
						</v-row>
					</template>
				</v-data-table>
			</v-row>
		</v-container>
	</v-card>
</template>

<style>
.mono {
	font-family: monospace;
}
</style>

<script>
export default {
	props: ["playerClass", "skillData", "dpsData"],
	name: "SkillBreakdownCard",
	components: {},
	data: () => ({
		configuredHeaders: [
			{
				text: "Skill",
				value: "skillId",
				divider: true,
				width: 280,
			},
			{
				text: "Dmg (%):",
				value: "skillDamagePercent",
				divider: true,
			},
			{
				text: "Crit (%):",
				value: "skillCritRate",
				divider: true,
			},
			{
				text: "Hits:",
				value: "skillHits",
				divider: true,
			},
			{
				text: "Casts:",
				value: "skillCasts",
				divider: true,
			},
			{
				text: "Total dmg:",
				value: "skillTotalDamage",
				divider: true,
			},
			{
				text: "Total crit dmg:",
				value: "skillTotalCritDamage",
				divider: true,
			},
			{
				text: "lowest crit dmg:",
				value: "skillLowestCrit",
				divider: true,
			},
			{
				text: "Avg crit dmg:",
				value: "skillAverageCrit",
				divider: true,
			},
			{
				text: "Avg highest crit dmg:",
				value: "skillHighestCrit",
				
			},
		],
	}),
	computed: {
		skillLogCompleteValidSkills() {
			return this.dpsData.skillLog.filter((x) => Object.keys(x).length > 2 && this.skillData[this.playerClass][x.skillId]);
		}
	},
	methods: {
		getIcon(skillId) {
			return this.skillData[this.playerClass][skillId].icon;
		},
		getName(skillId) {
			return this.skillData[this.playerClass][skillId].name;
		}
	}
};

</script>
