<template>
	<v-container fluid class="pt-1">
		<IndeterminatedTopProgressBar
			v-if="loadingData"
		></IndeterminatedTopProgressBar>
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="2" class="hidden-sm-and-down">
				<v-subheader class="text--secondary text-body-2">{{
					$vuetify.lang.t("$vuetify.recentTopDPS")
				}}</v-subheader>
				<template v-if="loadingData">
					<ListSkeleton></ListSkeleton>
				</template>
				<template v-else>
					<RecentTopList :entries="mokedList"></RecentTopList>
				</template>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="7" xl="7">
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
							:isP2WConsums="item.isP2WConsums"
						></RecentRunCard>
					</template>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import RecentRunCard from "@/components/RecentRunCard.vue";
import RecentTopList from "@/components/RecentTopList.vue";
import IndeterminatedTopProgressBar from "@/components/Shared/IndeterminatedTopProgressBar.vue";

import ListSkeleton from "@/components/Skeletons/ListSkeleton.vue";
import CardSkeleton from "@/components/Skeletons/CardSkeleton.vue";

export default {
	data: () => ({
		recentRuns: [],
		loadingData: false,
		mokedList: [
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
			{
				name: "Vani",
				class: "archer",
				dps: "696969696969",
			},
		]
	}),
	props: ["region"],
	name: "Home",
	components: {
		RecentRunCard,
		RecentTopList,
		IndeterminatedTopProgressBar,
		ListSkeleton,
		CardSkeleton,
	},
	created: function () {
		this.loadRecentRuns();
	},
	watch: {
		$route() {
			this.loadRecentRuns();
		},
	},
	methods: {
		loadRecentRuns() {
			this.loadingData = true;
			this.$http.api.post("v1/search/recent", { region: this.$router.currentRoute.params.region.toLowerCase()}).then((res) => {
				this.recentRuns = res.data;
				console.log(res.data);
				this.loadingData = false;
			});
		},
	}
};
</script>
