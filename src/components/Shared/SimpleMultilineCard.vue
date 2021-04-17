<template>
	<v-card class="elevation-3 mb-2" tile outlined>
		<v-card-title v-if="title" class="font-weight-light pa-2 text--secondary text-body-2">
			{{ title }}
		</v-card-title>
		<v-card-text class="text-center">
			<span v-if="firstLine" class="font-weight-light text--primary text-body-1">{{ firstLine }}</span>
			<br v-if="secondLine">
			<span v-if="secondLine" class="text--secondary text-body-1">{{ secondLine }}</span>
			<br v-if="thirdLine" />
			<span v-if="thirdLine">{{ thirdLine }}</span>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ["title", "firstLine", "secondLine", "thirdLine"],
	name: "SimpleMultilineCard",
	components: {},
};
</script>