<template>
	<v-app-bar absolute app dense class="elevation-2">
		<v-btn to="/" icon plain>
			<v-icon>mdi-vuetify</v-icon>
		</v-btn>
		<v-menu full-width offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn plain v-bind="attrs" v-on="on">
					{{ currentRegion }}
					<v-icon right>mdi-menu-down</v-icon>
				</v-btn>
			</template>
			<v-list dense>
				<v-list-item v-for="(item, index) in regions" :key="index">
					<v-list-item-title>
						<v-btn block small tile :to="item.path">{{ item.title }}</v-btn>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-row justify="center">
			<v-btn
				small
				tile
				depressed
				:to="{ name: 'Search', params: { region: currentRegion } }"
			>
				{{ $vuetify.lang.t("$vuetify.search") }}
			</v-btn>
			<v-btn
				small
				tile
				depressed
				:to="{ name: 'Top', params: { region: currentRegion } }"
			>
				{{ $vuetify.lang.t("$vuetify.top") }}
			</v-btn>
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn small tile depressed v-bind="attrs" v-on="on">
						{{ $vuetify.lang.t("$vuetify.info") }}
						<v-icon right>mdi-menu-down</v-icon>
					</v-btn>
				</template>
				<v-list dense>
					<v-list-item>
						<v-list-item-title>
							<v-btn block tile to="/info/api">
								{{ this.$vuetify.lang.t(`$vuetify.apiInfoLink`) }}</v-btn
							>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn block tile to="/info/about">{{
								this.$vuetify.lang.t(`$vuetify.aboutLink`)
							}}</v-btn>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-row>
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon plain v-bind="attrs" v-on="on">
					<v-icon>mdi-translate</v-icon>
				</v-btn>
			</template>
			<v-list dense>
				<v-list-item v-for="(item, index) in availableLocales" :key="index">
					<v-list-item-title>
						<v-btn small block tile v-on:click="changeLocale(item)">{{
							item
						}}</v-btn>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-btn v-on:click="changeTheme()" icon plain>
			<v-icon>mdi-invert-colors</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<style>
</style>

<script>
export default {
	name: "NavBar",
	components: {},
	data: () => ({
		currentRegion: "N/A",
		availableLocales: [],
		regions: [
			{
				title: "EU",
				path: "/eu",
			},
			{
				title: "RU",
				path: "/ru",
			},
			{
				title: "NA",
				path: "/na",
			},
		],
	}),
	mounted: function () {
		if (this.$router.currentRoute.params.region)
			this.currentRegion = this.$router.currentRoute.params.region;

		this.availableLocales = Object.keys(this.$vuetify.lang.locales);

		const saved_themeIsDark = this.$ls.get("dark_theme");
		const bodyElement = document.getElementsByTagName("body")[0];
		
		if (saved_themeIsDark === "true") {
			bodyElement.classList ="dark";
			this.$vuetify.theme.dark = true;
		} else {
			bodyElement.classList ="light";
			this.$vuetify.theme.dark = false;
		}
		const saved_currentLocale = this.$ls.get("locale") || navigator.language.slice(0,2);

		if (this.availableLocales.includes(saved_currentLocale))
			this.changeLocale(saved_currentLocale);
	},
	watch: {
		$route() {
			if (this.$router.currentRoute.params.region)
				this.currentRegion = this.$router.currentRoute.params.region;
		},
	},
	methods: {
		changeTheme: function () {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			this.$ls.set("dark_theme", this.$vuetify.theme.dark.toString());
			const bodyElement = document.getElementsByTagName("body")[0];
			bodyElement.classList = this.$vuetify.theme.dark === true ? "dark" : "light";
		},
		changeLocale(loc) {
			this.$vuetify.lang.current = loc;
			this.$ls.set("locale", this.$vuetify.lang.current.toString());
		},
	},
};
</script>