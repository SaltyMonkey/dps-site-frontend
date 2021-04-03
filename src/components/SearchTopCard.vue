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
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isP2WConsums"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeFoodStr`)"
			></v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isMultipleTanks"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMTankStr`)"
			></v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isMultipleHeals"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMHealStr`)"
			></v-checkbox>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="searchButtonPress"
				:loading="loadingData"
				:disabled="loadingData"
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
	props: ["loadingData"],
	mixins: [validationMixin],
	name: "SearchTopCard",
	data: () => ({
		selectedDungeon: undefined,
		selectedClass: undefined,
		isP2WConsums: false,
		isMultipleTanks: false,
		isMultipleHeals: false
	}),
	validations: {
		selectedDungeon: { required },
		selectedClass: { required },
	},
	components: {},
	methods: {
		searchButtonPress() {
			this.$v.$touch();
			if (!this.$v.$anyError) {
				let res = {};
				res["region"] = this.$router.currentRoute.params.region.toLowerCase();
				res["isMultipleTanks"] = this.isMultipleTanks;
				res["isMultipleHeals"] = this.isMultipleHeals;
				res["isP2WConsums"] = this.isP2WConsums;
				if (this.selectedClass) res["playerClass"] = this.selectedClass;

				this.$emit("searchtop", res);
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
		}
	},
};
</script>
