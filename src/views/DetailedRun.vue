<template>
	<v-container fluid class="pt-1">
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="2">
				<v-subheader>{{
					$vuetify.lang.t("$vuetify.runDetailsBase")
				}}</v-subheader>
				<div class="scroller" :class="currentTheme">

				</div>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="10" xl="8">
				<v-subheader>{{
					$vuetify.lang.t("$vuetify.runDetailsExt")
				}}</v-subheader>
				<div class="scroller" :class="currentTheme">
				
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => ({}),
	props: ["id"],
	name: "DetailedRun",
	components: { }
};
</script>
