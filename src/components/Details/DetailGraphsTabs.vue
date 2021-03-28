<template>
	<v-card class="mb-2 elevation-3" tile outlined style="width: 100%">
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light"
			>Contribution graphs:</v-card-title
		>
		<v-expansion-panels
			multiple
			:value="expanded"
			accordion
			focusable
			tile
			class="elevation-3"
		>
			<v-expansion-panel>
				<v-expansion-panel-header class="pb-1 pt-1 pl-1 pr-2">
					<v-row no-gutters style="width: 100%">
						<v-icon left>$boss</v-icon>
						<span class="text-center mt-1 mr-auto">Open</span>
					</v-row>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-tabs>
						<v-tab>Damage and crit</v-tab>
						<v-tab>Aggro and deaths</v-tab>
						<v-tab-item>
							<v-row no-gutters>
								<v-col
									><PlayersContributionCard
										:members="members"
									></PlayersContributionCard
								></v-col>
								<v-col
									><PlayersAverageCritCard
										:members="members"
									></PlayersAverageCritCard
								></v-col>
							</v-row>
						</v-tab-item>
						<v-tab-item>
							<v-row no-gutters>
								<v-col
									><PlayerAggroCard :fightDuration="fightDuration" :members="members"></PlayerAggroCard
								></v-col>
								<v-col
									><PlayersFloormateCard
										:fightDuration="fightDuration" :members="members"
									></PlayersFloormateCard
								></v-col>
							</v-row>
						</v-tab-item>
					</v-tabs>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
</template>

<script>
import PlayersContributionCard from "@/components/DetailGraphs/PlayersContributionCard.vue";
import PlayerAggroCard from "@/components/DetailGraphs/PlayerAggroCard.vue";
import PlayersAverageCritCard from "@/components/DetailGraphs/PlayersAverageCritCard.vue";
import PlayersFloormateCard from "@/components/DetailGraphs/PlayersFloormateCard.vue";

export default {
	props: ["fightDuration", "members"],
	name: "DetailedRun",
	components: {
		PlayersContributionCard,
		PlayerAggroCard,
		PlayersAverageCritCard,
		PlayersFloormateCard,
	},
	data: () => ({}),
	computed: {
		expanded() {
			return (this.members.length <= 8) ? [0] : [];
		}
	}
};
</script>