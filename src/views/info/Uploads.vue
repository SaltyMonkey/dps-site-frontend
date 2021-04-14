<template>
<div class="scroller-cutted" :class="currentTheme">
	<v-container fluid>
	<v-row dense align="start" justify="center">
		<v-col cols="12"  sm="7" md="8" lg="8" xl="7">
			<v-card class="elevation-3 mb-2 mr-2" tile outlined>
				<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
					Access
				</v-card-title>
				<v-card-text>
					<Access></Access>
				</v-card-text>
			</v-card>
			<v-card class="elevation-3 mb-2 mr-2" tile outlined>
				<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
					Leaderboard
				</v-card-title>
				<v-card-text>
					<Leaderboard></Leaderboard>
				</v-card-text>
			</v-card>
			<v-card class="elevation-3 mb-2 mr-2" tile outlined>
				<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
					ShinraMeter configuration
				</v-card-title>
				<v-card-text>
					<Shinra></Shinra>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</div>
</template>

<script>
import Access from "@/components/Markdown/Uploads/Access.md";
import Shinra from "@/components/Markdown/Uploads/Shinra.md";
import Leaderboard from "@/components/Markdown/Uploads/Leaderboard.md";

export default {
	name: "Uploads",
	components: {
		Access,
		Shinra,
		Leaderboard
	}
};
</script>
