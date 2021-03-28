<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			Debuffs uptimes:
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in debuffDetail" :key="index">
				<v-col class="pa-1">
					<v-progress-linear color="orange" height="25" :value="item[1][0][1]">
						<template v-slot:default="{ value }">
								<v-icon color="red" class="mr-auto" width="20" height="20">$boss</v-icon>
								<v-subheader class="text-right text--primary">{{ value }}%</v-subheader>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["debuffDetail"],
	name: "BossDebuffsCard",
	components: {}
};
</script>
