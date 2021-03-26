<template>
	<v-container fluid class="pt-1">
		<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchCardString")
				}}</v-subheader>
				<SearchTopCard></SearchTopCard>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="10" xl="8">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchResultString")
				}}</v-subheader>
				<div class="scroller" :class="currentTheme">
					<template v-if="loadingData">
						<v-skeleton-loader
							class="mb-2 mr-2 elevation-3"
							type="card"
						></v-skeleton-loader>
						<v-skeleton-loader
							class="mb-2 mr-2 elevation-3"
							type="card"
						></v-skeleton-loader>
						<v-skeleton-loader
							class="mb-2 mr-2 elevation-3"
							type="card"
						></v-skeleton-loader>
					</template>
					<template v-else>
						<RecentRunCard
							v-for="(item, index) in searchResultRuns"
							:key="index"
							:uploadDate="item.uploadDate"
							:members="item.members"
							:dungeonName="item.dungeonName"
							:partyDps="item.partyDps"
							:duration="item.duration"
						></RecentRunCard>
					</template>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import RecentRunCard from "@/components/RecentRunCard.vue";
import SearchTopCard from "@/components/SearchTopCard.vue";
import IndeterminatedTopProgressBar from "@/components/IndeterminatedTopProgressBar.vue";

export default {
	props: ["region"],
	name: "Top",
	data: () => ({
		loadingData: false,
		searchResultRuns: [],
	}),
	components: {
		SearchTopCard,
		RecentRunCard,
		IndeterminatedTopProgressBar

	},
};
</script>
