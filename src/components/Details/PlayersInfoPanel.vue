<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			{{ $vuetify.lang.t(`$vuetify.contributionDetails`) }}
		</v-card-title>
			<v-expansion-panels multiple accordion focusable tile class="elevation-3">
				<v-expansion-panel
					style="min-height: 30px"
					v-for="(item, index) in members"
					:key="index"
					
				>
					<v-expansion-panel-header class="pb-1 pt-1 pl-1 pr-2">
						<v-row no-gutters style="width: 100%">
							<v-icon left class="ml-3">
								$class-{{ formatStringLowerCase(item.playerClass) }}
							</v-icon>
							<span class="text-center mt-1 mr-auto">
								{{ item.playerName }}
							</span>
							<span class="text--secondary text-right mt-1 mr-3 ">
								{{ item.playerServer }}
							</span>
							<span class="text--secondary text-right mt-1 mr-3">
								{{ formatStringAsDps(item.playerDps) }}</span>
						</v-row>
					</v-expansion-panel-header>
					<v-expansion-panel-content>
						<BuffUptimeGroup :abnormalsData="abnormalsData" :buffDetails="item.buffDetail"></BuffUptimeGroup>
						<CastsBreakdownCard :playerClass="item.playerClass" :skillData="skillData" :dpsData="item"></CastsBreakdownCard>
						<SkillBreakdownCard :playerClass="item.playerClass" :skillData="skillData" :dpsData="item"></SkillBreakdownCard>
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
	props: ["members", "skillData", "abnormalsData"],
	name: "PlayerInfoPanel",
	components: { SkillBreakdownCard, CastsBreakdownCard, BuffUptimeGroup },
};
</script>
