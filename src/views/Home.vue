<template>
	<v-container fluid class="pa-1">
		<!--<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar> -->
		<v-row dense align="start" justify="center">
			<v-col class="hidden-sm-and-down" cols="12" sm="12" md="3" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{ topTodayDungeon	}}</v-subheader>
				<div class="scroller" :class="currentTheme">
					<v-alert text prominent tile origin type="error" v-if="loadingTopTodayDataError">{{ $vuetify.lang.t("$vuetify.loadError") }}</v-alert>
					<template v-if="loadingTopTodayData">
						<CardSkeleton v-for="(item, index) in 3" :key="index"></CardSkeleton>
					</template>
					<template v-else>
						<v-lazy
							min-height="83"
							:options="{ threshold: .32 }"
							v-for="(item, index) in topRuns"
							:key="index">
							<TopTodayCard
								:runId="item.runId"
								:playerClass="item.playerClass"
								:playerName="item.playerName"
								:playerServer="item.playerServer"
								:playerDps="item.playerDps"
								:partyDps="item.partyDps"
								:fightDuration="item.fightDuration">
							</TopTodayCard>
						</v-lazy>
					</template>
				</div>
			</v-col>
			<v-col cols="12" sm="12" md="9" lg="8" xl="8">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.recentUploads")
				}}</v-subheader>
				<div :class="[currentTheme, !$vuetify.breakpoint.mobile ? 'scroller': '']" min-height="155">
					<v-alert text prominent tile origin type="error" v-if="loadingError">{{ $vuetify.lang.t("$vuetify.loadError") }}</v-alert>
					<template v-if="loadingData">
						<CardSkeleton v-for="(item, index) in 3" :key="index"></CardSkeleton>
					</template>
					<template v-else>
						<v-lazy
							min-height="155"
							:options="{ threshold: .32 }"
							v-for="(item, index) in recentRuns"
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
//import IndeterminatedTopProgressBar from "@/components/Shared/IndeterminatedTopProgressBar.vue";
import CardSkeleton from "@/components/Skeletons/CardSkeleton.vue";
import TopTodayCard from "@/components/TopTodayCard.vue";

import hotkey from "hotkeys-js";
import debounce from "debounce";

export default {
	name: "Home",
	components: {
		RecentRunCard,
		//IndeterminatedTopProgressBar,
		CardSkeleton,
		TopTodayCard
	},
	props: {
		region: String
	},
	data: () => ({
		recentRuns: [],
		topRuns: [],
		loadingData: false,
		loadingTopTodayData: false,
		loadingTopTodayDataError: false,
		loadingError: false,
	}),
	computed: {
		topTodayDungeon() {
			const startString = this.$vuetify.lang.t("$vuetify.todayTopDPS");
			const boss = this.$vuetify.lang.t(`$vuetify.monsters.${this.$appConfig.topToday.huntingZoneId}.monsters.${this.$appConfig.topToday.bossId}.name`);
			return `${startString} ${boss}:`;
		}
	},
	watch: {
		"$route.params.region"() {
			this.loadRecentRuns();
			this.loadTopToday();
		},
	},
	created: function () {
		this.loadRecentRuns();
		this.loadTopToday();
	},
	mounted: function() {
		hotkey("ctrl+f5", this.loadRecentRuns);
	},
	beforeDestroy: function() {
		hotkey.unbind("ctrl+f5");
	},
	methods: {
		loadRecentRuns: debounce( function () {
			this.loadingData = true;
			this.loadingError = false;
			this.$api.latest(this.$router.currentRoute.params.region.toLowerCase())
				.then((res) => {
					this.recentRuns = res.data;
					this.loadingData = false;
					// eslint-disable-next-line no-empty-function
				}).catch(() => {
					this.loadingData = false;
					this.loadingError = true;
				});
		}, Number(process.env.VUE_APP_API_DEBOUNCE_TIME), true),
		loadTopToday: debounce(function() {
			this.loadingTopTodayData = true;
			this.loadingTopTodayDataError = false;
			this.$api.topToday(this.$router.currentRoute.params.region.toLowerCase(), this.$appConfig.topToday.huntingZoneId, this.$appConfig.topToday.bossId)
				.then((res) => {
					this.topRuns = res.data;
					this.loadingTopTodayData = false;
					// eslint-disable-next-line no-empty-function
				}).catch(() => {
					this.loadingTopTodayData = false;
					this.loadingTopTodayDataError = true;
				});
		}, Number(process.env.VUE_APP_API_DEBOUNCE_TIME), true)
	}
};
</script>
