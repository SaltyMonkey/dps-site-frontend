<template>
	<v-card class="elevation-2 mb-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select
				dense
				@change="resetValidation"
				:error-messages="selectedDungeonErrors"
				v-model="selectedDungeon"
				:items="dungeonsList"
				:label="`${$vuetify.lang.t('$vuetify.searchDungeonStr')}*`">
			</v-select>
			<v-select
				dense
				@change="resetValidation"
				:error-messages="selectedClassErrors"
				v-model="selectedClass"
				:items="classesList"
				:label="`${$vuetify.lang.t('$vuetify.searchClassStr')}*`">
				<template slot="item" slot-scope="data">
					<v-icon left> $class-{{ (data.item.value.class ? data.item.value.class : data.item.value).toLowerCase() }} </v-icon>
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
				:error-messages="selectedTimeErrors"
				@change="resetValidation"
				v-model="selectedTime"
				:items="durationList"
				:label="`${$vuetify.lang.t('$vuetify.searchTimeStr')}*`">
			</v-select>
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
import required from "vuelidate/lib/validators/required";
import { validationMixin } from "vuelidate";

const timeRanges = ["Day", "Week", "Month"];

const simpleQueryObjMap = {
	huntingZoneId: "hz",
	bossId: "bid",
	playerClass: "cl",
	playerServer: "srv",
	roleType: "rl",
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

export default {
	props: [
		"loadingData",
		"query"
	],
	mixins: [validationMixin],
	name: "SearchTopCard",
	data: () => ({
		selectedDungeon: undefined,
		selectedClass: undefined,
		selectedServer: undefined,
		selectedTime: "Month",
		isP2WConsums: false,
		isMultipleTanks: false,
		isMultipleHeals: false,
		currentServers: []
	}),
	validations: {
		selectedDungeon: { required },
		selectedClass: { required },
		selectedTime: { required },
	},
	components: {},
	methods: {
		generateRequestData() {
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
				this.$emit("query", simplifyQueryObject(res));
			}
		},
		invalidateServers() {
			this.currentServers = this.$appConfig.serversPerRegion[this.$router.currentRoute.params.region.toLowerCase()] || [];
			if(!this.currentServers.includes(this.selectedServer)) this.selectedServer = undefined;
		},
		resetValidation() {
			this.$v.$reset();
		},
	},
	mounted: function() {
		this.invalidateServers();
		if(!this.query || Object.keys(this.query) === 0) return;

		const revalidateQuery = {};
		const qur = expandQueryObject(this.query);
		if(qur.huntingZoneId && qur.bossId) {
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

		if(qur.timeRange) {
			let val = String(qur.timeRange);
			if(timeRanges.includes(val))
				this.selectedTime = val;
			else
				revalidateQuery.selectedTime = true;
		}

		if(qur.roleType && qur.playerClass) {
			const roleNum = Number(qur.roleType);
			const isAllowed = this.classesList.find(elem => typeof elem.value === "object" && elem.value.roleType === roleNum && elem.value.class === qur.playerClass);
			if(isAllowed) this.selectedClass = { class: qur.playerClass, roleType: roleNum };
			else {
				revalidateQuery.roleType = true;
			}
		}
		else if(qur.playerClass) {
			const isAllowed = this.classesList.find(elem => typeof elem.value !== "object" && elem.value === qur.playerClass);
			if(isAllowed) this.selectedClass = qur.playerClass;
			else {
				revalidateQuery.playerClass = true;
			}
		}

		this.$emit("query", simplifyQueryObject(qur, revalidateQuery));
		if(Object.keys(qur).filter(x => x !== "timeRange").length> 0) this.generateRequestData();
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
			this.selectedTime = "Month";
			this.$v.$reset();
		},
		$route() {
			if (this.$router.currentRoute.params.region) {
				this.invalidateServers();
			}
		},
	},
};
</script>
