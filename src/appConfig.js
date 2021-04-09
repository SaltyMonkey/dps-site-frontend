import whitelist from "@/assets/dpsData/whitelist.js";
import serversPerRegion from "@/assets/dpsData/serversPerRegion.js";

export default {
	allowedRegions: Object.keys(serversPerRegion.data),
	defaultRegionParamOverride: serversPerRegion.default,
	apiUrl: "http://localhost:3000/",
	filesUrl: "http://localhost:8080/static/",
	gameClasses: [{translation: "TWarrior", value: { "roleType": 1, "class": "Warrior" }}, {translation: "Warrior", value: { "roleType": 2, "class": "Warrior" }}, "Lancer", "Slayer", {translation: "TBerserker", value: { "roleType": 1, "class": "Berserker" }}, {translation: "Berserker", value: { "roleType": 2, "class": "Berserker" }}, "Sorcerer", "Archer", "Priest", "Mystic", "Reaper", "Gunner", {translation: "Brawler", value: { "roleType": 2, "class": "Brawler" }}, {translation: "TBrawler", value: { "roleType": 1, "class": "Brawler" }}, "Ninja", "Valkyrie"],
	allowedDungeons: whitelist,
	serversPerRegion: serversPerRegion.data,
	windowTitle: "[Tera DPS] DPS logs for Tera Online",
	windowTitleSearchTop: "[Tera DPS] Leaderboard",
	windowTitleSearch: "[Tera DPS] Search",
	windowTitleAbout: "[Tera DPS] About",
	windowTitleApi: "[Tera DPS] API",
	windowTitleDetails: "[Tera DPS] Run details",
};