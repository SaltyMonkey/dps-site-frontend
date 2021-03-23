<template>
	<v-card class="mb-2 elevation-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select dense v-model="selectedDungeon" :items="dungeonsList" :label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)"></v-select>
			<v-select dense v-model="selectedClass" :items="classesList" :label="$vuetify.lang.t(`$vuetify.searchClassStr`)"></v-select>
			<v-text-field dense v-model="playerStr" :label="$vuetify.lang.t(`$vuetify.searchPlayerStr`)"></v-text-field>

			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isShame"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeShameStr`)"
			></v-checkbox>
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
				v-model="isMultiTank"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMTankStr`)"
			></v-checkbox>
						<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isMultiHeal"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMHealStr`)"
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
	name: "SearchCard",
	data: () => ({
		selectedDungeon: undefined,
		selectedClass: undefined,
		playerStr: "",
		isShame: false,
		isMultiTank: false,
		isMultiHeal: false
	}),
	components: {},
	methods: {
		searchButtonPress() {
			this.$emit("search", {
				selectedDungeon: this.selectedDungeon,
				selectedClass: this.selectedClass,
				playerStr: this.playerStr,
				isMultiTank: this.isMultiTank,
				isMultiHeal: this.isMultiHeal
			})
		}
	},
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
