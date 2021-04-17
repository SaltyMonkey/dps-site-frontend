/// thx Doz for corrections

import {ru} from "vuetify/es5/locale";
import monsters from "@/assets/dpsData/ru/monsters.json";

export default {
	...ru,
	region: "Регион",
	loadError: "Контент недоступен",
	dps: "ДПС",
	search: "Поиск",
	top: "Рейтинг",
	info: "Инфо",
	apiInfoLink: "API",
	aboutLink: "О сайте",
	uploadsLink: "Загрузки",
	runDetails: "Базовая информация",
	runDetailsExt: "Детали",
	recentTopDPS: "Лучшие результаты",
	recentUploads: "Последние загрузки",
	searchCardString: "Параметры поиска",
	searchResultString: "Результаты поиска",
	partyDps: "Результат группы",
	playerDps: "Player DPS",
	duration: "Время",
	uploadTime: "Загружено:",
	searchDungeonStr: "Битва",
	searchButton: "Найти",
	searchClassStr: "Класс",
	searchPlayerStr: "Игрок",
	searchIncludeShameStr: "Плохая история",
	searchIncludeFoodStr: "Еда с событий",
	searchIncludeMTankStr: "2+ танка",
	searchIncludeMHealStr: "2+ целителя",
	searchTankType: "Класс танка",
	searchHealType: "Класс целителя",
	debuffsUptime: "Дебаффы:",
	enrageUptime: "Ярость:",
	aggroStats: "Агро:",
	avgCritRate: "Средний крит:",
	contribution: "Вклад:",
	floorTime: "Время смертей:",
	registeredDamage: "Ушерб:",
	buffsUptime: "Бафы:",
	castsAndcharges: "Касты/чарджи:",
	contributionGraphs: "Графики боя:",
	damageAndCritsTab: "Урон и крит",
	aggroAndDeathsTab: "Агро и смерти",
	contributionDetails: "Детали:",
	skillsBreakdown: "Анализ навыков:",
	encounterCard: "Детали боя:",
	dateCard: "Дата:",
	avgDpsCard: "Средний DPS",
	deathsCard: "Смерти",
	floortimeCard: "Время смерти",
	classes: {
		"TWarrior": "Воин танк",
		"Warrior": "Воин",
		"Lancer": "Рыцарь",
		"Slayer": "Убийца",
		"TBerserker": "Берсерк танк",
		"Berserker": "Берсерк",
		"Sorcerer": "Маг",
		"Archer": "Лучник",
		"Priest": "Жрец",
		"Mystic": "Мистик",
		"Reaper": "Жнец",
		"Gunner": "Инженер",
		"TBrawler": "Крушитель танк",
		"Brawler": "Крушитель",
		"Ninja": "Шиноби",
		"Valkyrie": "Валькирия"
	},
	timeType: {
		"Day": "День",
		"Week": "Неделя",
		"Month": "Месяц"
	},
	multiHeal: "2+ лекаря",
	multiTank: "2+ танка",
	p2wFood: "Еда с событий",
	validation: {
		"maxPlayerNameLengthError": "Имя слишком большое",
		"minPlayerNameLengthError": "Имя слишком короткое",
		"fieldRequired": "Необходимое поле",
	},
	monsters,
};
