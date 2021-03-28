
<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			Aggro stats:
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in members" :key="index">
				<v-col class="pa-1">
					<template>
						<v-progress-linear
							color="red"
							height="25"
							:value="item.aggro"
						>
							<template v-slot:default="{ value }">
								<v-icon
									height="18"
									width="18"
									max-height="18"
									max-width="18"
									class="ml-3"
								>
									$class-{{formatStringLowerCase(item.playerClass)}}
								</v-icon>
								<v-subheader class="mr-auto">{{ item.playerName }}</v-subheader>
								<v-subheader class="text-right">{{ value }}%</v-subheader>

							</template>
						</v-progress-linear>
					</template>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["members"],
	name: "PlayerAggroCard",
	components: {}
};
</script>
