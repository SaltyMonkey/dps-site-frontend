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
			<v-text-field
				:error-messages="nameErrors"
				dense
				v-model="playerStr"
				:label="$vuetify.lang.t(`$vuetify.searchPlayerStr`)"
			></v-text-field>
			<v-select
				dense
				v-model="selectedServer"
				:items="serversList"
				label="Server"
			></v-select>
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
import { minLength, maxLength } from "vuelidate/lib/validators";

export default {
	props: ["loadingData"],
	name: "SearchCard",
	mixins: [validationMixin],
	validations: {
		playerStr: { maxLength: maxLength(20), minLength: minLength(3) },
	},
	data: () => ({
		selectedDungeon: undefined,
		selectedClass: undefined,
		selectedServer: undefined,
		playerStr: "",
		isShame: false,
		isMultipleTanks: false,
		isMultipleHeals: false,
		isP2WConsums: false,
	}),
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
				res["isShame"] = this.isShame;
				if (this.playerStr) res["playerName"] = this.playerStr;
				if (this.selectedClass) res["playerClass"] = this.selectedClass;
				if (this.selectedServer) res["playerServer"] = this.selectedServer;

				this.$emit("search", res);
			}
		},
	},
	computed: {
		nameErrors() {
			const errors = [];
			if (!this.$v.playerStr.$dirty) return errors;
			!this.$v.playerStr.maxLength &&
				errors.push("Name must be at most 20 characters long");
			!this.$v.playerStr.minLength &&
				errors.push("Name must be at lest 3 characters long");
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
