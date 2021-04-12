<template>
	<v-card class="elevation-3 mb-2" tile outlined>
		<v-card-title class="font-weight-light pa-2 pb-3 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.castsAndcharges`) }}
		</v-card-title>
		<v-container fluid>
			<v-row>
				<template v-for="(item, index) in skillLogOnlyValidCastsSkills">
					<v-badge :key="index" offset-x="65" offset-y="15" tile left overlap :content="item.skillCasts">
						<v-chip :key="index" class="ma-2 mr-1 smol-chip"  outlined tile label >
							<v-img
								min-width="28"
								min-height="28"
								max-width="28"
								max-height="28"
								class="ml-0 mr-1"
								:src="`/static/icons/${getIcon(item.skillId)}.png`">
							</v-img>
							{{ getName(item.skillId) }}
						</v-chip>
					</v-badge>
				</template>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: {
		playerClass: String,
		skillData: Object,
		dpsData: Object

	},
	name: "CastsBreakdownCard",
	components: {},
	data: () => ({}),
	computed: {
		skillLogOnlyValidCastsSkills() {
			return this.dpsData.skillLog.filter((x) => Object.keys(x).length === 2 && this.skillData[this.playerClass][x.skillId]);
		}
	},
	methods: {
		getIcon(skillId) {
			return this.skillData[this.playerClass][skillId].icon;
		},
		getName(skillId) {
			return this.skillData[this.playerClass][skillId].name;
		},
	},
};
</script>
