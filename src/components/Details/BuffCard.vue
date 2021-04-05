<template>
	<v-card min-height="55" min-width="55" outlined class="ma-1">
		<v-row no-gutters justify="center" class="mt-1">
			<v-img
				min-height="28"
				min-width="28"
				max-height="28"
				max-width="28"
				v-on="$listeners"
				:src="`/static/icons/${iconName}.png`"
				lazy-src="/static/icons/placeholder.png">
					<div class="bottom-gradient fill-height"></div>
			</v-img>
		</v-row>
		<v-row class="blabla text--center" no-gutters justify="center">
			{{uptime}}%
		</v-row>
	</v-card>
</template>

<style>
.blabla  {
	font-size: 14px;
}
</style>

<script>
export default {
	props: ["uptime", "iconName", "overlayText"],
	name: "BuffCard",
	components: {},
	data: () => ({}),
	computed: {
		text() {
			return this.overlayText;
		}
	}
};
</script>
