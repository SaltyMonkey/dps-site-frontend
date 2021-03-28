<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light"
			>Floormat time:</v-card-title
		>
		<v-container fluid>
			<v-row v-for="(item, index) in dt" :key="index">
				<v-col class="pa-1">
					<v-progress-linear
						color="grey"
						height="25"
						:value="item.floorTimePercent"
					>
						<template v-slot:default="{ value }">
							<v-icon
								height="20"
								width="20"
								max-height="16"
								max-width="16"
								class="ml-3"
								>$class-{{ formatStringLowerCase(item.playerClass) }}</v-icon
							>
							<v-subheader class="mr-auto text--primary">{{
								item.playerName
							}}</v-subheader>
							<v-subheader class="pt-1 text--primary text-right"
								>{{ formatStringAsTimeSpan(item.playerDeathDuration) }}
								({{ item.deaths }})</v-subheader
							>
							<v-subheader class="pt-1 text--primary text-right"
								>{{ value }}%</v-subheader
							>
						</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["runDuration", "members"],
	name: "PlayersFloormateCard",
	components: {},
	data: () => ({}),
	computed: {
		dt() {
			let data = [];
			const time = Number(this.fightDuration);
			this.members.forEach((member) => {
				data.push({
					playerName: member.playerName,
					playerClass: member.playerClass,
					playerDeathDuration: member.playerDeathDuration,
					floorTimePercent: (Number(member.playerDeathDuration) * 100) / time,
					deaths: member.playerDeaths,
				});
			});
			return data;
		}
	}
};
</script>
