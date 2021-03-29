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
					:items="dpsData.skillLog"
					hide-default-footer
					disable-pagination
					disable-filtering
					calculate-widths
				></v-data-table>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["dpsData"],
	name: "SkillBreakdownCard",
	components: {},
	data: () => ({
		configuredHeaders: [
			{
				text: "Skill",
				value: "skillId",
			},
			{
				text: "Dmg (%):",
				value: "skillDamagePercent",
				width: 100
			},
			{
				text: "Crit (%):",
				value: "skillCasts",
				width: 100
			},
			{
				text: "Hits:",
				value: "skillHits",
			},
			{
				text: "Casts:",
				value: "skillCasts",
			},
			{
				"text": "Total dmg:",
				"value": "skillTotalDamage"
			},
			{
				"text": "Total crit dmg:",
				"value": "skillTotalCritDamage"
			},
			{
				"text": "lowest crit dmg:",
				"value": "skillLowestCrit"
			},
			{
				"text": "Avg crit dmg:",
				"value": "skillAverageCrit"
			},
			{
				"text": "Avg highest crit dmg:",
				"value": "skillHighestCrit"
			}
			
		]
	})
};
</script>
