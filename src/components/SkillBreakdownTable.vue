<template>
  <v-data-table dense
    :headers="headers"
    :items="skillsBreakdown"
    hide-default-footer
	disable-pagination
	disable-filtering
  ></v-data-table>
</template>


<script>
export default {
	props: ["headers", "skillsBreakdown"],
	name: "SkillBreakdownTable",
	components: {},
};
</script>
