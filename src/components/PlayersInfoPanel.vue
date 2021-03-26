<template>
	<v-expansion-panels accordion>
		<v-expansion-panel v-for="(item, index) in members" :key="index">
			<v-expansion-panel-header>
				<template>
					<v-icon
						height="24"
						width="24"
						color="#FFF"
						max-height="24"
						max-width="24"
						class="ml-3"
						>
						$class-{{ item.class }}
					</v-icon>
					<v-subheader class="mr-auto text--primary">{{ item.name }}</v-subheader>
				</template>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<SimpleTextCard></SimpleTextCard>
				<SkillBreakdownCard></SkillBreakdownCard>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
import SimpleTextCard from "@/components/SimpleTextcard.vue" ;
import SkillBreakdownCard from "@/components/SkillBreakdownCard.vue";

export default {
	props: ["members"],
	name: "PlayerInfoPanel",
	components: { SimpleTextCard, SkillBreakdownCard},
};
</script>
