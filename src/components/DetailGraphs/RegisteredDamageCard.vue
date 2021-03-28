<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			Registered damage:
		</v-card-title>
		<v-container fluid>
			<v-row>
				<v-col class="pa-1">
					<v-progress-linear height="22" color="green" :value=50>
						<template v-slot:default="{ value }">
								<v-icon
									left
									class="ml-3"
								>$boss</v-icon>
								<v-subheader class="mr-auto text--primary">Dmg</v-subheader>
								<v-subheader class="text--primary text-right">{{ value }}%</v-subheader>
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
