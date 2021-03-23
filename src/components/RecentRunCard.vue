<template>
	<v-card class="mb-2 elevation-2" tile outlined>
		<v-card-subtitle class="pl-2 pt-1 pb-1 text--primary">
			<v-btn small tile icon>
				<v-icon :color="colorClassFromBool(isMultiTank)">mdi-account-multiple</v-icon>
			</v-btn>
			<v-btn small tile icon>
				<v-icon :color="colorClassFromBool(isMultiHeal)">mdi-heart-multiple</v-icon>
			</v-btn>
			<v-btn small tile icon>
				<v-icon  :color="colorClassFromBool(isP2WFood)">mdi-food-steak</v-icon>
			</v-btn>
			<v-btn tile> {{ dungeonName }} </v-btn>
		</v-card-subtitle>
		<v-container class="pa-1 pl-3" fluid>
			<p class="subtitle-2 mb-1">{{ $vuetify.lang.t("$vuetify.partyDps") }} {{ formatStringAsDps(partyDps) }}</p>
			<p class="subtitle-2 mb-1">{{ $vuetify.lang.t("$vuetify.duration") }} {{ formatStringAsTimeSpan(duration) }}</p>
			<p class="subtitle-2 mb-1">{{ $vuetify.lang.t("$vuetify.uploadTime") }}</p>
		</v-container>
		<v-card-actions>
			<v-btn
				class="elevation-2"
				v-for="(item, index) in members"
				:key="index"
				tile
				><v-img
					width="24"
					height="24"
					:src="require(`../assets/svgs/classes/${item.class}-merged.svg`)"
					:to="`${item.link}`"
					:class="`${currentTheme}-img`"
					class="mr-2"
				></v-img>
				{{ item.name }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ["dungeonName", "isP2WFood", "isMultiTank", "isMultiHeal", "partyDps", "duration", "uploadDate", "members"],
	name: "RecentRunCard",
	components: {},
	methods: {
		colorClassFromBool(bool) {
			return bool ? "red darken-1" : "grey darken-1";
		}
	}
};
</script>
