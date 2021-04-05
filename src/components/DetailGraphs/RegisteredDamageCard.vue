<template>
	<v-card class="elevation-3 mb-2" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.registeredDamage`) }}
		</v-card-title>
		<v-container fluid>
			<v-row>
				<v-col class="pa-1">
					<v-progress-linear height="25" color="#2E7D32" :value=50>
						<template v-slot:default="{ value }">
								<v-subheader class="text--secondary text-right">{{ value }}%</v-subheader>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["damageDone"],
	name: "RegisteredDamageCard",
	components: {}
};
</script>
