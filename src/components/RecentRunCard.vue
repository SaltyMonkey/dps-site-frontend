<template>
	<v-card class="mb-2" tile outlined>
		<v-card-subtitle class="pl-2 pt-1 pb-1 text--primary">
			<v-btn small tile icon>
				<v-icon color="red darken-1">mdi-account-multiple</v-icon>
			</v-btn>
			<v-btn small tile icon>
				<v-icon color="red darken-1">mdi-heart-multiple</v-icon>
			</v-btn>
			<v-btn small tile icon>
				<v-icon color="red darken-1">mdi-food-steak</v-icon>
			</v-btn>
			<v-btn tile> {{ dungeonName }} </v-btn>
		</v-card-subtitle>
		<v-card-text class="pb-0">
			<div>
				{{ $vuetify.lang.t("$vuetify.partyDps") }}: {{ partyDps }} {{ $vuetify.lang.t("$vuetify.duration") }}: {{ duration }} {{ $vuetify.lang.t("$vuetify.uploadTime") }}: {{ uploadDate }}
			</div>
		</v-card-text>
		<v-card-actions>
			<v-btn v-for="(item, index) in members" :key="index" tile
				><v-img
					width="24"
					height="24"
					left
					:src="require(`../assets/svgs/classes/${item.class}-merged.svg`)"
					:to="`${item.link}`"
				></v-img>
				{{ item.name }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ["dungeonName", "partyDps", "duration", "uploadDate", "members"],
	name: "RecentRunCard",
	components: {},
};
</script>
