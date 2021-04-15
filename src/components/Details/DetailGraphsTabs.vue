<template>
	<v-card class="elevation-3 mb-2" tile outlined style="width: 100%">
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.contributionGraphs`) }}
		</v-card-title>
		<v-expansion-panels
			:value="expanded"
			accordion
			focusable
			tile>
			<v-expansion-panel>
				<v-expansion-panel-header class="pb-1 pl-1 pt-1">
					<v-row no-gutters style="width: 100%">
						<v-icon class="ml-3" left>$boss</v-icon>
						<span class="mr-auto mt-1 text-center">Open</span>
					</v-row>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-tabs>
						<v-tab>{{ $vuetify.lang.t(`$vuetify.damageAndCritsTab`) }}</v-tab>
						<v-tab>{{ $vuetify.lang.t(`$vuetify.aggroAndDeathsTab`) }}</v-tab>
						<v-tab-item>
							<v-row no-gutters>
								<v-col>
									<PlayersContributionCard :members="members"></PlayersContributionCard>
								</v-col>
								<v-col>
									<PlayersAverageCritCard :members="members"></PlayersAverageCritCard></v-col>
							</v-row>
						</v-tab-item>
						<v-tab-item>
							<v-row no-gutters>
								<v-col><PlayerAggroCard
										:fightDuration="fightDuration"
										:members="members"></PlayerAggroCard></v-col>
								<v-col><PlayersFloormateCard
										:fightDuration="fightDuration"
										:members="members"></PlayersFloormateCard></v-col>
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
	props: {
		fightDuration: String,
		members: Array
	},
	name: "DetailGraphsTabs",
	components: {
		PlayersContributionCard,
		PlayerAggroCard,
		PlayersAverageCritCard,
		PlayersFloormateCard,
	},
	data: () => ({}),
	computed: {
		expanded() {
			return this.members.length <= 6 ? [0] : [];
		},
	},
};
</script>