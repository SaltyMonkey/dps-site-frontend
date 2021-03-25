<template>
	<v-card class="mb-2 mr-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			Debuffs uptimes:
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in debuffs" :key="index">
				<v-col class="pa-1">
				<v-progress-linear color="orange" height="32" :value="item.value" striped>
						<template v-slot:default="{ value }">
								<v-img
									src="@/assets/svgs/boss.svg"
									height="24"
									width="24"
									max-height="24"
									max-width="24"
									class="ml-3"
								></v-img>
								<v-subheader class="mr-auto">{{item.key}} {{ value }}%</v-subheader>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["debuffs"],
	name: "BossDebuffsCard",
	components: {},
};
</script>
