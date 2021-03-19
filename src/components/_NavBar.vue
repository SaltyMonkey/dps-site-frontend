<template>
	<v-app-bar app flat dense>
		<v-btn to="/" icon plain>
			<v-icon light>mdi-vuetify</v-icon>
		</v-btn>
		<v-row justify="center">
			<v-btn tile to="/">Home</v-btn>
			<v-btn tile>Search</v-btn>
			<v-menu offset-y>
				<template v-slot:activator="{ on, attrs }">
					<v-btn tile v-bind="attrs" v-on="on">Info</v-btn>
				</template>
				<v-list dense tile>
					<v-list-item v-for="(item, index) in infoItems" :key="index">
						<v-list-item-title>
							<v-btn block tile :to="item.path">{{ item.title }}</v-btn>
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
		infoItems: [
			{
				title: "Restrictions",
				path: "/restrictions",
			},
			{
				title: "API info",
				path: "/api",
			},
			{
				title: "About",
				path: "/about",
			},
			{
				title: "Donations",
				path: "/donations",
			},
		],
	}),
};
</script>