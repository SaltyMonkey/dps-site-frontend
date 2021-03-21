<template>
	<v-container fluid class="pt-1">
		<v-row dense align="start" justify="center">
			<v-col cols="3">
				<v-subheader>{{
					$vuetify.lang.t("$vuetify.searchCardString")
				}}</v-subheader>
				<v-card class="mb-2 elevation-2" tile outlined>
					<v-card-text class="pb-1">
						<v-select dense label="Dungeon"></v-select>
						<v-select dense label="Class"></v-select>
						<v-text-field dense label="Player name"></v-text-field>

						<v-checkbox
							class="mt-1"
							hide-details
							dense
							label="Include shame runs"
						></v-checkbox>
						<v-checkbox
							class="mt-1"
							hide-details
							dense
							label="Include p2w consumables"
						></v-checkbox>
						<v-checkbox
							class="mt-1"
							hide-details
							dense
							label="Include multiheal"
						></v-checkbox>
						<v-checkbox
							class="mt-1"
							hide-details
							dense
							label="Include multitank"
						></v-checkbox>
					</v-card-text>
					<v-card-actions>
						<v-btn block tile> Search </v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="9">
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
	name: "Search",
	components: {},
};
</script>
