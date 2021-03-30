<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 pb-3 text--secondary text-body-2 font-weight-light"
			>Casts/charges:</v-card-title
		>
		<v-container fluid>
			<v-row>
				<template v-for="(item, index) in skillLogOnlyCastsSkills">
					<v-badge :key="index" offset-x="65" offset-y="15" tile left overlap :content="item.skillCasts">
						<v-chip :key="index" class="test ma-2 mr-1"  outlined tile label >
							<v-img
								max-width="28"
								max-height="28"
								class=" ml-0 mr-1"
								:src="`/static/icons/${getIcon(item.skillId)}.png`"
							>
							</v-img>
							{{ getName(item.skillId) }}
						</v-chip>
					</v-badge>
				</template>
			</v-row>
		</v-container>
	</v-card>
</template>

<style>
.test > .v-chip__content {
	font-size: 12px;
}
</style>
<script>
export default {
	props: ["playerClass", "skillData", "dpsData"],
	name: "CastsBreakdownCard",
	components: {},
	data: () => ({}),
	computed: {
		skillLogOnlyCastsSkills() {
			return this.dpsData.skillLog.filter((x) => Object.keys(x).length === 2);
		},
		classData() {
			return this.skillData[this.playerClass];
		},
	},
	methods: {
		getIcon(skillId) {
			let ret = undefined;
			if (this.classData[skillId]) {
				ret = this.classData[skillId].icon;
			}
			if (this.skillData["Common"][skillId]) {
				ret = this.skillData["Common"][skillId].icon;
			}

			return ret || "";
		},
		getName(skillId) {
			let ret = undefined;
			if (this.classData[skillId]) {
				return this.classData[skillId].name;
			}
			if (this.skillData["Common"][skillId]) {
				ret = this.skillData["Common"][skillId].name;
			}
			return ret || skillId;
		},
	},
};
</script>
