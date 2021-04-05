<template>
	<v-app-bar absolute app dense tile outlined>
		<v-btn @click="goToHome" aria-label="main page" icon plain>
			<v-icon> {{ mdiVuetify }}</v-icon>
		</v-btn>
		<v-menu offset-y >
			<template v-slot:activator="{ on, attrs }">
				<v-btn plain v-bind="attrs" v-on="on">
					{{ currentRegion }}
					<v-icon right> {{ mdiMenuDown }}</v-icon>
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
				:to="{ name: 'Search', params: { region: currentRegion } }">
				{{ $vuetify.lang.t("$vuetify.search") }}
			</v-btn>
			<v-btn
				small
				tile
				depressed
				:to="{ name: 'Top', params: { region: currentRegion } }">
				{{ $vuetify.lang.t("$vuetify.top") }}
			</v-btn>
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn small tile depressed v-bind="attrs" v-on="on">
						{{ $vuetify.lang.t("$vuetify.info") }}
						<v-icon right> {{ mdiMenuDown }}</v-icon>
					</v-btn>
				</template>
				<v-list dense>
					<v-list-item>
						<v-list-item-title>
							<v-btn small block tile to="/info/api">
								{{ this.$vuetify.lang.t(`$vuetify.apiInfoLink`) }}</v-btn>
						</v-list-item-title>
					</v-list-item>
					<v-list-item>
						<v-list-item-title>
							<v-btn small block tile to="/info/about">{{
								this.$vuetify.lang.t(`$vuetify.aboutLink`)
							}}</v-btn>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-row>
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn aria-label="change language" icon plain v-bind="attrs" v-on="on">
					<v-icon>{{ mdiTranslate }}</v-icon>
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
		<v-btn aria-label="change theme" v-on:click="changeTheme()" icon plain>
			<v-icon>{{ mdiInvertColors }}</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<style>
</style>

<script>
import { mdiTranslate, mdiInvertColors, mdiMenuDown, mdiVuetify } from "@mdi/js";

export default {
	name: "NavBar",
	components: {},
	data: () => ({
		currentRegion: "EU",
		availableLocales: [],
		regions: [],

		mdiInvertColors,
		mdiTranslate,
		mdiMenuDown,
		mdiVuetify

	}),
	mounted() {
		this.availableLocales = Object.keys(this.$vuetify.lang.locales);
		
		this.$appConfig.allowedRegions.forEach((x) => {
			this.regions.push({ title: x.toUpperCase(), path: `/${x}`});
		});

		if (this.$router.currentRoute.params.region)
			this.currentRegion = this.$router.currentRoute.params.region;
	},
	watch: {
		$route() {
			if (this.$router.currentRoute.params.region)
				this.currentRegion = this.$router.currentRoute.params.region;
		},
	},
	methods: {
		changeTheme() {
			this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
			this.$ls.set("dark_theme", this.$vuetify.theme.dark.toString());
			const bodyElement = document.getElementsByTagName("body")[0];
			bodyElement.classList =
				this.$vuetify.theme.dark === true ? "dark" : "light";
		},
		changeLocale(loc) {
			this.$vuetify.lang.current = loc;
			this.$ls.set("locale", this.$vuetify.lang.current.toString());
		},
		goToHome() {
			let urlToMove = this.currentRegion || "eu"; 
			// eslint-disable-next-line no-empty-function
			this.$router.push(`/${urlToMove}`).catch(() => { });
		},
	},
};
</script>