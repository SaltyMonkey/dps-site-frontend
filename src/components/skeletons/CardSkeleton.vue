<template>
	<div>
		<v-skeleton-loader v-for="(item, index) in amount"
			class="mb-2 mr-2 elevation-3"
			type="card"
			:key=index
		></v-skeleton-loader>
	</div>
</template>

<script>
export default {
	props: ["amount"],
	name: "CardSkeleton",
	components: {},
};
</script>
