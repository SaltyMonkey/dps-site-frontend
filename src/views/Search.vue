<template>
	<v-container fluid class="pa-1">
		<!--<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>-->
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="4" md="3" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{ $vuetify.lang.t("$vuetify.searchCardString") }}
				</v-subheader>
				<SearchCard
					ref="searchCard"
					@search="loadRecentRuns"
					@query="setQuery"
					:loadingData="loadingData"
					:query="$route.query">
				</SearchCard>
				<v-card class="elevation-3 hidden-sm-and-down mb-2" tile outlined>
					<v-card-text >
						<span class="v-label">
							<span class="font-weight-bold">{{ $vuetify.lang.t("$vuetify.rawText.searchHelpTextBold") }}</span>{{ $vuetify.lang.t("$vuetify.rawText.searchHelpText") }}
						</span>
						<br/>
						<span class="v-label">
							<span class="font-weight-bold">CTRL + F5</span>{{ $vuetify.lang.t("$vuetify.rawText.ctrlF5HelpText") }}
						</span>
						<br/>
						<span class="v-label">
							<span class="font-weight-bold">PageUp</span>{{ $vuetify.lang.t("$vuetify.rawText.pageUpHelpText") }}
						</span>
						<br/>
						<span class="v-label">
							<span class="font-weight-bold">PageDown</span>{{ $vuetify.lang.t("$vuetify.rawText.pageDownHelpText") }}
						</span>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12" sm="8" md="9" lg="8" xl="8">
				<v-subheader class="text--secondary text-body-2">{{ $vuetify.lang.t("$vuetify.searchResultString") }}
				</v-subheader>
				<div ref="contentDiv" class="scroller" :class="currentTheme">
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

import hotkey from "hotkeys-js";
import debounce from "debounce";

export default {
	props: {
		region: String
	},
	data: () => ({
		loadingData: false,
		loadingError: false,
		searchResultRuns: [],
	}),
	mounted: function() {
		hotkey("ctrl+f5", this.keyboardReloadRuns);
		hotkey("pagedown", this.keyboardScrollToBottom);
		hotkey("pageup", this.keyboardScrollToTop);
	},
	beforeDestroy: function () {
		hotkey.unbind("ctrl+f5");
		hotkey.unbind("pagedown");
		hotkey.unbind("pageup");
	},
	methods: {
		keyboardReloadRuns(event) {
			event.preventDefault();
			this.$refs.searchCard.generateRequestData();
		},
		keyboardScrollToBottom() {
			this.$refs.contentDiv.scrollTo({
				top: this.$refs.contentDiv.scrollHeight,
				behavior: "smooth",
			});
		},
		keyboardScrollToTop() {
			this.$refs.contentDiv.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		},
		setQuery(obj) {
			//fake router push to update query string
			// eslint-disable-next-line no-empty-function
			this.$router.push({ query:obj }).catch(() => {});
		},
		loadRecentRuns: debounce(function(query) {
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
		}, Number(process.env.VUE_APP_API_DEBOUNCE_TIME), true)
	},
	watch: {
		"$route.params.region"() {
			this.searchResultRuns = [];
		},
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
