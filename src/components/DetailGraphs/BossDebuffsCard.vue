<template>
	<v-card class="elevation-3 mb-2" tile outlined>
		<v-card-title class="font-weight-light pa-2 text--secondary text-body-2">
			{{ $vuetify.lang.t(`$vuetify.debuffsUptime`) }}
		</v-card-title>
		<v-container fluid>
			<v-row v-for="(item, index) in parsedDebuffsData" :key="index">
				<v-col class="pa-1">
					<v-progress-linear color="#AB47BC" height="28" :value="item.uptimePercent">
							<template v-slot:default="{ value }">
								<v-tooltip max-width=325 right>
									<template v-slot:activator="{ on, attrs }">
										<v-img  v-bind="attrs" v-on="on" class="mr-auto" :src="`/static/icons/${item.icon}.png`" min-width="28" min-height="28" max-width="28" max-height="28"></v-img>
									</template>	
									<span >{{item.name}}</span>
									<br>
									<br>
									<span>{{item.desc}}</span>
								</v-tooltip>
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
	props: {
		abnormalsData: Object,
		debuffDetail: Array
	},
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
