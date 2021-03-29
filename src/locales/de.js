import { de } from "vuetify/es5/locale";
import monsters from "@/locales/dpsData/de/monsters.json";

export default {
	...de,
	dps: "dps",
	search: "search",
	top: "top",
	info: "info",
	apiInfoLink: "API info",
	aboutLink: "About",
	uploadsLink: "Uploads",
	runDetails: "Run basic info",
	runDetailsExt: "Run details",
	recentTopDPS: "Recent top DPS players",
	recentUploads: "Recent uploads",
	searchCardString: "Search configuration",
	searchResultString: "Search result",
	partyDps: "Party DPS:",
	duration: "Duration:",
	uploadTime: "Upload time:",
	searchDungeonStr: "Dungeon",
	searchButton: "Search",
	searchClassStr: "Class",
	searchPlayerStr: "Player",
	searchIncludeShameStr: "shame",
	searchIncludeFoodStr: "event food",
	searchIncludeMTankStr: "2+ tanks",
	searchIncludeMHealStr: "2+ heals",
	searchTankType: "Tank class",
	searchHealType: "Healer class",
	classes: {
		"Warrior": "Warrior",
		"Lancer": "Lancer",
		"Slayer": "Slayer",
		"Berserker": "Berserker",
		"Sorcerer": "Sorcerer",
		"Archer": "Archer",
		"Priest": "Priest",
		"Mystic": "Mystic",
		"Reaper": "Reaper",
		"Gunner": "Gunner",
		"Brawler": "Brawler",
		"Ninja": "Ninja",
		"Valkyrie": "Valkyrie"
	},
	dungeons: {

	},
	multiHeal: "Multiple healers",
	multiTank: "Multiple tanks",
	p2wFood: "Event food",
	validation: {
		"maxPlayerNameLengthError": "Name must be at most 20 characters long",
		"minPlayerNameLengthError": "Name must be at lest 3 characters long",
		"fieldRequired": "Field required",
	},
	monsters
};
