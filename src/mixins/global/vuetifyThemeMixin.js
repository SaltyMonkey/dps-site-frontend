export default {
	computed: {
		currentTheme() {
			return this.$vuetify.theme.dark ? "dark" : "light";
		},
	}
};