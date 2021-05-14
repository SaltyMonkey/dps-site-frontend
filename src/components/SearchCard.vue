<template>
	<v-card class="elevation-2 mb-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select
				dense
				clearable
				@change="resetValidation"
				v-model="selectedDungeon"
				:items="dungeonsList"
				:label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)">
			</v-select>
			<v-select
				dense
				clearable
				@change="resetValidation"
				v-model="selectedClass"
				:items="classesList"
				:label="$vuetify.lang.t(`$vuetify.searchClassStr`)">
				<template slot="item" slot-scope="data">
					<v-icon left> $class-{{ (data.item.value.class ? data.item.value.class : data.item.value ).toLowerCase() }} </v-icon>
					{{ data.item.text }}
				</template>
			</v-select>
			<v-text-field
				:error-messages="nameErrors"
				dense
				@change="resetValidation"
				v-model="playerStr"
				:label="$vuetify.lang.t(`$vuetify.searchPlayerStr`)">
			</v-text-field>
			<v-select
				dense
				clearable
				@change="resetValidation"
				v-model="selectedServer"
				:items="currentServers"
				:label="$vuetify.lang.t(`$vuetify.searchServerStr`)">
			</v-select>
			<v-select
				dense
				@change="resetValidation"
				v-model="selectedTime"
				:items="durationList"
				:label="$vuetify.lang.t(`$vuetify.searchTimeStr`)">
			</v-select>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isShame"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeShameStr`)">
			</v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isP2WConsums"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeFoodStr`)">
			</v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isMultipleTanks"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMTankStr`)">
			</v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				v-model="isMultipleHeals"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMHealStr`)">
			</v-checkbox>
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
import { minLength, maxLength, required } from "vuelidate/lib/validators";

export default {
	props: ["loadingData",
	//"query"
	],
	name: "SearchCard",
	mixins: [validationMixin],
	validations: {
		playerStr: { maxLength: maxLength(20), minLength: minLength(3) },
		selectedTime: { required },
	},
	data: () => ({
		selectedDungeon: undefined,
		selectedClass: undefined,
		selectedServer: undefined,
		selectedTime: "Month",
		playerStr: "",
		isShame: false,
		isMultipleTanks: false,
		isMultipleHeals: false,
		isP2WConsums: false,
		currentServers: []
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
				res["timeRange"] = this.selectedTime;
				if (this.playerStr) res["playerName"] = this.playerStr;
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
				this.$emit("search", res);
			}
		},
		invalidateServers() {
			this.currentServers = this.$appConfig.serversPerRegion[this.$router.currentRoute.params.region.toLowerCase()] || [];
		},
		resetValidation() {
			this.$v.$reset();
		}
	},
	mounted: function() {
		this.invalidateServers();
	},
	computed: {
		selectedTimeErrors() {
			const errors = [];
			if (!this.$v.selectedTime.$dirty) return errors;
			!this.$v.selectedTime.required &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.fieldRequired"));
			return errors;
		},
		nameErrors() {
			const errors = [];
			if (!this.$v.playerStr.$dirty) return errors;
			!this.$v.playerStr.maxLength &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.maxPlayerNameLengthError"));
			!this.$v.playerStr.minLength &&
				errors.push(this.$vuetify.lang.t("$vuetify.validation.minPlayerNameLengthError"));
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

			arrView = arrView.sort((a, b) => a.text.localeCompare(b.text));
			return arrView;
		},
		dungeonsList() {
			let arrView = [];

			this.$appConfig.allowedDungeons.forEach((dg) => {
				arrView.push({
					header: this.$vuetify.lang.t(`$vuetify.monsters.${dg.AreaId}.name`) || dg.AreaId
				});
				dg.BossIds.forEach(elem => {
					arrView.push({
						text: this.$vuetify.lang.t(`$vuetify.monsters.${dg.AreaId}.monsters.${elem}.name`) || dg.AreaId,
						value: { huntingZoneId:  dg.AreaId, bossId: elem }
					});
				});
			});

			return arrView;
		},
		durationList() {
			let dt = [];
			
			["Day", "Week", "Month", "Any"].forEach(elem => {
				dt.push({
					text: this.$vuetify.lang.t(`$vuetify.timeType.${elem}`),
					value: elem
				});
			});

			dt = dt.sort((a, b) => a.text.localeCompare(b.text));
			return dt;
		},
	},
	watch: {
		"$vuetify.lang.current"() {
			this.selectedDungeon = undefined;
			this.selectedClass = undefined;
			this.selectedServer = undefined;
			this.selectedTime = "Month";
			this.$v.$reset();
		},
		$route() {
			if (this.$router.currentRoute.params.region)
				this.invalidateServers();
		},
	}
};
</script>
