<template>
	<v-container fluid class="pt-1">
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="3">
				<div class="scroller" :class="currentTheme">
					<InfoCard type="Boss info:"></InfoCard>
					<InfoCard type="Basic stats:"></InfoCard>
					<BossDebuffsCard :debuffs="debuffs"></BossDebuffsCard>
				</div>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="10" xl="9">
				<div class="scroller" :class="currentTheme">
						<PlayersContributionCard
							:members="members"
						></PlayersContributionCard
						><SkillBreakdownCard></SkillBreakdownCard
					>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import PlayersContributionCard from "@/components/PlayersContributionCard.vue";
import BossDebuffsCard from "@/components/BossDebuffsCard.vue";
import SkillBreakdownCard from "@/components/SkillBreakdownCard.vue";
import InfoCard from "@/components/InfoCard.vue";

export default {
	data: () => ({
		debuffs: [
			{
				key: 1,
				value:70
			},
			{
				key: 1,
				value:7
			},
			{
				key: 1,
				value:7
			}
		],
		members: [
			{
				name: "Leaky",
				class: "slayer",
				contribution: 90,
			},
			{
				name: "Vani",
				class: "archer",
				contribution: 5,
			},
			{
				name: "Beng",
				class: "lancer",
				contribution: 5,
			},
		],
	}),
	props: ["id"],
	name: "DetailedRun",
	components: { PlayersContributionCard, BossDebuffsCard, SkillBreakdownCard, InfoCard },
};
</script>
