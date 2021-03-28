<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title v-if="title" class="pa-2 text--secondary text-body-2 font-weight-light">
			{{ title}}
		</v-card-title>
		<v-card-text class="text-center">
			<span v-if="firstLine" class="text--secondary text-body-1 font-weight-light">{{ firstLine }}</span>
			<br v-if="secondLine">
			<span v-if="secondLine" class="text--primary text-body-1">{{ secondLine }}</span>
			<br v-if="timeLine" />
			<timeago 
				v-if="timeLine"
				:datetime="formatSecsToTimestamp(timeLine)"
				:locale="$vuetify.lang.current">
			</timeago>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ["title", "firstLine", "secondLine", "timeLine"],
	name: "SimpleMultilineCard",
	components: {},
};
</script>