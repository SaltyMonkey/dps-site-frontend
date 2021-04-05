<template>
	<v-card class="elevation-3 mb-2 mr-1" style="min-width:105px;" tile outlined>
		<v-card-title v-if="title" class="font-weight-light pa-2 text--secondary text-body-2">
			{{ title}}
		</v-card-title>
		<v-card-text class="text-center">
			<span class="text--primary text-body-1">{{ line }}</span>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	props: ["title", "line"],
	name: "SimpleOneLineCard",
	components: {},
};
</script>