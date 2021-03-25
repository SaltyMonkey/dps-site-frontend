<template>
	<v-card class="mb-2 mr-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light"
			>Contribution:</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in members" :key="index">
				<v-col class="pa-1">
					<v-progress-linear height="32" :value="item.contribution" striped>
						<template v-slot:default="{ value }">
								<v-icon
									height="24"
									width="24"
									color="#FFF"
									max-height="24"
									max-width="24"
									class="ml-3"
								>$class-{{item.class}}</v-icon>
								<v-subheader class="mr-auto">{{ item.name }} - {{ value }}%</v-subheader>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["members"],
	name: "PlayerContributionCard",
	components: {},
};
</script>
