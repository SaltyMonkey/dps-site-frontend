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
						<v-row no-gutters style="width: 100%">
							<v-icon left class="ml-3">
								$class-{{ formatStringLowerCase(item.playerClass) }}
							</v-icon>
							<span class="mr-auto mt-1 text-center">
								{{ item.playerName }}
							</span>
							<span class="mr-3 mt-1 text--secondary text-right">
								{{ item.playerServer }}
							</span>
							<span class="mr-3 mt-1 text--secondary text-right">
								{{ formatStringAsDps(item.playerDps) }}</span>
						</v-row>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<BuffUptimeGroup :abnormalsData="abnormalsData" :buffDetails="item.buffDetail"></BuffUptimeGroup>
						<CastsBreakdownCard :playerClass="item.playerClass" :skillData="skillData" :dpsData="item"></CastsBreakdownCard>
						<SkillBreakdownCard :fightDuration="fightDuration" :playerClass="item.playerClass" :skillData="skillData" :dpsData="item"></SkillBreakdownCard>
					</v-expansion-panel-content>
				</v-expansion-panel>
			</v-expansion-panels>
	</v-card>
</template>

<script>
import SkillBreakdownCard from "@/components/Details/SkillBreakdownCard.vue";
import CastsBreakdownCard from "@/components/Details/CastsBreakdownCard.vue";
import BuffUptimeGroup from "@/components/Details/BuffUptimeGroup.vue";

export default {
	props: {
		abnormalsData: Object,
		skillData: Object,
		members: Array,
		fightDuration: String
	},
	name: "PlayersInfoPanel",
	components: { SkillBreakdownCard, CastsBreakdownCard, BuffUptimeGroup },
};
</script>
