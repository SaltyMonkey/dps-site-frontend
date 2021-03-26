<template>
	<v-card class="mb-2 mr-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			Debuffs uptimes:
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in debuffs" :key="index">
				<v-col class="pa-1">
					<v-progress-linear
						color="orange"
						height="22"
						:value="item.value"

					>
						<template v-slot:default="{ value }">
							<div>
								
								<v-subheader class="mr-auto"
									><v-icon color="red" class="mr-2" width="20" height="20">$boss</v-icon>{{ item.key }} {{ value }}%</v-subheader
								>
							</div>
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
