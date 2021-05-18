<template>
	<v-container fluid class="pt-1">
		<!--<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>-->
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="4" md="3" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{ $vuetify.lang.t("$vuetify.searchCardString") }}
				</v-subheader>
				<SearchCard 
					@search="loadRecentRuns"
					@query="setQuery"
					:loadingData="loadingData"
					:query="$route.query">
				</SearchCard>
			</v-col>
			<v-col cols="12" sm="8" md="9" lg="8" xl="8">
				<v-subheader class="text--secondary text-body-2">{{ $vuetify.lang.t("$vuetify.searchResultString") }}
				</v-subheader>
				<div class="scroller" :class="currentTheme">
					<v-alert text prominent tile origin type="error" v-if="loadingError">{{ $vuetify.lang.t("$vuetify.loadError") }}</v-alert>
					<template v-if="loadingData">
						<CardSkeleton></CardSkeleton>
						<CardSkeleton></CardSkeleton>
						<CardSkeleton></CardSkeleton>
					</template>
					<template v-else>
							<v-lazy
								min-height="155"
								:options="{ threshold: .32 }"
								v-for="(item, index) in searchResultRuns"
								:key="index">
								<RecentRunCard
									:runId="item.runId"
									:timestamp="item.encounterUnixEpoch"
									:members="item.members"
									:huntingZoneId="item.huntingZoneId"
									:bossId="item.bossId"
									:partyDps="item.partyDps"
									:fightDuration="item.fightDuration"
									:isMultipleHeals="item.isMultipleHeals"
									:isMultipleTanks="item.isMultipleTanks"
									:isP2WConsums="item.isP2WConsums"
									:isShame="item.isShame">
								</RecentRunCard>
							</v-lazy>
					</template>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import RecentRunCard from "@/components/RecentRunCard.vue";
import SearchCard from "@/components/SearchCard.vue";
//import IndeterminatedTopProgressBar from "@/components/Shared/IndeterminatedTopProgressBar.vue";
import CardSkeleton from "@/components/Skeletons/CardSkeleton.vue";

export default {
	props: {
		region: String
	},
	data: () => ({
		loadingData: false,
		loadingError: false,
		searchResultRuns: [],
	}),
	methods: {
		setQuery(obj) {
			//fake router push to update query string
			// eslint-disable-next-line no-empty-function
			this.$router.push({ query:obj }).catch(() => {});
		},
		loadRecentRuns(query) {
			this.loadingData = true;
			this.loadingError = false;
			this.$api.recent(query)
				.then((res) => {
					this.searchResultRuns = res.data;
					this.loadingData = false;
					// eslint-disable-next-line no-empty-function
				}).catch(() => {
					this.loadingData = false;
					this.loadingError = true;
				});
		},
	},
	watch: {
		"$route.params.region"() {
			this.searchResultRuns = [];
		},
	},
	mounted: function() {
		console.log(this.$route.query);
	},
	name: "Search",
	components: {
		SearchCard,
		RecentRunCard,
		//IndeterminatedTopProgressBar,
		CardSkeleton
	},
};
</script>
