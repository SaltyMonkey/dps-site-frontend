<template :class="currentTheme">
	<v-app
		:style="{ background: $vuetify.theme.themes[currentTheme].background }">
		<NavBar></NavBar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<style type="scss">
@import "~@fontsource/open-sans/400.css";
</style>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
	name: "App",
	components: {
		NavBar,
	},
	mounted() {
		this.availableLocales = Object.keys(this.$vuetify.lang.locales);

		const saved_themeIsDark = this.$ls.get("dark_theme");
		const bodyElement = document.getElementsByTagName("body")[0];

		if (saved_themeIsDark === "true" || saved_themeIsDark === undefined) {
			bodyElement.classList = "dark";
			this.$vuetify.theme.dark = true;
		}
		
		const saved_currentLocale =
			this.$ls.get("locale") || navigator.language.slice(0, 2);

		if (this.availableLocales.includes(saved_currentLocale))
			this.$vuetify.lang.current = saved_currentLocale;
			
		this.$ls.set("locale", this.$vuetify.lang.current.toString());
	},
	data: () => ({}),
};
</script>
