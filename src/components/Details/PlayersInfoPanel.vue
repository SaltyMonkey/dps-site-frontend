<template>
	<v-card class="elevation-1 mb-2" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.contributionDetails`) }}
		</v-card-title>
		<v-expansion-panels multiple accordion focusable tile class="elevation-3">
			<v-expansion-panel
				style="min-height: 30px"
				v-for="(item, index) in members"
				:key="index">
				<v-expansion-panel-header class="pb-1 pl-1 pr-2 pt-1">
					<v-row no-gutters>
						<v-chip label color="transparent" style="width: 200px;">
							<v-icon left size=20>
								$class-{{ formatStringLowerCase(item.playerClass) }}
							</v-icon>
							{{ item.playerName }}
						</v-chip>
						<v-chip label color="transparent" class="text--secondary" style="width: 120px;">
							<v-icon left size=20>
								{{ mdiSword }}
							</v-icon>
							{{ formatStringAsDps(item.playerDps) }}
						</v-chip>
						<v-chip label color="transparent" class="text--secondary" style="width: 45px;">
							<v-icon left size=20>
								{{ mdiSkull }}
							</v-icon>
							{{ item.playerDeaths }}
						</v-chip>
						<v-chip label color="transparent" class="text--secondary" style="width: 125px;">
							<v-icon left size=20>
								{{ mdiServerNetwork }}
							</v-icon>
							{{ item.playerServer }}
						</v-chip>
					
					</v-row>
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<BuffUptimeGroup :abnormalsData="abnormalsData" :buffDetails="item.buffDetail"></BuffUptimeGroup>
					<CastsBreakdownCard :playerClass="item.playerClass" :skillData="skillData" :dpsData="item"></CastsBreakdownCard>
					<!--<SkillTimelineCard></SkillTimelineCard>-->
					<SkillBreakdownCard :fightDuration="fightDuration" :playerClass="item.playerClass" :skillData="skillData" :dpsData="item"></SkillBreakdownCard>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</v-card>
</template>

<script>
//import SkillTimelineCard from "@/components/Details/SkillTimelineCard.vue";
import SkillBreakdownCard from "@/components/Details/SkillBreakdownCard.vue";
import CastsBreakdownCard from "@/components/Details/CastsBreakdownCard.vue";
import BuffUptimeGroup from "@/components/Details/BuffUptimeGroup.vue";

import { mdiServerNetwork, mdiSword , mdiSkull } from "@mdi/js";

export default {
	name: "PlayersInfoPanel",
	components: {
		SkillBreakdownCard,
		CastsBreakdownCard,
		BuffUptimeGroup,
		//SkillTimelineCard
	},
	props: {
		abnormalsData: Object,
		skillData: Object,
		members: Array,
		fightDuration: String
	},
	data: () => ({
		mdiServerNetwork,
		mdiSword,
		mdiSkull
	}),
};
</script>
