<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 text--secondary text-body-2 font-weight-light">
			Debuffs uptimes:
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in parsedDebuffsData" :key="index">
				<v-col class="pa-1">
					<v-progress-linear color="#455A64" height="32" :value="item.uptimePercent">
							<template v-slot:default="{ value }">
								<v-tooltip max-width=325 right>
									<template v-slot:activator="{ on, attrs }">
										<v-img  v-bind="attrs" v-on="on" class="mr-auto" :src="`/static/icons/${item.icon}.png`" max-width="32" max-height="32"></v-img>
									</template>	
									<span >{{item.name}}</span>
									<br>
									<br>
									<span>{{item.desc}}</span>
								</v-tooltip>
								<v-subheader class="text-right text--primary">{{ value }}%</v-subheader>
							</template>
					</v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ["abnormalsData", "debuffDetail"],
	name: "BossDebuffsCard",
	components: {},
	computed: {
		parsedDebuffsData() {
			let parsed = [];
			this.debuffDetail.forEach(debuff => {
				const id = debuff[0];
				const uptime = debuff[1][0][1];
				const abnRef = this.abnormalsData[id];

				if(abnRef) {
					parsed.push({
						name: abnRef.name,
						desc: abnRef.desc,
						icon: abnRef.icon,
						uptimePercent: uptime
					});
				}
			});
			return parsed;
		}
	}
};
</script>
