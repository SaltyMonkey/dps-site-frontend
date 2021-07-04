<template>
	<v-card class="elevation-3 mb-2 mr-1" style="min-width:105px;" tile outlined>
		<v-card-title v-if="title" :class="centeredClass" class="font-weight-light pa-2 text--secondary text-body-2">
			{{ title }}
		</v-card-title>
		<v-card-text :class="centeredTextClass">
			<span class="text--primary" :class="smallTextClass">{{ line }}</span>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "SimpleOneLineCard",
	components: {},
	props: ["centeredTitle", "smallText", "centeredText", "title", "line"],
	computed: {
		centeredClass() {
			return this.centeredTitle ? "justify-center" : "";
		},
		centeredTextClass() {
			return this.centeredText ? "text-center" : "";
		},
		smallTextClass() {
			return this.smallText ? "text-body-2" : "text-body-1";
		}
	}
};
</script>