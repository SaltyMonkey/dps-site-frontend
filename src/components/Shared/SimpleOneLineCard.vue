<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title v-if="title" class="pa-2 text--secondary text-body-2 font-weight-light">
			{{ title}}
		</v-card-title>
		<v-card-text class="text-center">
			<v-subheader class="font-weight-light">{{ line }}</v-subheader>
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