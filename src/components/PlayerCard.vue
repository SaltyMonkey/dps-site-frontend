<template>
	<v-container fluid>
		<v-row dense align="start" justify="center">
			<v-col cols="12">
				<v-card color="#385F73" dark>
					<v-card-title class="headline"> Unlimited music now </v-card-title>
					<v-card-actions>
						<v-btn text> Run</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: ["icon", "name"],
	name: "playerCard",
	components: {},
};
</script>
