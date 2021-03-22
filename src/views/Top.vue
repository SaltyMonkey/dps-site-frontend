<template>
	<v-container fluid class="pt-1">
		<v-row dense align="start" justify="center">
			<v-col cols="12" sm="5" md="4" lg="2" xl="2">
				<v-subheader>{{
					$vuetify.lang.t("$vuetify.searchCardString")
				}}</v-subheader>
				<v-card class="mb-2 elevation-2" tile outlined>
					<v-card-text class="pb-1">
						<v-select
							dense
							:label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)"
						></v-select>
						<v-select
							dense
							:label="$vuetify.lang.t(`$vuetify.searchClassStr`)"
						></v-select>
						<v-select
							dense
							:label="$vuetify.lang.t(`$vuetify.searchTankType`)"
						></v-select>
						<v-select
							dense
							:label="$vuetify.lang.t(`$vuetify.searchHealType`)"
						></v-select>
						<v-checkbox
							class="mt-1"
							hide-details
							dense
							:label="$vuetify.lang.t(`$vuetify.searchIncludeFoodStr`)"
						></v-checkbox>
						<v-checkbox
							class="mt-1"
							hide-details
							dense
							:label="$vuetify.lang.t(`$vuetify.searchIncludeMHealStr`)"
						></v-checkbox>
						<v-checkbox
							class="mt-1"
							hide-details
							dense
							:label="$vuetify.lang.t(`$vuetify.searchIncludeMTankStr`)"
						></v-checkbox>
					</v-card-text>
					<v-card-actions>
						<v-btn class="elevation-2" block tile>{{
							$vuetify.lang.t(`$vuetify.searchButton`)
						}}</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="12" sm="7" md="8" lg="10" xl="8">
				<v-subheader>{{
					$vuetify.lang.t("$vuetify.searchResultString")
				}}</v-subheader>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ["region"],
	name: "Top",
	components: {},
};
</script>
