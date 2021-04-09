<template>
	<v-card class="elevation-2 mb-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select
				dense
				@change="resetValidation"
				:error-messages="selectedDungeonErrors"
				v-model="selectedDungeon"
				:items="dungeonsList"
				:label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)">
			</v-select>
			<v-select
				dense
				@change="resetValidation"
				:error-messages="selectedClassErrors"
				v-model="selectedClass"
				:items="classesList"
				:label="$vuetify.lang.t(`$vuetify.searchClassStr`)">
			</v-select>
			<v-select
				dense
				:error-messages="selectedServerErrors"
				@change="resetValidation"
				v-model="selectedServer"
				:items="serversList"
				label="Server">
			</v-select>
			<v-select
				dense
				:error-messages="selectedTimeErrors"
				@change="resetValidation"
				v-model="selectedTime"
				:items="durationList"
				label="Time">
			</v-select>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="searchButtonPress"
				:loading="loadingData"
				:disabled="loadingData"
				class="elevation-2"
				block
				tile>
				{{ $vuetify.lang.t(`$vuetify.searchButton`) }}
			</v-btn>
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
		selectedServer: undefined,
		selectedTime: "Day",
		isP2WConsums: false,
		isMultipleTanks: false,
		isMultipleHeals: false,
	}),
	validations: {
		selectedDungeon: { required },
		selectedClass: { required },
		selectedTime: { required },
		selectedServer: { required }
	},
	components: {},
	methods: {
		searchButtonPress() {
			this.$v.$touch();
			if (!this.$v.$anyError) {
				let res = {};
				res["region"] = this.$router.currentRoute.params.region.toLowerCase();
				res["timeRange"] = this.selectedTime;
				if (this.selectedClass) {
					if(!this.selectedClass.class)
						res["playerClass"] = this.selectedClass;
					else {
						res["playerClass"] = this.selectedClass.class;
						res["roleType"] = this.selectedClass.roleType;
					}
				}
				if (this.selectedServer) res["playerServer"] = this.selectedServer;
				if (this.selectedDungeon) {
					res["huntingZoneId"] = this.selectedDungeon.huntingZoneId;
					res["bossId"] = this.selectedDungeon.bossId;
				}
				this.$emit("searchtop", res);
			}
		},
		resetValidation() {
			this.$v.$reset();
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
		selectedTimeErrors() {
			const errors = [];
			if (!this.$v.selectedTime.$dirty) return errors;
			!this.$v.selectedTime.required &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.fieldRequired"));
			return errors;
		},
		selectedServerErrors() {
			const errors = [];
			if (!this.$v.selectedServer.$dirty) return errors;
			!this.$v.selectedServer.required &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.fieldRequired"));
			return errors;
		},
		classesList() {
			let arrView = [];
			this.$appConfig.gameClasses.forEach((cls) => {
				if(typeof cls !== "string") {
					arrView.push({
						text: this.$vuetify.lang.t(`$vuetify.classes.${cls.translation}`) || cls.class,
						value: cls.value,
					});
				}
				else {
					arrView.push({
						text: this.$vuetify.lang.t(`$vuetify.classes.${cls}`) || cls,
						value: cls,
					});
				}
			});

			return arrView;
		},
		dungeonsList() {
			let arrView = [];

			this.$appConfig.allowedDungeons.forEach((dg) => {
				arrView.push({
					header:
						this.$vuetify.lang.t(`$vuetify.monsters.${dg.AreaId}.name`) ||
						dg.AreaId,
				});
				dg.BossIds.forEach((elem) => {
					arrView.push({
						text:
							this.$vuetify.lang.t(
								`$vuetify.monsters.${dg.AreaId}.monsters.${elem}.name`
							) || dg.AreaId,
						value: { huntingZoneId: dg.AreaId, bossId: elem },
					});
				});
			});

			return arrView;
		},
		serversList() {
			return (
				this.$appConfig.serversPerRegion[this.$router.currentRoute.params.region.toLowerCase()] || []);
		},
		durationList() {
			return ["Day", "Week", "Month"];
		},
	},
	watch: {
		"$vuetify.lang.current"() {
			this.selectedDungeon = undefined;
			this.selectedClass = undefined;
			this.selectedServer = undefined;
			this.selectedTime = "Day";
			this.$v.$reset();
		},
	},
};
</script>
