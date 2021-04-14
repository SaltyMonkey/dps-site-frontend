<template>
<div class="scroller-cutted" :class="currentTheme">
	<v-container fluid>
	<IndeterminatedTopProgressBar v-if="loadingData"></IndeterminatedTopProgressBar>
	<v-alert text prominent tile origin type="error" v-if="loadingError">{{ $vuetify.lang.t("$vuetify.loadError") }}</v-alert>
	<v-row dense align="start" justify="center" v-if="!loadingError">
		<v-col cols="12" sm="7" md="8" lg="8" xl="7">
			<v-card class="elevation-3 mb-2 mr-2" tile outlined>
				<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
					API
				</v-card-title>
				<v-card-text>
					<highlight-code lang="json">
						{{ api }}
					</highlight-code>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</v-container>
</div>
</template>

<script>
export default {
	name: "Api",
	components: {},
	data: () => ({
		api: "",
		loadingData: false,
		loadingError: false
	}),
	created: function () {
		this.loadApiList();
	},
	methods: {
		loadApiList() {
			this.loadingData = true;
			this.$api.apiList()
				.then((res) => {
					this.api = res.data;
					this.loadingData = false;
				}).catch(() => {
					this.loadingData = false;
					this.loadingError = true;
				});
		},
	}
};
</script>
