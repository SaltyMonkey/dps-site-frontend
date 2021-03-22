<template :class="currentTheme">
	<v-app
		:style="{ background: $vuetify.theme.themes[currentTheme].background }"
	>
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
	created() {
		window.addEventListener("resize", this.onResize);
	},
	destroyed() {
		window.removeEventListener("resize", this.onResize);
	},
	methods: {
		onResize() {
			console.log(this.$vuetify.breakpoint.name);
		},
	},
	data: () => ({}),
};
</script>
