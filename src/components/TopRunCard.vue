<template>
	<v-card class="elevation-3 mb-2 mr-2" tile outlined>
		<v-card-subtitle></v-card-subtitle>
		<v-container class="pa-1 pl-3 pt-3" fluid>
			<p class="mb-1 subtitle-2">
				{{ $vuetify.lang.t("$vuetify.playerDps") }}
				{{ formatStringAsDps(playerDps) }}
			</p>
			<p class="mb-1 subtitle-2">
				{{ $vuetify.lang.t("$vuetify.duration") }}
				{{ formatStringAsTimeSpan(fightDuration) }}
			</p>
		</v-container>
		<v-card-actions class="pt-0">
			<v-row class="ma-1">
				<v-chip outlined label class="mr-2 mt-1">
					<v-icon	small width="18" height="18" class="ml-0 mr-1">$class-{{ formatStringLowerCase(playerClass) }}</v-icon>
					{{ playerName }}
				</v-chip>
			</v-row>
		</v-card-actions>
	</v-card>
</template>
<script>
export default {
	props: ["playerDps", "fightDuration", "playerName", "playerClass", "runId"],
	name: "TopRunCard",
	components: {}
};
</script>
