<template>
	<v-app :style="{background: $vuetify.theme.themes[currentTheme].background}">
		<NavBar></NavBar>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
	name: "App",
	components: {
		NavBar,
	},
	data: () => ({}),
};
</script>
