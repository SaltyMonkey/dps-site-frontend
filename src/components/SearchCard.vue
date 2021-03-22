<template>
	<v-card class="mb-2 elevation-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select dense :label="$vuetify.lang.t(`$vuetify.searchDungeonStr`)"></v-select>
			<v-select dense :label="$vuetify.lang.t(`$vuetify.searchClassStr`)"></v-select>
			<v-text-field dense :label="$vuetify.lang.t(`$vuetify.searchPlayerStr`)"></v-text-field>

			<v-checkbox
				class="mt-1"
				hide-details
				dense
				:label="$vuetify.lang.t(`$vuetify.searchIncludeShameStr`)"
			></v-checkbox>
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
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMTankStr`)"
			></v-checkbox>
						<v-checkbox
				class="mt-1"
				hide-details
				dense
				:label="$vuetify.lang.t(`$vuetify.searchIncludeMHealStr`)"
			></v-checkbox>
		</v-card-text>
		<v-card-actions>
			<v-btn class="elevation-2" block tile>{{ $vuetify.lang.t(`$vuetify.searchButton`) }}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ["region"],
	name: "SearchCard",
	components: {},
};
</script>
