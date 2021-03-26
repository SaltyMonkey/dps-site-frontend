<template>
	<v-expansion-panels accordion focusable tile class="elevation-3">
		<v-expansion-panel style="min-height: 30px" v-for="(item, index) in members" :key="index">
			<v-expansion-panel-header class="pb-1 pt-1 pl-1 pr-2">
							<v-row no-gutters style="width: 100%">
										<v-icon left class="ml-3">$class-{{formatStringLowerCase(item.playerClass)}}</v-icon>
										<span class="text-center mt-1 mr-auto">{{ item.playerName }} </span>
										<span class="text-right mt-1 mr-3">{{ Number(item.playerDps).toLocaleString() }}</span>

							</v-row>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<SkillBreakdownCard></SkillBreakdownCard>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
import SkillBreakdownCard from "@/components/SkillBreakdownCard.vue";

export default {
	props: ["members"],
	name: "PlayerInfoPanel",
	components: { SkillBreakdownCard },
};
</script>
