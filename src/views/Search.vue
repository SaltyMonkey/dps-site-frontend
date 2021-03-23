<template>
	<v-container fluid class="pt-1">
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="2">
				<v-subheader
					>{{ $vuetify.lang.t("$vuetify.searchCardString") }}
				</v-subheader>
				<SearchCard></SearchCard>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="10" xl="8">
				<v-subheader
					>{{ $vuetify.lang.t("$vuetify.searchResultString") }}
				</v-subheader>
				<div class="scroller" :class="currentTheme">
					<RecentRunCard v-for="(item, index) in searchResultRuns" :key="index" :uploadDate="item.uploadDate" :members="item.members" :dungeonName="item.dungeonName" :partyDps="item.partyDps" :duration="item.duration"></RecentRunCard>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import RecentRunCard from "@/components/RecentRunCard.vue";
import SearchCard from "@/components/SearchCard.vue";

export default {
	props: ["region"],
		data: () => ({
			searchResultRuns: []
	}),
	name: "Search",
	components: {
		SearchCard, RecentRunCard
	}
};
</script>
