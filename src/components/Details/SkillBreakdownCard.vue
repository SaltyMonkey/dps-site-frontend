<template>
	<v-card class="ma-0 pa-0" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.skillsBreakdown`) }}
		</v-card-title>
		<v-container fluid>
			<v-row>
				<v-data-table
					dense
					class="elevation-2"
					:headers="configuredHeaders"
					:items="skillLogCompleteValidSkills"
					hide-default-footer
					disable-pagination
					disable-filtering
					disable-sort
					calculate-widths
					multiple>
					<!-- eslint-disable next line vue/valid-v-slot -->
					<template v-slot:item.skillId="{ item }">
						<v-chip label color="transparent" class="pl-0">
							<v-img left class="mr-1" min-width="24" min-height="24" max-width="24" max-height="24" :src="`/static/icons/${getIcon(item.skillId)}.png`"></v-img>
							<span>{{getName(item.skillId)}}</span>
						</v-chip>
					</template>
				</v-data-table>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: {
		fightDuration: String,
		playerClass: String,
		skillData: Object,
		dpsData: Object
	},
	name: "SkillBreakdownCard",
	components: {},
	data: () => ({
		normalizeFields: ["skillAverageWhite", "skillTotalDamage", "skillTotalCritDamage", "skillLowestCrit", "skillAverageCrit", "skillHighestCrit"],
		configuredHeaders: [
			{
				text: "Skill",
				value: "skillId",
				divider: true
			},
			{
				text: "Dmg (%):",
				value: "skillDamagePercent",
				divider: true,
				align: "end",
			},
			{
				text: "Crit (%):",
				value: "skillCritRate",
				divider: true,
				align: "end",
			},
			{
				text: "Hits:",
				value: "skillHits",
				divider: true,
				align: "end",
			},
			{
				text: "HPM:",
				value: "skillHPM",
				divider: true,
				align: "end",
			},
			{
				text: "Casts:",
				value: "skillCasts",
				divider: true,
				align: "end",
			},
			{
				text: "Total dmg:",
				value: "skillTotalDamage",
				divider: true,
				align: "end",
			},
			{
				text: "Total crit dmg:",
				value: "skillTotalCritDamage",
				divider: true,
				align: "end",
			},
			{
				text: "Average white:",
				value: "skillAverageWhite",
				divider: true,
				align: "end",
			},
			{
				text: "lowest crit dmg:",
				value: "skillLowestCrit",
				divider: true,
				align: "end",
			},
			{
				text: "Avg crit dmg:",
				value: "skillAverageCrit",
				divider: true,
				align: "end",
			},
			{
				text: "Highest crit dmg:",
				value: "skillHighestCrit",
				align: "end",
			},
		],
	}),
	computed: {
		skillLogCompleteValidSkills() {
			let filtered = this.dpsData.skillLog.filter((x) => Object.keys(x).length > 2 && this.skillData[this.playerClass][x.skillId]);
			let normalized = [];
			filtered.forEach(inst => {
				let formatted = this.formatValues(inst);
				let modified = this.addHPM(formatted);
				let sanitized = this.sanitizeValues(modified);
				
				normalized.push(sanitized);
			});

			return normalized;
		}
	},
	methods: {
		getIcon(skillId) {
			return this.skillData[this.playerClass][skillId].icon;
		},
		getName(skillId) {
			return this.skillData[this.playerClass][skillId].name;
		},
		formatValues(obj) {
			let res = {};
			Object.keys(obj).forEach(key => {
				res[key] = this.normalizeFields.includes(key) ? Number(obj[key]).toLocaleString() : obj[key];
			});
			return res;
		},
		addHPM(obj) {
			let res = obj;
			if(res.skillHits) res.skillHPM = this.getHPM(Number(res.skillHits), Number(this.fightDuration));
			
			return res;
		},
		sanitizeValues(obj) {
			let sanitized = obj;
			if(!sanitized.skillCasts) {
				sanitized.skillCasts = "-";
				sanitized.skillHPM = "-";
			}
			return sanitized;
		}
	}
};

</script>
