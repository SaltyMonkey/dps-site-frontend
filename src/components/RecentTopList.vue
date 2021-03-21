<template>
	<v-list class="pa-0 ma-0" dense outlined>
		<v-list-item dense v-for="(item, index) in entries" :key="index">
			<v-list-item-avatar>
				<v-img
					contain
					width="32"
					height="32"
					:src="require(`../assets/svgs/classes/${item.class}-merged.svg`)"
				></v-img>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title>{{item.name}}</v-list-item-title>
				<v-list-item-subtitle>
					DPS: {{ item.dps}} Dmg %: {{item.damage}} Aggro: {{item.aggro}} Deaths: {{item.aggro}}
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<v-btn tile :to="`${item.link}`">
					<v-icon>mdi-chart-donut</v-icon>
				</v-btn>
			</v-list-item-action>
		</v-list-item>
		<v-divider inset></v-divider>
	</v-list>
</template>


<script>
export default {
	props: ["entries"],
	name: "RecentTopList",
	components: {},
};
</script>
