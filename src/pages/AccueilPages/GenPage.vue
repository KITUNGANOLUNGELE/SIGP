
<template>
  <q-layout view="lHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Générations</div>
        <div class="text-subtitle1">{{ TodayDate }}</div>
      </div>
      <q-img src="~assets/ww.jpg" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item to="/Generation" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="fa-solid fa-earth-africa" />
            </q-item-section>

            <q-item-section> Générations </q-item-section>
          </q-item>
          <q-item clickable to="/Aide" exact v-ripple>
            <q-item-section avatar>
              <q-icon name="fa-solid fa-question" />
            </q-item-section>

            <q-item-section> Aide </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="~assets/ww.jpg" style="height: 192px">
        <div class="absolute-bottom bg-transparent">
          <!-- <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/blondy.jpg" />
          </q-avatar> -->
          <div class="text-weight-bold">SIGP</div>
          <div>Génération</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <GenerationComp />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";
import GenerationComp from "src/components/Accueil/GenerationComp.vue";
export default {
  components: { GenerationComp },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    TodayDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    },
  },
};
</script>
<style scss>
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.4;
  filter: grayscale(100%);
}
</style>
