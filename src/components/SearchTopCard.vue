<template>
	<v-card class="mb-2 elevation-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select
				dense
				v-model="selectedDungeon"
				:items="dungeonsList"
				:label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)"
			></v-select>
			<v-select
				dense
				v-model="selectedClass"
				:items="classesList"
				:label="$vuetify.lang.t(`$vuetify.searchClassStr`)"
			></v-select>
			<v-select
				dense
				v-model="selectedTankType"
				:items="tankTypesList"
				:label="$vuetify.lang.t(`$vuetify.searchTankType`)"
			></v-select>
			<v-select
				dense
				v-model="selectedHealType"
				:items="healTypeList"
				:label="$vuetify.lang.t(`$vuetify.searchHealType`)"
			></v-select>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isFood"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeFoodStr`)"
			></v-checkbox>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="searchButtonPress"
				:loading="locked"
				:disabled="isBusy"
				class="elevation-2"
				block
				tile
				>{{ $vuetify.lang.t(`$vuetify.searchButton`) }}</v-btn
			>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ["busy", "locked"],
	name: "SearchTopCard",
	data: () => ({
		selectedDungeon: undefined,
		selectedClass: undefined,
		selectedTankType: undefined,
		selectedHealType: undefined,
		isFood: false,
	}),
	components: {},
	methods: {
		searchButtonPress() {
			this.$emit("search", {
				selectedDungeon: this.selectedDungeon,
				selectedClass: this.selectedClass,
				selectedTankType: this.selectedTankType,
				selectedHealType: this.selectedHealType,
				isP2WFood: this.isFood,
			});
		},
	},
	computed: {
		classesList() {
			let arrView = [];
			this.$appConfig.gameClasses.forEach((cls) => {
				arrView.push({
					text: this.$vuetify.lang.t(`$vuetify.classes.${cls}`) || cls,
					value: cls,
				});
			});

			return arrView;
		},
		dungeonsList() {
			let arrView = [];
			this.$appConfig.allowedDungeons.forEach((dg) => {
				arrView.push({
					text: this.$vuetify.lang.t(`$vuetify.dungeons.${dg}`) || dg,
					value: dg,
				});
			});

			return arrView;
		},
		tankTypesList() {
			let arrView = [];
			this.$appConfig.tanksGameClasses.forEach((cls) => {
				arrView.push({
					text: this.$vuetify.lang.t(`$vuetify.classes.${cls}`) || cls,
					value: cls,
				});
			});

			return arrView;
		},
		healTypeList() {
			let arrView = [];
			this.$appConfig.healersGameClasses.forEach((dg) => {
				arrView.push({
					text: this.$vuetify.lang.t(`$vuetify.classes.${dg}`) || dg,
					value: dg,
				});
			});

			return arrView;
		},
		isBusy() {
			return this.busy || this.locked;
		},
	},
};
</script>
