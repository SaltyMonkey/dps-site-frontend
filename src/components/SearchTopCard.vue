<template>
	<v-card class="mb-2 elevation-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select dense :items="dungeonsList" :label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)"></v-select>
			<v-select dense :items="classesList" :label="$vuetify.lang.t(`$vuetify.searchClassStr`)"></v-select>
			<v-select dense :label="$vuetify.lang.t(`$vuetify.searchTankType`)"></v-select>
			<v-select dense :label="$vuetify.lang.t(`$vuetify.searchHealType`)"></v-select>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				:label="$vuetify.lang.t(`$vuetify.searchIncludeFoodStr`)"
			></v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMHealStr`)"
			></v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMTankStr`)"
			></v-checkbox>
		</v-card-text>
		<v-card-actions>
			<v-btn :loading="locked" :disabled="locked" class="elevation-2" block tile>{{ $vuetify.lang.t(`$vuetify.searchButton`) }}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ["locked"],
	name: "SearchTopCard",
	data: () => ({}),
	components: {},
	computed: {
		classesList() {
			let arrView = [];
			this.$appConfig.gameClasses.forEach(cls => {
				arrView.push({ text: this.$vuetify.lang.t(`$vuetify.classes.${cls}`), value: cls });
			})
		
			return arrView;
		},
		dungeonsList() {
			let arrView = [];
			this.$appConfig.allowedDungeons.forEach(dg => {
				arrView.push({ text: this.$vuetify.lang.t(`$vuetify.dungeons.${dg}`), value: dg });
			})
		
			return arrView;
		}
	}
};
</script>
