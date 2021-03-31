<template>
	<v-card class="mb-2 elevation-3" tile outlined>
		<v-card-title class="pa-2 pb-3 text--secondary text-body-2 font-weight-light">
			{{ $vuetify.lang.t(`$vuetify.buffsUptime`) }}
		</v-card-title>
		<v-container fluid>
			<v-row>
				<template v-for="(item, index) in buffDetails">
					<template v-if="isSimpleBuff(item[1])">
						<v-tooltip bottom :key="index" max-width=325>
							<template v-slot:activator="{ on, attrs }">
								<BuffCard v-bind="attrs" v-on="on"  :iconName="getIcon(item[0])" :uptime="item[1][0][1]"></BuffCard>
							</template>
							<span>{{ getName(item[0]) }}</span>
							<br>
							<br>
							<span>{{ getDescription(item[0]) }}</span>
						</v-tooltip>
					</template>
					<template v-else>
						<v-menu :key="index" offset-y>
							<template v-slot:activator="{ on: menu, attrs }">
								<v-tooltip bottom max-width=325>
									<template v-slot:activator="{ on: tooltip }">
											<v-badge offset-x="50" offset-y="16" tile left overlap :content="item[1].length-1">
												<BuffCard v-bind="attrs" v-on="{ ...tooltip, ...menu }" :iconName="getIcon(item[0])" :uptime="item[1][0][1]"></BuffCard>
											</v-badge>
									</template>
									<span>{{ getName(item[0]) }}</span>
									<br>
									<br>
									<span>{{ getDescription(item[0]) }}</span>
								</v-tooltip>
							</template>
							<v-row style="border: 4px double grey;" no-gutters class="elevation--3">
								<template v-for="(stackItem, i) in item[1]">
									<v-tooltip v-if="i > 0" bottom max-width=325 :key="i">
										<template v-slot:activator="{ on }">
											<BuffCard :overlayText="stackItem[0]" v-on="on" :iconName="getIcon(item[0])" :uptime="stackItem[1]"></BuffCard>
										</template>
										<span>{{ getName(item[0])}} ({{stackItem[0]}})</span>
									</v-tooltip>
								</template>
							</v-row>
						</v-menu>
					</template>
				</template>
			</v-row>
		</v-container>
	</v-card>
</template>

<script>
import BuffCard from "@/components/Details/BuffCard.vue";

export default {
	props: ["abnormalsData", "buffDetails"],
	name: "BuffUptimeGroup",
	components: { BuffCard },
	data: () => ({}),
	methods: {
		getIcon(id) {
			let ret = undefined;
			if (this.abnormalsData[id]) {
				ret = this.abnormalsData[id].icon;
			}
			if(!ret) console.log("MissingAbnormie icon", id);
			return ret || "";
		},
		getDescription(id) {
			let ret = undefined;
			if (this.abnormalsData[id]) {
				ret = this.abnormalsData[id].desc;
			}
			if(!ret) console.log("MissingAbnormie desc", id);
			return ret || "";
		},
		getName(id) {
			let ret = undefined;
			if (this.abnormalsData[id]) {
				return this.abnormalsData[id].name;
			}
			if(!ret) console.log("MissingAbnormie name", id);
			return ret || id;
		},
		isSimpleBuff(item) {
			return Array.isArray(item) && item.length === 1;
		}
	},
};
</script>
