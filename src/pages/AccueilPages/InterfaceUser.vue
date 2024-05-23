
<template>
  <q-layout view="lHh lpR fFf visible">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Interface Utilisateur</div>
        <div class="text-subtitle1">{{ TodayDate }}</div>
      </div>
      <q-img src="~assets/5047.jpg" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
      visible
    >
      <q-scroll-area
        style="
          height: calc(100% - 192px);
          margin-top: 192px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <div class="q-pa-md">
            <q-expansion-item
              v-model="expanded"
              icon="search"
              label="Rechercher"
            >
              <q-card>
                <q-card-section>
                  <q-form class="q-pa-s">
                    <!-- Votre formulaire ici -->
                    <q-input
                      square
                      label="Nom"
                      dense
                      :rules="[(val) => !!val || 'Champ requis']"
                    />
                    <q-input
                      label="postnom"
                      dense
                      :rules="[(val) => !!val || 'Champ requis']"
                    />
                    <q-input
                      label="prenom"
                      dense
                      :rules="[(val) => !!val || 'Champ requis']"
                    />
                    <q-input
                      label="Lieu Naissance"
                      dense
                      :rules="[(val) => !!val || 'Champ requis']"
                    />
                    <q-input
                      label="date naissance"
                      dense
                      :rules="[(val) => !!val || 'Champ requis']"
                    />
                    <q-input
                      label="Groupement"
                      dense
                      :rules="[(val) => !!val || 'Champ requis']"
                    />
                    <br />
                    <q-btn label="Rechercher" color="black" dense square />
                  </q-form>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
          <q-separator />
          <q-item to="/User" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="fa-solid fa-person" />
            </q-item-section>

            <q-item-section>Ma Personne</q-item-section>
          </q-item>
          <q-item clickable to="/TreeUser" exact v-ripple>
            <q-item-section avatar>
              <q-icon name="fa-solid fa-tree" />
            </q-item-section>

            <q-item-section>Arbre</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="~assets/36100.jpg" style="height: 192px">
        <div class="absolute-bottom bg-transparent">
          <div class="text-weight-bold text-black">SIGP</div>
          <div class="text-black">Ma Personne</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <DashboardUtilisateur />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";
import DashboardUtilisateur from "src/components/Accueil/DashboardUtilisateur.vue";
export default {
  components: { DashboardUtilisateur },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      expanded: ref(false),
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
