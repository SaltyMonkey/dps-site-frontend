<template>
	<div class="scroller-cutted" :class="currentTheme">
		<v-container fluid>
			<v-row dense align="start" justify="center">
				<v-col cols="12" lg="8" xl="8">
					<v-card class="elevation-3 mb-2 mr-2" tile outlined>
						<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
							Links
						</v-card-title>
						<v-card-actions>
							<v-row class="ma-1" align="center" justify="center">
								<v-btn class="mr-2" @click="teraLogsDiscord" tile>
									<v-icon left> {{ mdiDiscord }} </v-icon>
									TeraLogs.com
								</v-btn>
								<v-btn class="mr-2" @click="shinraMeterDiscord" tile>
									<v-icon left> {{ mdiDiscord }} </v-icon>
									ShinraMeter
								</v-btn>
							</v-row>
						</v-card-actions>
					</v-card>
					<v-card class="elevation-3 mb-2 mr-2" tile outlined>
						<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
							About
						</v-card-title>
						<v-card-text>
							<Basic></Basic>
						</v-card-text>
					</v-card>
					<v-card class="elevation-3 mb-2 mr-2" tile outlined>
						<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
							Rules
						</v-card-title>
						<v-card-text>
							<Rules></Rules>
						</v-card-text>
					</v-card>
					<v-card class="elevation-3 mb-2 mr-2" tile outlined>
						<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
							Privacy
						</v-card-title>
						<v-card-text>
							<Privacy />
						</v-card-text>
					</v-card>
		
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mdiDiscord } from "@mdi/js";

import Privacy from "@/components/Markdown/About/Privacy.md";
import Rules from "@/components/Markdown/About/Rules.md";
import Basic from "@/components/Markdown/About/Basic.md";

export default {
	name: "About",
	components: {
		Privacy,
		Rules,
		Basic
	},
	data: () => ({
		mdiDiscord
	}),
	methods: {
		teraLogsDiscord() {
			window.open("https://discord.gg/RwrNEskfa4", "_blank");  
		},
		shinraMeterDiscord() {
			window.open("https://discord.gg/nkyhe5zByY", "_blank");  
		}
	}
};
</script>
