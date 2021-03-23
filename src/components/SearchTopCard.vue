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
	props: ["region", "locked"],
	name: "SearchTopCard",
	data: () => ({}),
	components: {},
	computed: {
		classList() {
			const translatedData = this.$vuetify.lang.locales[this.$vuetify.lang.current].classes;
			let arrView = [];

			for(const [key, val] of translatedData) arrView.push({ text: val, value: key})

			return arrView;
		},
		dungeonsList() {
			const translatedData = this.$vuetify.lang.locales[this.$vuetify.lang.current].dungeons;
			let arrView = [];

			for(const [key, val] of translatedData) arrView.push({ text: val, value: key})

			return arrView;
		}
	}
};
</script>
