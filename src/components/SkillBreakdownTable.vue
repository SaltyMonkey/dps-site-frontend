<template>
  <v-data-table dense class="elevation-2"
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
