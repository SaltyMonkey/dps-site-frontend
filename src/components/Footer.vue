<template>
	<v-footer padless absolute>
		<v-col class="text-center" cols="12">
			{{ new Date().getFullYear() }} — <strong>Test</strong>
		</v-col>
	</v-footer>
</template>

<script>
export default {
	name: "Footer",
};
</script>