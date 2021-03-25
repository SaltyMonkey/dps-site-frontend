<template>
	<v-list class="pa-0 ma-0 elevation-2" dense outlined>
		<template v-for="(item, index) in entries">
			<v-divider :key="`${index}-divider`" inset></v-divider>
			<v-list-item :key="index" dense>
				<v-list-item-avatar>
					<v-icon
						width="32"
						height="32"
					>
					class-{{item.class}}
					</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title>{{ item.name }}</v-list-item-title>
					<v-list-item-subtitle>
						{{ formatStringAsDps(item.dps) }}
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn class="elevation-2" icon small :to="`${item.link}`">
						<v-icon>mdi-chevron-right</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</template>
	</v-list>
</template>


<script>
export default {
	props: ["entries"],
	name: "RecentTopList",
	components: {},
};
</script>
