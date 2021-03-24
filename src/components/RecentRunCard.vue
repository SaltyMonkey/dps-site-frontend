<template>
  <v-card class="mb-2 mr-2 elevation-3" tile outlined>
    <v-card-title class="pa-2 text--primary">
      <div>
        <v-img
          src="@/assets/svgs/boss.svg"
          class="mr-2"
          width="36"
          height="36"
        ></v-img>
      </div>
      <span class="mr-2"> {{ bossName }}</span>
      <v-divider vertical></v-divider>
      <span class="mx-2 text--secondary font-weight-light">
        {{ dungeonName }}</span
      >
      <v-divider vertical class="mr-2"></v-divider>
      <v-chip v-if="isMultiHeal" v-model="isMultiHeal" small class="mr-2" color="green" outlined>
        {{ $vuetify.lang.t("$vuetify.multiHeal") }}
      </v-chip>
      <v-chip v-if="isMultiTank" v-model="isMultiTank" small class="mr-2" color="blue" outlined>
        {{ $vuetify.lang.t("$vuetify.multiTank") }}
      </v-chip>
      <v-chip v-if="isP2WFood" v-model="isP2WFood" color="orange" small outlined>
        {{ $vuetify.lang.t("$vuetify.p2wFood") }}
      </v-chip>

      <!-- <v-btn small tile icon>
				<v-icon :color="colorClassFromBool(isMultiTank)">mdi-account-multiple</v-icon>
			</v-btn>
			<v-btn small tile icon>
				<v-icon :color="colorClassFromBool(isMultiHeal)">mdi-heart-multiple</v-icon>
			</v-btn>
			<v-btn small tile icon>
				<v-icon  :color="colorClassFromBool(isP2WFood)">mdi-food-steak</v-icon>
			</v-btn> -->
    </v-card-title>
    <v-divider></v-divider>
    <v-container class="pa-1 pl-3" fluid>
      <p class="subtitle-2 mb-1">
        {{ $vuetify.lang.t("$vuetify.partyDps") }}
        {{ formatStringAsDps(partyDps) }}
      </p>
      <p class="subtitle-2 mb-1">
        {{ $vuetify.lang.t("$vuetify.duration") }}
        {{ formatStringAsTimeSpan(duration) }}
      </p>
      <p class="subtitle-2 mb-1">
        {{ $vuetify.lang.t("$vuetify.uploadTime") }} <timeago :datetime="uploadDate" :locale="$vuetify.lang.current"></timeago>
      </p>
    </v-container>
    <v-card-actions>
      <v-chip
        small
        label
        class="mr-2 px-2"
        v-for="(item, index) in members"
        :key="index"
        ><v-img
          small
          width="18"
          height="18"
          :src="require(`../assets/svgs/classes/${item.class}-merged.svg`)"
          :to="`${item.link}`"
          :class="`${currentTheme}-img`"
          class="mr-2"
        ></v-img>
        {{ item.name }}
      </v-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [
    "dungeonName",
    "bossName",
    "isP2WFood",
    "isMultiTank",
    "isMultiHeal",
    "partyDps",
    "duration",
    "uploadDate",
    "members",
  ],
  name: "RecentRunCard",
  components: {},
  methods: {
    colorFoodFromBool(bool) {
      return bool ? "orange" : "grey darken-1";
    },
    colorMultiTankFromBool(bool) {
      return bool ? "blue" : "grey darken-1";
    },
    colorMultiHealFromBool(bool) {
      return bool ? "green" : "grey darken-1";
    }
  },
};
</script>
