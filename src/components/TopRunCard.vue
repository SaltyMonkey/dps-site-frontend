<template>
	<v-card class="elevation-3 mb-2 mr-2" tile outlined>
		<v-card-title class="pa-2 text--secondary">
			<span v-ripple class="hand-cursor mr-3" @click="goTo()" >Rank {{index}} </span>
			<v-divider vertical class="mr-3"></v-divider>
			<v-icon	class="ml-0 mr-2">$class-{{ formatStringLowerCase(playerClass) }}</v-icon>
			<span> {{ playerName }} </span>
		</v-card-title>
		<v-container class="pa-1 pl-3 pt-1" fluid>
			<v-divider ></v-divider>
			<p class="mb-1 mt-2 subtitle-2">
				{{ $vuetify.lang.t("$vuetify.duration") }}
				{{ formatStringAsTimeSpan(fightDuration) }}
			</p>
			<p class="mb-1 subtitle-2">
				{{ $vuetify.lang.t("$vuetify.playerDps") }}
				{{ formatStringAsDps(playerDps) }}
			</p>
		</v-container>
	</v-card>
</template>
<script>
export default {
	props: ["index", "playerDps", "fightDuration", "playerName", "playerClass", "runId"],
	name: "TopRunCard",
	components: {},
	methods: {
		goTo() {
			this.$router.push(`/details/${this.runId}`);
		}
	}
};
</script>
