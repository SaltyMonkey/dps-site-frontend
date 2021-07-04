<template>
	<router-link :to="`/details/${runId}`">
		<v-card class="elevation-3 mb-2 mr-2" tile outlined>
			<v-card-title class="pa-2 text--secondary">
				<span v-ripple class="mr-3">Rank {{ index }} </span>
				<v-divider vertical class="mr-3"></v-divider>
				<v-icon	class="ml-0 mr-2">$class-{{ formatStringLowerCase(playerClass) }}</v-icon>
				<span v-ripple> {{ playerName }} </span>
				<v-spacer/>
				<v-divider vertical class="mr-3"></v-divider>
				<timeago :datetime="formatSecsToTimestamp(timestamp)" :locale="$vuetify.lang.current"></timeago>
			</v-card-title>
			<v-container v-ripple class="pa-1 pl-1 pt-1" fluid>
				<v-divider class="pt-1"></v-divider>
				<v-chip label color="transparent">
					<v-icon size=24 left color="green">{{ mdiTimerSand }}</v-icon>
					{{ formatStringAsTimeSpan(fightDuration) }}
				</v-chip>
				<v-tooltip
					max-width="325"
					bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-chip v-bind="attrs" v-on="on" label color="transparent">
							<v-icon size=24 left color="red darker-2">{{ mdiGaugeFull }}</v-icon>
							{{ formatStringAsDps(playerDps) }}
						</v-chip>
					</template>
					<span>DPS: {{ Number(playerDps).toLocaleString() }}</span>
				</v-tooltip>
				<v-chip label color="transparent">
					<v-icon size=24 left color="blue">{{ mdiServerNetwork }}</v-icon>
					{{ playerServer }}
				</v-chip>
			</v-container>
		</v-card>
	</router-link>
</template>

<script>
import { mdiServerNetwork, mdiGaugeFull, mdiTimerSand } from "@mdi/js";

export default {
	name: "TopRunCard",
	components: {},
	props: [
		"index",
		"timestamp",
		"playerDps",
		"fightDuration",
		"playerName",
		"playerClass",
		"playerServer",
		"runId"
	],
	data: () => ({
		mdiServerNetwork,
		mdiGaugeFull,
		mdiTimerSand
	})
};
</script>
