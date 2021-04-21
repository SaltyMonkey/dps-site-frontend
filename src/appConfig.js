import whitelist from "@/assets/dpsData/whitelist.js";
import serversPerRegion from "@/assets/dpsData/serversPerRegion.js";

export default {
	allowedRegions: Object.keys(serversPerRegion.data),
	defaultRegionParamOverride: serversPerRegion.default,
	topToday: { huntingZoneId: 3206, bossId: 1000 },
	apiUrl: "https://api.teralogs.com/",
	filesUrl: "https://teralogs.com/static/",
	gameClasses: [{translation: "TWarrior", value: { "roleType": 1, "class": "Warrior" }}, {translation: "Warrior", value: { "roleType": 2, "class": "Warrior" }}, "Lancer", "Slayer", {translation: "TBerserker", value: { "roleType": 1, "class": "Berserker" }}, {translation: "Berserker", value: { "roleType": 2, "class": "Berserker" }}, "Sorcerer", "Archer", "Priest", "Mystic", "Reaper", "Gunner", {translation: "Brawler", value: { "roleType": 2, "class": "Brawler" }}, {translation: "TBrawler", value: { "roleType": 1, "class": "Brawler" }}, "Ninja", "Valkyrie"],
	allowedDungeons: whitelist,
	serversPerRegion: serversPerRegion.data,
	windowTitle: "TeraLogs - Breakdowns storage site for Tera Online",
	windowTitleSearchTop: "TeraLogs - Leaderboard",
	windowTitleSearch: "TeraLogs - Search",
	windowTitleAbout: "TeraLogs - About",
	windowTitleApi: "TeraLogs - API",
	windowTitleDetails: "TeraLogs - Run details",
};