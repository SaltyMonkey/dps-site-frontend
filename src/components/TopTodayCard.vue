<template>
	<router-link :to="`/details/${this.runId}`">
	<v-card class="elevation-3 mb-2 mr-2" tile outlined>
		<v-card-title class="pa-1">
			<v-chip label color="transparent">
				<v-icon left>$class-{{ formatStringLowerCase(playerClass) }} </v-icon>
				<span>{{ playerName }}</span>
			</v-chip>
			<v-spacer />
			<v-chip label color="transparent" class="ml-2">
				<span class="font-weight-light text--secondary">{{ playerServer }}</span>
			</v-chip>
		</v-card-title>
		<v-divider></v-divider>
		<v-container v-ripple class="pa-1 pl-1 pt-1">
			
			<v-spacer></v-spacer>
			<v-chip label color="transparent">
				<v-icon left color="green">{{ mdiClockOutline }}</v-icon>
				{{ formatStringAsTimeSpan(fightDuration) }}
			</v-chip>
			<v-tooltip
				max-width="325"
				bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-chip  v-bind="attrs" v-on="on" label color="transparent">
						<v-icon left color="red darker-2">{{ mdiGaugeFull }}</v-icon>
						{{ formatStringAsDps(playerDps) }}
					</v-chip>
				</template>
				<span>DPS: {{ Number(playerDps).toLocaleString() }}</span>
			</v-tooltip>
		</v-container>
	</v-card>
	</router-link>
</template>

<script>
import { mdiClockOutline, mdiGaugeFull } from "@mdi/js";

export default {
	props: [
		"playerClass",
		"playerName",
		"playerServer",
		"playerDps",
		"fightDuration",
		"runId"
	],
	data: () => ({
		mdiClockOutline,
		mdiGaugeFull
	}),
	name: "TopTodayCard",
};
</script>
