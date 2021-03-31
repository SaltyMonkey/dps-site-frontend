<template>
	<v-card class="pa-0 ma-0" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			{{ $vuetify.lang.t(`$vuetify.skillsBreakdown`) }}
		</v-card-title>
		<v-container fluid>
			<v-row>
				<v-data-table
					dense
					class="elevation-2"
					:headers="configuredHeaders"
					:items="skillLogCompleteSkills"
					hide-default-footer
					disable-pagination
					disable-filtering
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
				width: 250,
			},
			{
				text: "Dmg (%):",
				value: "skillDamagePercent",
				width: 100,
			},
			{
				text: "Crit (%):",
				value: "skillCritRate",
				width: 100,
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
				text: "Total dmg:",
				value: "skillTotalDamage",
			},
			{
				text: "Total crit dmg:",
				value: "skillTotalCritDamage",
			},
			{
				text: "lowest crit dmg:",
				value: "skillLowestCrit",
			},
			{
				text: "Avg crit dmg:",
				value: "skillAverageCrit",
			},
			{
				text: "Avg highest crit dmg:",
				value: "skillHighestCrit",
			},
		],
	}),
	computed: {
		skillLogCompleteSkills() {
			return this.dpsData.skillLog.filter(x => ((Object.keys(x).length) > 2));
		},
		skillLogOnlyCastsSkills() {
			return this.dpsData.skillLog.filter(x => ((Object.keys(x).length) === 2));
		},
		classData() {
			return this.skillData[this.playerClass];
		},
	},
	methods: {
		getIcon(skillId) {
			let ret = undefined;
			if(this.classData[skillId]) {
				ret = this.classData[skillId].icon;
			}
			if(this.skillData["Common"][skillId]) {
				ret = this.skillData["Common"][skillId].icon;
			}

			return ret || "";
		},
		getName(skillId) {
			let ret = undefined;
			if(this.classData[skillId]) {
				return this.classData[skillId].name;
			}
			if(this.skillData["Common"][skillId]) {
				ret = this.skillData["Common"][skillId].name;
			}
			return ret || skillId;
		}
	}
};
</script>
