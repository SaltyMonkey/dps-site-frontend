<template>
	<router-link :to="`/details/${runId}`">
		<v-card class="elevation-3 mb-2 mr-2" :class="shameBorderClass(isShame)" tile outlined >
			<v-card-title class="pa-2 text--primary">
				<v-icon large left>$boss</v-icon>
				<span v-ripple class="mr-3"> {{ bossName }}</span>
				<v-divider vertical class="hidden-sm-and-down mr-3"></v-divider>
				<span
					v-ripple
					class="font-weight-light hidden-sm-and-down mr-3 text--secondary">
					{{ dungeonName }}
				</span>
				<template v-if="$vuetify.breakpoint.mobile">
					<v-tooltip
						v-if="isMultipleTanks"
						max-width="325"
						bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-bind="attrs" v-on="on" :color="colorMultiTankFromBool(isMultipleTanks)" class="mr-1">
								{{ mdiAccountSupervisorOutline  }}
							</v-icon>
						</template>
						<span>{{ $vuetify.lang.t("$vuetify.multiTank") }}</span>
					</v-tooltip>
					<v-tooltip
						v-if="isMultipleHeals"
						max-width="325"
						bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-bind="attrs" v-on="on" :color="colorMultiHealFromBool(isMultipleHeals)" class="mr-1">
								{{ mdiHeartMultipleOutline }}
							</v-icon>
						</template>
						<span>{{ $vuetify.lang.t("$vuetify.multiHeal") }}</span>
					</v-tooltip>
					<v-tooltip
						v-if="isP2WConsums"
						max-width="325"
						bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-icon v-bind="attrs" v-on="on"
								:color="colorFoodFromBool(isP2WConsums)">
								{{ mdiFlashOutline }}
							</v-icon>
						</template>
						<span>{{ $vuetify.lang.t("$vuetify.p2wFood") }}</span>
					</v-tooltip>
				</template>
				<template v-else>
					<v-chip
						v-if="isMultipleHeals"
						:color="colorMultiHealFromBool(isMultipleHeals)"
						small
						class="mr-1"
						outlined
						label>
						{{ $vuetify.lang.t("$vuetify.multiHeal") }}
					</v-chip>
					<v-chip
						v-if="isMultipleTanks"
						:color="colorMultiTankFromBool(isMultipleTanks)"
						small
						class="mr-1"
						outlined
						label>
						{{ $vuetify.lang.t("$vuetify.multiTank") }}
					</v-chip>
					<v-chip
						:color="colorFoodFromBool(isP2WConsums)"
						small
						outlined
						label
						v-if="isP2WConsums">
						{{ $vuetify.lang.t("$vuetify.p2wFood") }}
					</v-chip>
				</template>
				<v-spacer />
				<p class="font-weight-regular mb-0 mr-1 text--secondary text-body-2">
					<timeago
						:datetime="formatSecsToTimestamp(timestamp)"
						:locale="$vuetify.lang.current"
						addSuffix="false">
					</timeago>
				</p>
			</v-card-title>
			<v-divider></v-divider>
			<v-container v-ripple class="pa-1 pl-3 pt-3" fluid>
				<v-chip label color="transparent">
					<v-icon size=24 left color="green">{{ mdiTimerSand }}</v-icon>
					{{ formatStringAsTimeSpan(fightDuration) }}
				</v-chip>
				<v-tooltip
					max-width="325"
					bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-chip  v-bind="attrs" v-on="on" label color="transparent">
							<v-icon size=24 left color="red darker-2">{{ mdiSword }}</v-icon>
							{{ formatStringAsDps(partyDps) }}
						</v-chip>
					</template>
					<span>DPS: {{ Number(partyDps).toLocaleString() }}</span>
				</v-tooltip>
			</v-container>
			<v-card-actions class="pt-0">
				<v-row class="ma-1">
					<v-tooltip
						v-for="(item, index) in members"
						:key="index"
						max-width="325"
						bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-chip v-bind="attrs" v-on="on" outlined label class="mr-1 mt-1">
								<v-icon
									small
									width="18"
									height="18"
									class="ml-0 mr-1">$class-{{ formatStringLowerCase(item.playerClass) }}
								</v-icon>
								{{ item.playerName }}
								<span class="ml-2 text--secondary">
									{{ formatStringAsDps(item.playerDps) }}
								</span>
							</v-chip>
						</template>
						<span>DPS: {{ Number(item.playerDps).toLocaleString() }}</span>
					</v-tooltip>
				</v-row>
			</v-card-actions>
		</v-card>
	</router-link>
</template>

<script>
import { mdiTimerSand, mdiSword, mdiFlashOutline, mdiHeartMultipleOutline, mdiAccountSupervisorOutline } from "@mdi/js";

export default {
	name: "RecentRunCard",
	props: [
		"huntingZoneId",
		"bossId",
		"isP2WConsums",
		"isMultipleTanks",
		"isMultipleHeals",
		"isShame",
		"partyDps",
		"fightDuration",
		"timestamp",
		"members",
		"runId",
	],
	data: () => ({
		mdiTimerSand,
		mdiSword,
		mdiFlashOutline,
		mdiHeartMultipleOutline,
		mdiAccountSupervisorOutline 
	}),
	computed: {
		bossName() {
			return this.$vuetify.lang.t(
				`$vuetify.monsters.${this.huntingZoneId}.monsters.${this.bossId}.name`
			);
		},
		dungeonName() {
			return this.$vuetify.lang.t(
				`$vuetify.monsters.${this.huntingZoneId}.name`
			);
		},
	},
	methods: {
		colorFoodFromBool(bool) {
			return bool ? "orange" : "grey darken-1";
		},
		colorMultiTankFromBool(bool) {
			return bool ? "blue" : "grey darken-1";
		},
		colorMultiHealFromBool(bool) {
			return bool ? "green" : "grey darken-1";
		},
		shameBorderClass(bool) {
			return bool ? "shame" : "";
		}
	},
};
</script>
