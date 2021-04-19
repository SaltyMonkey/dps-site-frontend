<template>
	<router-link :to="`/details/${this.runId}`">
	<v-card class="elevation-3 mb-2 mr-2" tile outlined>
		<v-card-title class="pa-2 text--primary">
			<v-icon large left>$boss</v-icon>
			<span v-ripple class="mr-3"> {{ bossName }}</span>
			<v-divider vertical class="hidden-sm-and-down mr-3"></v-divider>
			<span
				v-ripple
				class="font-weight-light hidden-sm-and-down mr-3 text--secondary">
				{{ dungeonName }}
			</span>
			<v-divider
				vertical
				class="hidden-sm-and-down mr-3"
				v-if="isMultipleHeals || isMultipleTanks || isP2WFood">
			</v-divider>
			<v-chip-group class="hidden-sm-and-down">
				<v-chip
					v-if="isMultipleHeals"
					:color="colorMultiHealFromBool(isMultipleHeals)"
					small
					class="mr-2"
					outlined
					label>
					{{ $vuetify.lang.t("$vuetify.multiHeal") }}
				</v-chip>
				<v-chip
					v-if="isMultipleTanks"
					:color="colorMultiTankFromBool(isMultipleTanks)"
					small
					class="mr-2"
					outlined
					label>
					{{ $vuetify.lang.t("$vuetify.multiTank") }}
				</v-chip>
				<v-chip
					:color="colorFoodFromBool(isP2WFood)"
					small
					outlined
					label
					v-if="isP2WFood">
					{{ $vuetify.lang.t("$vuetify.p2wFood") }}
				</v-chip>
			</v-chip-group>
			<v-spacer />
			<p class="font-weight-regular mb-0 mr-2 subtitle-2 text--secondary">
				<timeago
					:datetime="formatSecsToTimestamp(timestamp)"
					:locale="$vuetify.lang.current">
				</timeago>
			</p>
		</v-card-title>
		<v-divider></v-divider>
		<v-container v-ripple class="pa-1 pl-3 pt-3" fluid>
			<p class="mb-1 subtitle-2">
				{{ $vuetify.lang.t("$vuetify.partyDps") }}
				{{ formatStringAsDps(partyDps) }}
			</p>
			<p class="mb-1 subtitle-2">
				{{ $vuetify.lang.t("$vuetify.duration") }}
				{{ formatStringAsTimeSpan(fightDuration) }}
			</p>
		</v-container>
		<v-card-actions class="pt-0">
			<v-row class="ma-1">
				<v-tooltip
					v-for="(item, index) in members"
					:key="index"
					max-width="325"
					bottom>
					<template v-slot:activator="{ on, attrs }">
						<v-chip v-bind="attrs" v-on="on" outlined label class="mr-2 mt-1">
							<v-icon
								small
								width="18"
								height="18"
								class="ml-0 mr-1">$class-{{ formatStringLowerCase(item.playerClass) }}</v-icon>
							{{ item.playerName }}
							<span class="ml-2 text--secondary">
								{{ formatStringAsDps(item.playerDps)}}
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
export default {
	props: [
		"huntingZoneId",
		"bossId",
		"isP2WFood",
		"isMultipleTanks",
		"isMultipleHeals",
		"partyDps",
		"fightDuration",
		"timestamp",
		"members",
		"runId",
	],
	name: "RecentRunCard",
	components: {},
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
		}
	},
};
</script>
