<template>
	<v-card class="mb-2 mr-1 elevation-3" style="min-width:105px;" tile outlined>
		<v-card-title v-if="title" class="pa-2 text--secondary text-body-2 font-weight-light">
			{{ title}}
		</v-card-title>
		<v-card-text class="text-center">
			<v-subheader class="text--primary font-weight-light">{{ line }}</v-subheader>
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