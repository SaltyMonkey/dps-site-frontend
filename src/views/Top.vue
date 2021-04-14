<template>
	<v-container fluid class="pt-1">
		<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchCardString")
				}}</v-subheader>
				<SearchTopCard @searchtop="loadTopRuns" :loadingData="loadingData"></SearchTopCard>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="8" xl="8">
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
						<TopRunCard
							v-for="(item, index) in searchResultRuns"
							:key="index"
							:index="index + 1"
							:runId="item.runId"
							:playerDps="item.playerDps"
							:fightDuration="item.fightDuration"
							:playerName="item.playerName"
							:playerClass="item.playerClass">
						</TopRunCard>
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
import IndeterminatedTopProgressBar from "@/components/Shared/IndeterminatedTopProgressBar.vue";

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
		loadTopRuns(query) {
			console.log(query);
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
		IndeterminatedTopProgressBar,
	},
};
</script>
