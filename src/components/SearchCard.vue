<template>
	<v-card class="elevation-2 mb-2" tile outlined>
		<v-card-text class="pb-1">
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
				:value="isShame"
				:indeterminate="isShameIntState"
				@click="isShameClick"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeShameStr`)">
			</v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				:value="isP2WConsums"
				:indeterminate="isP2WConsumsIntState"
				@click="isP2WConsumsClick"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeFoodStr`)">
			</v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				:value="isMultipleTanks"
				:indeterminate="isMultipleTanksIntState"
				@click="isMultipleTanksClick"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMTankStr`)">
			</v-checkbox>
			<v-checkbox
				class="mt-1"
				hide-details
				dense
				:value="isMultipleHeals"
				:indeterminate="isMultipleHealsIntState"
				@click="isMultipleHealsClick"
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMHealStr`)">
			</v-checkbox>
		</v-card-text>
		<v-card-actions>
			<v-btn
				@click="generateRequestData"
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

const timeRanges = ["Day", "Week", "Month", "Any"];

const simpleQueryObjMap = {
	isShame: "shm",
	isMultipleTanks: "mt",
	isMultipleHeals: "mh",
	isP2WConsums: "eb",
	huntingZoneId: "hz",
	bossId: "bid",
	playerClass: "cl",
	playerServer: "srv",
	roleType: "rl",
	playerName: "n",
	timeRange: "r"
};
//simplify request object to show in URL bar
const simplifyQueryObject = (obj, redactObj = {}) => {
	let simplifiedObj = {};
	for (const [key, value] of Object.entries(obj)) {
		if(simpleQueryObjMap[key] && !redactObj[key]) simplifiedObj[simpleQueryObjMap[key]] = value;
	}
	return simplifiedObj;
};

//unwrap request query object from url bar
const extendedObjMap = Object.fromEntries(Object.entries(simpleQueryObjMap).map(a => a.reverse()));
const expandQueryObject = (obj) => {
	let expandedObj = {};
	for (const [key, value] of Object.entries(obj)) {
		if(extendedObjMap[key]) expandedObj[extendedObjMap[key]] = value;
	}
	return expandedObj;
};

const strToBool = (str) => {
	if (str === "true") return true;
	else if (str === "false") return false;
	else false;
};

export default {
	name: "SearchCard",
	components: {},
	mixins: [validationMixin],
	props: [
		"loadingData",
		"query"
	],
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
		isShame: undefined,
		isShameIntState: true,
		isMultipleTanks: undefined,
		isMultipleTanksIntState: true,
		isMultipleHeals: undefined,
		isMultipleHealsIntState: true,
		isP2WConsums: undefined,
		isP2WConsumsIntState: true,
		currentServers: [],
		
	}),

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
			
			timeRanges.forEach(elem => {
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
			this.$v.$reset();
		},
		$route() {
			if (this.$router.currentRoute.params.region) {
				this.invalidateServers();
			}
		},
	},
	mounted: function() {
		this.invalidateServers();
		if(!this.query || Object.keys(this.query) === 0) return;

		const revalidateQuery = {};
		const qur = expandQueryObject(this.query);
		if(qur.huntingZoneId && qur.bossId) {
			console.log(this.dungeonsList);
			const isAllowed = this.dungeonsList.find(elem => elem.value && elem.value.huntingZoneId === Number(qur.huntingZoneId) && (elem.value.bossId === Number(qur.bossId)));
			if(isAllowed) this.selectedDungeon = { huntingZoneId: Number(qur.huntingZoneId) , bossId: Number(qur.bossId) };
			else {
				revalidateQuery.huntingZoneId = true;
				revalidateQuery.bossId = true;
			}
		}
		if(qur.playerServer) {
			const isAllowed = this.currentServers.includes(qur.playerServer);
			if(isAllowed) this.selectedServer = qur.playerServer;
			else revalidateQuery.playerServer = true;
		}

		// eslint-disable-next-line no-prototype-builtins
		if(qur.hasOwnProperty("isShame")) {
			let val = strToBool(qur.isShame);
			// eslint-disable-next-line default-case
			this.isShame = val;
			this.isShameIntState = false;
		}
		// eslint-disable-next-line no-prototype-builtins
		if(qur.hasOwnProperty("isMultipleTanks")) {
			let val = strToBool(qur.isMultipleTanks);
			// eslint-disable-next-line default-case
			this.isMultipleTanks = val;
			this.isMultipleTanksIntState = false;
		}
		// eslint-disable-next-line no-prototype-builtins
		if(qur.hasOwnProperty("isMultipleHeals")) {
			let val = strToBool(qur.isMultipleHeals);
			// eslint-disable-next-line default-case
			this.isMultipleHeals = val;
			this.isMultipleHealsIntState = false;
		}
		// eslint-disable-next-line no-prototype-builtins
		if(qur.hasOwnProperty("isP2WConsums")) {
			let val = strToBool(qur.isP2WConsums);
			// eslint-disable-next-line default-case
			this.isP2WConsums = val;
			this.isP2WConsumsIntState = false;
		}
		if(qur.timeRange) {
			let val = String(qur.timeRange);
			if(timeRanges.includes(val))
				this.selectedTime = val;
			else
				revalidateQuery.selectedTime = true;
		}

		if(qur.playerName) {
			this.playerStr = qur.playerName;
		}

		if(qur.roleType && qur.playerClass) {
			const roleNum = Number(qur.roleType);
			const isAllowed = this.classesList.find(elem => typeof elem.value === "object" && elem.value.roleType === roleNum && elem.value.class === qur.playerClass);
			if(isAllowed) this.selectedClass = { class: qur.playerClass, roleType: roleNum };
			else {
				revalidateQuery.playerClass = true;
				revalidateQuery.roleType = true;
			}
		}
		else if(qur.playerClass) {
			console.log(this.classesList);
			const isAllowed = this.classesList.find(elem => typeof elem.value !== "object" && elem.value === qur.playerClass);
			console.log(isAllowed);
			if(isAllowed) this.selectedClass = qur.playerClass;
			else {
				revalidateQuery.playerClass = true;
			}
		}
		
		this.$emit("query", simplifyQueryObject(qur, revalidateQuery));
		if(Object.keys(qur).filter(x => x !== "timeRange").length> 0) this.generateRequestData();
	},
	methods: {
		isShameClick() {
			if(this.isShame === false) {
				this.isShame = undefined;
				this.isShameIntState = true;
			}
			else if(this.isShame === true) {
				this.isShame = false;
				this.isShameIntState = false;
			}
			else if (this.isShame === undefined){
				this.isShame = true;
				this.isShameIntState = false;
			}
		},
		isMultipleTanksClick() {
			if(this.isMultipleTanks === false) {
				this.isMultipleTanks= undefined;
				this.isMultipleTanksIntState = true;
			}
			else if(this.isMultipleTanks === true) {
				this.isMultipleTanks = false;
				this.isMultipleTanksIntState = false;
			}
			else if (this.isMultipleTanks === undefined){
				this.isMultipleTanks = true;
				this.isMultipleTanksIntState = false;
			}
		},
		isMultipleHealsClick() {
			if(this.isMultipleHeals === false) {
				this.isMultipleHeals= undefined;
				this.isMultipleHealsIntState = true;
			}
			else if(this.isMultipleHeals === true) {
				this.isMultipleHeals = false;
				this.isMultipleHealsIntState = false;
			}
			else if (this.isMultipleHeals === undefined){
				this.isMultipleHeals = true;
				this.isMultipleHealsIntState = false;
			}
		},
		isP2WConsumsClick() {
			if(this.isP2WConsums === false) {
				this.isP2WConsums= undefined;
				this.isP2WConsumsIntState = true;
			}
			else if(this.isP2WConsums === true) {
				this.isP2WConsums = false;
				this.isP2WConsumsIntState = false;
			}
			else if (this.isP2WConsums === undefined){
				this.isP2WConsums = true;
				this.isP2WConsumsIntState = false;
			}
		},
		generateRequestData() {
			this.$v.$touch();
			if (!this.$v.$anyError) {
				let res = {};
				res["region"] = this.$router.currentRoute.params.region.toLowerCase();
				if(this.isMultipleTanks !== undefined) res["isMultipleTanks"] = this.isMultipleTanks;
				if(this.isMultipleHeals !== undefined) res["isMultipleHeals"] = this.isMultipleHeals;
				if(this.isP2WConsums !== undefined) res["isP2WConsums"] = this.isP2WConsums;
				if(this.isShame !== undefined) res["isShame"] = this.isShame;
				res["timeRange"] = this.selectedTime;
				if (this.playerStr.length > 1) res["playerName"] = this.playerStr;
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
				this.$emit("query", simplifyQueryObject(res));
			}
		},
		invalidateServers() {
			this.currentServers = this.$appConfig.serversPerRegion[this.$router.currentRoute.params.region.toLowerCase()] || [];
			if(!this.currentServers.includes(this.selectedServer)) this.selectedServer = undefined;
		},
		resetValidation() {
			this.$v.$reset();
		}
	}
};
</script>
