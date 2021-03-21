<template>
	<v-card>
		<v-container>
			<v-row v-for="(item, index) in debuffs" :key="index">
				<v-col class="pr-1">
					<h3>{{ item.key }}</h3>
				</v-col>
				<v-col cols="11" class="pl-1">
					<v-progress-linear
						color="green"
						height="35"
						:value="item.value"
						striped
					></v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["debuffs"],
	name: "BossDebuffsCard",
	components: {},
};
</script>
