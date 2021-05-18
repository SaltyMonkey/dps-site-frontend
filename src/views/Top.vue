<template>
	<v-container fluid class="pt-1">
		<!--<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar> -->
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="4" md="3" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchCardString")
				}}</v-subheader>
				<SearchTopCard 
					@searchtop="loadTopRuns"
					@query="setQuery"
					:query="$route.query"
					:loadingData="loadingData"> 
				</SearchTopCard>
			</v-col>
			<v-col ols="12" sm="8" md="9" lg="8" xl="8">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchResultString")
				}}</v-subheader>
				<div class="scroller" :class="currentTheme">
					<v-alert text prominent tile origin type="error" v-if="loadingError">{{ $vuetify.lang.t("$vuetify.loadError") }}</v-alert>
					<template v-if="loadingData">
						<CardSkeleton></CardSkeleton>
						<CardSkeleton></CardSkeleton>
						<CardSkeleton></CardSkeleton>
					</template>
					<template v-else-if="!loadingError">
						<v-lazy 
							min-height="95"
							:options="{ threshold: .32 }"
							v-for="(item, index) in searchResultRuns"
							:key="index">
							<TopRunCard
								:index="index + 1"
								:runId="item.runId"
								:playerDps="item.playerDps"
								:fightDuration="item.fightDuration"
								:playerName="item.playerName"
								:playerClass="item.playerClass"
								:playerServer="item.playerServer"
								:timestamp="item.encounterUnixEpoch">
							</TopRunCard>
						</v-lazy>
					</template>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import CardSkeleton from "@/components/Skeletons/CardSkeleton.vue";
import TopRunCard from "@/components/TopRunCard.vue";
import SearchTopCard from "@/components/SearchTopCard.vue";
//import IndeterminatedTopProgressBar from "@/components/Shared/IndeterminatedTopProgressBar.vue";

export default {
	props: {
		region: String
	},
	name: "Top",
	data: () => ({
		loadingData: false,
		loadingError: false,
		searchResultRuns: [],
	}),
	methods: {
		setQuery(obj) {
			//fake router push to update query string
			// eslint-disable-next-line no-empty-function
			this.$router.push({ query: obj }).catch(() => {});
		},
		loadTopRuns(query) {
			//this.$router.push({ query: redactObject(query, "region") });
			this.loadingData = true;
			this.loadingError = false;
			this.$api.top(query).then((res) => {
				this.searchResultRuns = res.data;
				this.loadingData = false;
			// eslint-disable-next-line no-empty-function
			}).catch(() => {
				this.loadingError = true;
				this.loadingData = false;
			});
		},
	},
	watch: {
		"$route.params.region"() {
			this.searchResultRuns = [];
		},
	},
	components: {
		CardSkeleton,
		SearchTopCard,
		TopRunCard,
		//IndeterminatedTopProgressBar,
	},
};
</script>
