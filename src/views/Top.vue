<template>
	<v-container fluid class="pa-1">
		<!--<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar> -->
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="4" md="3" lg="2" xl="2">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchCardString")
				}}</v-subheader>
				<SearchTopCard
					ref="searchTopCard"
					@searchtop="loadTopRuns"
					@query="setQuery"
					:query="$route.query"
					:loadingData="loadingData"> 
				</SearchTopCard>
				<v-card class="elevation-3 hidden-sm-and-down mb-2" tile outlined>
					<v-card-text >
						<span class="v-label">
							<span class="font-weight-bold">{{ $vuetify.lang.t("$vuetify.rawText.topHelpTextBold") }}</span>{{ $vuetify.lang.t("$vuetify.rawText.topHelpText") }}
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
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.searchResultString")
				}}</v-subheader>
				<div ref="contentDiv" class="scroller" :class="currentTheme">
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

import hotkey from "hotkeys-js";
import debounce from "debounce";

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
			this.$refs.searchTopCard.generateRequestData();
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
			this.$router.push({ query: obj }).catch(() => {});
		},
		loadTopRuns: debounce(function(query) {
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
		}, Number(process.env.VUE_APP_API_DEBOUNCE_TIME), true),
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
