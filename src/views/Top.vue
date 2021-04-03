<template>
	<v-container fluid class="pt-1">
		<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchCardString")
				}}</v-subheader>
				<SearchTopCard @search="loadTopRuns" :loadingData="loadingData"></SearchTopCard>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="10" xl="8">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchResultString")
				}}</v-subheader>
				<div class="scroller" :class="currentTheme">
					<template v-if="loadingData">
						<CardSkeleton></CardSkeleton>
						<CardSkeleton></CardSkeleton>
						<CardSkeleton></CardSkeleton>
					</template>
					<template v-else>
						<RecentRunCard
							v-for="(item, index) in searchResultRuns"
							:key="index"
							:runId="item.runId"
							:timestamp="item.encounterUnixEpoch"
							:members="item.members"
							:huntingZoneId="item.huntingZoneId"
							:bossId="item.bossId"
							:partyDps="item.partyDps"
							:fightDuration="item.fightDuration"
							:isMultiHeal="item.isMultiHeal"
							:isMultiTank="item.isMultiTank"
							:isP2WFood="item.isP2WFood"
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
import IndeterminatedTopProgressBar from "@/components/Shared/IndeterminatedTopProgressBar.vue";
import CardSkeleton from "@/components/Skeletons/CardSkeleton.vue";

export default {
	props: ["region"],
	name: "Top",
	data: () => ({
		loadingData: false,
		searchResultRuns: [],
	}),
	methods: {
		loadTopRuns(query) {
			console.log(query);
			this.loadingData = true;
			this.$http.api.post("v1/search/top", query).then((res) => {
				this.searchResultRuns = res.data;
				console.log(res.data);
				this.loadingData = false;
			});
		},
	},
	components: {
		SearchTopCard,
		RecentRunCard,
		IndeterminatedTopProgressBar,
		CardSkeleton
	},
};
</script>
