<template>
  <v-container fluid class="pt-1">
    <v-row dense align="start" justify="center">
      <v-col cols="12" sm="5" md="4" lg="2" xl="2" class="hidden-sm-and-down">
        <v-subheader>{{
          $vuetify.lang.t("$vuetify.recentTopDPS")
        }}</v-subheader>
        <RecentTopList :entries="mokedList"></RecentTopList>
      </v-col>
      <v-col cols="12" sm="12" md="8" lg="10" xl="8">
        <v-subheader>{{
          $vuetify.lang.t("$vuetify.recentUploads")
        }}</v-subheader>
        <div class="scroller" :class="currentTheme">
          <RecentRunCard
            v-for="(item, index) in mokedRecentRuns"
            :key="index"
            :uploadDate="item.uploadDate"
            :members="item.members"
            :dungeonName="item.dungeonName"
            :bossName="item.bossName"
            :partyDps="item.partyDps"
            :duration="item.duration"
            :isMultiHeal="item.isMultiHeal"
            :isMultiTank="item.isMultiTank"
            :isP2WFood="item.isP2WFood"
          ></RecentRunCard>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RecentRunCard from "@/components/RecentRunCard.vue";
import RecentTopList from "@/components/RecentTopList.vue";

export default {
  data: () => ({
    mokedList: [
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
      {
        name: "Vani",
        class: "archer",
        dps: "696969696969",
      },
    ],
    mokedRecentRuns: [
      {
        dungeonName: "Akasha's Trial",
        bossName: "Akasha",
        partyDps: "500000000",
        duration: "131",
        isMultiTank: true,
        uploadDate: Date.now(),
        members: [
          {
            name: "Leaky",
            class: "slayer",
          },
          {
            name: "Vani",
            class: "archer",
          },
          {
            name: "Beng",
            class: "lancer",
          },
        ],
      },
      {
        dungeonName: "Demokron Factory",
        bossName: "Verno",
        partyDps: "500000000",
        duration: "131",
        isMultiHeal: true,
        uploadDate: Date.now(),
        members: [
          {
            name: "Leaky",
            class: "slayer",
          },
          {
            name: "Vani",
            class: "archer",
          },
          {
            name: "Beng",
            class: "lancer",
          },
        ],
      },
      {
        dungeonName: "Wonderholme",
        bossName: "Bandersnatch",
        partyDps: "500000000",
        duration: "131",
        uploadDate: Date.now(),
        members: [
          {
            name: "Leaky",
            class: "slayer",
          },
          {
            name: "Vani",
            class: "archer",
          },
          {
            name: "Beng",
            class: "lancer",
          },
        ],
      },
      {
        dungeonName: "Manaya's Core",
        bossName: "Shandra Manaya",
        partyDps: "500000000",
        duration: "131",
        uploadDate: Date.now(),
        members: [
          {
            name: "Leaky",
            class: "slayer",
          },
          {
            name: "Vani",
            class: "archer",
          },
          {
            name: "Beng",
            class: "lancer",
          },
        ],
      },
      {
        dungeonName: "Lakan's Prison",
        bossName: "Risalike",
        partyDps: "500000000",
        duration: "131",
        uploadDate: Date.now(),
        members: [
          {
            name: "Leaky",
            class: "slayer",
          },
          {
            name: "Vani",
            class: "archer",
          },
          {
            name: "Beng",
            class: "lancer",
          },
        ],
      },
    ],
  }),
  props: ["region"],
  name: "Home",
  components: { RecentRunCard, RecentTopList },
};
</script>
