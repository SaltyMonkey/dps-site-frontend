<template>
	<v-card class="mb-2 elevation-2" tile outlined>
		<v-card-text class="pb-1">
			<v-select dense label="Dungeon"></v-select>
			<v-select dense label="Class"></v-select>
			<v-select dense label="Tank type"></v-select>
			<v-select dense label="Healer type"></v-select>
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
			<v-btn class="elevation-2" block tile> Search </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	props: ["region"],
	name: "SearchTopCard",
	components: {},
};
</script>
