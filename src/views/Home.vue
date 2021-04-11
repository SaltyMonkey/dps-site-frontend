<template>
	<v-container fluid class="pt-1">
		<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>
		<v-alert text prominent tile origin type="error" v-if="loadingError">{{ $vuetify.lang.t("$vuetify.loadError") }}</v-alert>
		<v-row dense align="start" justify="center" v-if="!loadingError">
			<v-col cols="12" sm="7" md="8" lg="8" xl="7">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.recentUploads")
				}}</v-subheader>
				<div class="scroller" :class="currentTheme">
					<template v-if="loadingData">
						<CardSkeleton v-for="(item, index) in 3" :key="index"></CardSkeleton>
					</template>
					<template v-else>
						<RecentRunCard
							v-for="(item, index) in recentRuns"
							:key="index"
							:runId="item.runId"
							:timestamp="item.encounterUnixEpoch"
							:members="item.members"
							:huntingZoneId="item.huntingZoneId"
							:bossId="item.bossId"
							:partyDps="item.partyDps"
							:fightDuration="item.fightDuration"
							:isMultipleHeals="item.isMultipleHeals"
							:isMultipleTanks="item.isMultipleTanks"
							:isP2WConsums="item.isP2WConsums"></RecentRunCard>
					</template>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import RecentRunCard from "@/components/RecentRunCard.vue";
import IndeterminatedTopProgressBar from "@/components/Shared/IndeterminatedTopProgressBar.vue";
import CardSkeleton from "@/components/Skeletons/CardSkeleton.vue";

export default {
	data: () => ({
		recentRuns: [],
		loadingData: false,
		loadingError: false,
	}),
	props: ["region"],
	name: "Home",
	components: {
		RecentRunCard,
		IndeterminatedTopProgressBar,
		CardSkeleton,
	},
	created: function () {
		this.loadRecentRuns();
	},
	watch: {
		"$route.params.region"() {
			this.loadRecentRuns();
		},
	},
	methods: {
		loadRecentRuns() {
			this.loadingData = true;
			this.loadingError = false;
			this.$http.api.post("v1/search/latest", { region: this.$router.currentRoute.params.region.toLowerCase() }).then((res) => {
				this.recentRuns = res.data;
				this.loadingData = false;
			// eslint-disable-next-line no-empty-function
			}).catch(() => {
				this.loadingData = false;
				this.loadingError = true;
			});
		},
	}
};
</script>
