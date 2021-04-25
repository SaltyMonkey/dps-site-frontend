<template>
	<v-app-bar absolute app dense tile outlined>
		<v-btn @click="goToHome" aria-label="main page" icon plain>
			<v-icon> {{ mdiHomeVariantOutline }}</v-icon>
		</v-btn>
		<v-menu offset-y >
			<template v-slot:activator="{ on, attrs }">
				<v-btn plain v-bind="attrs" v-on="on">
					{{ currentRegion }}
					<v-icon right> {{ mdiMenuDown }}</v-icon>
				</v-btn>
			</template>
			<v-list dense>
				<v-list-item v-for="(item, index) in $appConfig.allowedRegions" :key="index">
					<v-list-item-title>
						<v-btn  block small tile @click="changeRegion(item)">{{ item.toUpperCase() }}</v-btn>
					</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-row justify="center">
			<template v-if="$vuetify.breakpoint.mobile">
				<v-btn
					icon
					plain
					:to="{ name: 'Search', params: { region: currentRegion } }">
					<v-icon> {{ mdiTextBoxSearchOutline }} </v-icon>
				</v-btn>
				<v-btn
					icon
					plain
					:to="{ name: 'Top', params: { region: currentRegion } }">
					<v-icon>{{ mdiChartLine }} </v-icon>
				</v-btn>
				<v-menu offset-y>
					<template v-slot:activator="{ on, attrs }">
						<v-btn icon plain v-bind="attrs" v-on="on">
							<v-icon> {{ mdiInformationOutline }}</v-icon>
						</v-btn>
					</template>
					<v-list dense>
						<v-list-item>
							<v-list-item-title>
									<v-btn small block tile to="/info/about">{{this.$vuetify.lang.t(`$vuetify.aboutLink`)}}</v-btn>
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-list-item-title>
									<v-btn small block tile to="/info/uploads">{{this.$vuetify.lang.t(`$vuetify.uploadsLink`)}}</v-btn>
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-list-item-title>
								<v-btn small block tile to="/info/api">{{ this.$vuetify.lang.t(`$vuetify.apiInfoLink`) }}</v-btn>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>
			<template v-else>
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
									<v-btn small block tile to="/info/about">{{this.$vuetify.lang.t(`$vuetify.aboutLink`)}}</v-btn>
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-list-item-title>
									<v-btn small block tile to="/info/uploads">{{this.$vuetify.lang.t(`$vuetify.uploadsLink`)}}</v-btn>
							</v-list-item-title>
						</v-list-item>
						<v-list-item>
							<v-list-item-title>
								<v-btn small block tile to="/info/api">{{ this.$vuetify.lang.t(`$vuetify.apiInfoLink`) }}</v-btn>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>
		</v-row>
		<v-menu offset-y>
			<template v-slot:activator="{ on, attrs }">
				<v-btn aria-label="change language" icon plain v-bind="attrs" v-on="on">
					<v-icon>{{ mdiTranslate }}</v-icon>
				</v-btn>
			</template>
			<v-list dense>
				<v-list-item v-for="(item, index) in Object.keys(this.$vuetify.lang.locales)" :key="index">
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
import { mdiTranslate, mdiInvertColors, mdiMenuDown, mdiHomeVariantOutline, mdiTextBoxSearchOutline, mdiChartLine, mdiInformationOutline } from "@mdi/js";

export default {
	name: "NavBar",
	components: {},
	data: () => ({
		currentRegion: " ",
		mdiInvertColors,
		mdiTranslate,
		mdiMenuDown,
		mdiHomeVariantOutline,
		mdiTextBoxSearchOutline,
		mdiChartLine,
		mdiInformationOutline
	}),
	mounted() {
		let edited = false;
		const savedMainRegion = this.$ls.get("region");
		
		if (this.$router.currentRoute.params.region) {
			this.currentRegion = this.$router.currentRoute.params.region;
			edited = true;
		}
		else if (savedMainRegion && this.$appConfig.allowedRegions.includes(savedMainRegion)) {
			this.currentRegion = savedMainRegion;
			edited = true;
		}
		
		if (!edited)
			this.currentRegion = this.$appConfig.defaultRegionParamOverride;
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
			let region = this.currentRegion || this.$appConfig.defaultRegionParamOverride;
			// eslint-disable-next-line no-empty-function
			this.$router.push(`/${region}`).catch(() => { });
		},
		changeRegion(region) {
			this.$ls.set("region", region.toString());
			if (this.$router.currentRoute.params.region)
				// eslint-disable-next-line no-empty-function
				this.$router.push({ name: this.$router.currentRoute.name, params: { region: region }}).catch(() => { });
			else
				// eslint-disable-next-line no-empty-function
				this.$router.push(`/${region}`).catch(() => { });
		}
	},
};
</script>