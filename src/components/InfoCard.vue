<template>
	<v-card class="mb-2" tile outlined>
		<v-card-subtitle color="white" class="pl-0 ml-0 pt-0 mt-0 text--primary">
			{{ type }}
		</v-card-subtitle>
		<v-card-text>
			{{ text }}
		</v-card-text>
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
