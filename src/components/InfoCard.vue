<template>
	<v-card class="mb-2 mr-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			{{ type }}
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in debuffs" :key="index">
				<v-col class="pa-1">
					<span> {{ text}}</span>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	data: () => ({}),
	props: ["type", "text"],
	name: "InfoCard",
	components: {},
	computed: {},
};
</script>
