<template>
	<v-app-bar absolute app flat dense>
		<v-btn small to="/" icon plain>
			<v-icon light>mdi-vuetify</v-icon>
		</v-btn>
		<v-menu full-width offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn small icon plain v-bind="attrs" v-on="on">{{ currentRegion }}</v-btn>
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
			<v-btn small tile depressed >Search</v-btn>
			<v-btn
				small
				tile
				depressed
				:to="{ name: 'Test', params: { region: currentRegion, val: `gay` } }"
				>Top</v-btn
			>
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn small tile depressed v-bind="attrs" v-on="on">Info</v-btn>
				</template>
				<v-list dense>
					<v-list-item v-for="(item, index) in infoItems" :key="index">
						<v-list-item-title>
							<v-btn block small tile :to="item.path">{{ item.title }}</v-btn>
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-row>
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
		infoItems: [
			{
				title: "API info",
				path: "/info/api",
			},
			{
				title: "About",
				path: "/info/about",
			},
		],
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
	},
	watch: {
		$route() {
			if (this.$router.currentRoute.params.region)
				this.currentRegion = this.$router.currentRoute.params.region;
		},
	},
};
</script>