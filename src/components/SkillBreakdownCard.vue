<template>
	<v-card class="mb-2 mr-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light"
			>Skills breakdown:</v-card-title
		>
		<v-container fluid>
			<v-row>
				<v-data-table
					dense
					class="elevation-2"
					:headers="headers"
					:items="skillsBreakdown"
					hide-default-footer
					disable-pagination
					disable-filtering
				></v-data-table>
			</v-row>
		</v-container>
	</v-card>
</template>


<script>
export default {
	props: ["headers", "skillsBreakdown"],
	name: "SkillBreakdownCard",
	components: {},
};
</script>
