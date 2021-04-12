<template>
<div class="scroller-cutted" :class="currentTheme">
	<v-container fluid>
	<v-row dense align="start" justify="center">
		<v-col cols="12" sm="9">
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
					FAQ
				</v-card-title>
				<v-card-text>
					<Faq></Faq>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</div>
</template>

<script>
import Rules from "@/components/Markdown/Info/Uploads/Rules.md";
import Faq from "@/components/Markdown/Info/Uploads/Faq.md";

export default {
	name: "Uploads",
	components: {
		Rules,
		Faq
	}
};
</script>
