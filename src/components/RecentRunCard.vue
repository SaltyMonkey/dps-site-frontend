<template>
	<v-card class="mb-2 mr-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--primary">
			<v-icon large left>$boss</v-icon>
			<span v-ripple class="mr-3"> {{ bossName }}</span>
			<v-divider vertical class="mr-3 hidden-sm-and-down"></v-divider>
			<span
				v-ripple
				class="mr-3 text--secondary font-weight-light hidden-sm-and-down"
			>
				{{ dungeonName }}</span
			>
			<v-divider
				vertical
				class="mr-3 hidden-sm-and-down"
				v-if="isMultiHeal || isMultiTank || isP2WFood"
			></v-divider>
			<v-chip-group class="hidden-sm-and-down">
				<v-chip
					v-if="isMultiHeal"
					:color="colorMultiHealFromBool(isMultiHeal)"
					small
					class="mr-2"
					outlined
					label
				>
					{{ $vuetify.lang.t("$vuetify.multiHeal") }}
				</v-chip>
				<v-chip
					v-if="isMultiTank"
					:color="colorMultiTankFromBool(isMultiTank)"
					small
					class="mr-2"
					outlined
					label
				>
					{{ $vuetify.lang.t("$vuetify.multiTank") }}
				</v-chip>
				<v-chip
					:color="colorFoodFromBool(isP2WFood)"
					small
					outlined
					label
					v-if="isP2WFood"
				>
					{{ $vuetify.lang.t("$vuetify.p2wFood") }}
				</v-chip>
			</v-chip-group>
			<v-spacer />
			<p class="subtitle-2 mb-0 mr-2 font-weight-regular text--secondary">
				<timeago
					:datetime="uploadDate"
					:locale="$vuetify.lang.current"
				></timeago>
			</p>
		</v-card-title>
		<v-divider></v-divider>
		<v-container class="pa-1 pt-3 pl-3" fluid>
			<p class="subtitle-2 mb-1">
				{{ $vuetify.lang.t("$vuetify.partyDps") }}
				{{ formatStringAsDps(partyDps) }}
			</p>
			<p class="subtitle-2 mb-1">
				{{ $vuetify.lang.t("$vuetify.duration") }}
				{{ formatStringAsTimeSpan(duration) }}
			</p>
		</v-container>
		<v-card-actions class="pt-0">
			<v-row class="ma-1">
			<v-chip
				outlined
					label
				class="mr-2 mt-1"
				v-for="(item, index) in members"
				:key="index"
				><v-icon small width="18" height="18" :to="`${item.link}`" class="mr-1 ml-0">
					$class-{{ item.class }}
				</v-icon>
				{{item.name}} <span class="text--secondary ml-2">{{formatStringAsDps(item.dps)}}</span>
			</v-chip>
			</v-row>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: [
		"dungeonName",
		"bossName",
		"isP2WFood",
		"isMultiTank",
		"isMultiHeal",
		"partyDps",
		"duration",
		"uploadDate",
		"members",
	],
	name: "RecentRunCard",
	components: {},
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
	},
};
</script>
