<template>
	<v-card class="mb-2 elevation-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select
				dense
				:error-messages="selectedDungeonErrors"
				v-model="selectedDungeon"
				:items="dungeonsList"
				:label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)"
			></v-select>
			<v-select
				dense
				:error-messages="selectedClassErrors"
				v-model="selectedClass"
				:items="classesList"
				:label="$vuetify.lang.t(`$vuetify.searchClassStr`)"
			></v-select>
			<v-select
				dense
				:error-messages="selectedTankTypeErrors"
				v-model="selectedTankType"
				:items="tankTypesList"
				:label="$vuetify.lang.t(`$vuetify.searchTankType`)"
			></v-select>
			<v-select
				dense
				:error-messages="selectedHealTypeErrors"
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
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
	props: ["busy", "locked"],
	mixins: [validationMixin],
	name: "SearchTopCard",
	data: () => ({
		selectedDungeon: undefined,
		selectedClass: undefined,
		selectedTankType: undefined,
		selectedHealType: undefined,
		isFood: false,
	}),
	validations: {
		selectedDungeon: { required },
		selectedClass: { required },
		selectedTankType: { required },
		selectedHealType: { required },
	},
	components: {},
	methods: {
		searchButtonPress() {
			this.$v.$touch();
			console.log(this.$v.$anyError);
			if (!this.$v.$anyError) {
				this.$emit("search", {
					selectedDungeon: this.selectedDungeon,
					selectedClass: this.selectedClass,
					selectedTankType: this.selectedTankType,
					selectedHealType: this.selectedHealType,
					isP2WFood: this.isFood,
				});
			}
		},
	},
	computed: {
		selectedDungeonErrors() {
			const errors = [];
			if (!this.$v.selectedDungeon.$dirty) return errors;
			!this.$v.selectedDungeon.required &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.fieldRequired"));
			return errors;
		},
		selectedClassErrors() {
			const errors = [];
			if (!this.$v.selectedClass.$dirty) return errors;
			!this.$v.selectedClass.required &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.fieldRequired"));
			return errors;
		},
		selectedTankTypeErrors() {
			const errors = [];
			if (!this.$v.selectedTankType.$dirty) return errors;
			!this.$v.selectedTankType.required &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.fieldRequired"));
			return errors;
		},
		selectedHealTypeErrors() {
			const errors = [];
			if (!this.$v.selectedHealType.$dirty) return errors;
			!this.$v.selectedHealType.required &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.fieldRequired"));
			return errors;
		},
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
