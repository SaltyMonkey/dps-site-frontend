<template>
	<v-container fluid class="pt-1">
		<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="3">
				<div class="scroller" :class="currentTheme">
					<v-card class="mb-2 mr-2 elevation-3" tile outlined>
						<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
							Encounter:
						</v-card-title>
						<v-card-text class=text-center>
									<span class="text--secondary text-body-1 font-weight-light"> Manaya's Core</span>
									<br>
									<span class="text--primary text-body-1">Manaya</span>
									<br>
									<span> Time</span>
						</v-card-text>
						
					</v-card>
					<v-card class="mb-2 mr-2 elevation-3" tile outlined>
						<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
							Basic info:
						</v-card-title>
						<v-container fluid>
							<v-row>
								<v-col class="pa-1">
									<span> text </span>
								</v-col>
							</v-row>
						</v-container>
					</v-card>
					<BossDebuffsCard :debuffs="debuffs"></BossDebuffsCard>
					<PlayerAggroCard
						:members="members"
						:debuffs="debuffs"
					></PlayerAggroCard>
				</div>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="10" xl="9">
				<div class="scroller" :class="currentTheme">
					<PlayersContributionCard :members="members"></PlayersContributionCard
					><SkillBreakdownCard></SkillBreakdownCard>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import PlayersContributionCard from "@/components/PlayersContributionCard.vue";
import BossDebuffsCard from "@/components/BossDebuffsCard.vue";
import SkillBreakdownCard from "@/components/SkillBreakdownCard.vue";
import PlayerAggroCard from "@/components/PlayerAggroCard.vue";
import IndeterminatedTopProgressBar from "@/components/IndeterminatedTopProgressBar.vue";

export default {
	data: () => ({
		loadingData: false,
		abnormalsIconData: {},
		skillsIconData: {},
		abnormalsData: {},
		skillsData: {},
		debuffs: [
			{
				key: 1,
				value: 70,
			},
			{
				key: 1,
				value: 7,
			},
			{
				key: 1,
				value: 7,
			},
		],
		members: [
			{
				name: "Leaky",
				class: "slayer",
				contribution: 90,
				aggroPercent: 10,
			},
			{
				name: "Vani",
				class: "archer",
				contribution: 5,
				aggroPercent: 70,
			},
			{
				name: "Beng",
				class: "lancer",
				contribution: 5,
				aggroPercent: 20,
			},
		],
	}),
	props: ["runId"],
	name: "DetailedRun",
	components: {
		PlayersContributionCard,
		BossDebuffsCard,
		SkillBreakdownCard,
		PlayerAggroCard,
		IndeterminatedTopProgressBar
	},
	watch: {
		"$vuetify.lang.current"() {
			//load abnormals icons file
			//this.$http.files.get(`/dps-parse/${this.$vuetify.lang.current}/abnormals-icons.json`).then(res => (this.abnormalsIconData = res));

			//load skills icons file
			//this.$http.files.get(`/dps-parse/${this.$vuetify.lang.current}/skills-icons.json`).then(res => (this.skillsIconData = res));
		}
	},
	computed: {
		
	}
};
</script>
