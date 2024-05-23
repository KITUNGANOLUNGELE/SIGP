
<template>
  <q-layout view="lHh lpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">Arbre Généalogique</div>
        <div class="text-subtitle1">{{ TodayDate }}</div>
      </div>
      <q-img src="~assets/5047.jpg" class="header-image absolute-top" />
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
        <q-list>
          <!-- <q-item clickable exact v-ripple @click="showForm = true">
            <q-item-section avatar>
              <q-icon name="search" />
            </q-item-section>
            <q-item-section>Rechercher...</q-item-section>
          </q-item> -->

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

      <q-img
        class="absolute-top"
        src="~assets/2151420841.jpg"
        style="height: 192px"
      >
        <div class="absolute-bottom bg-transparent">
          <!-- <q-avatar size="56px" class="q-mb-sm">
            <img src="~assets/blondy.jpg" />
          </q-avatar> -->
          <div class="text-weight-bold">SIGP</div>
          <div>Mon Arbre</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-sm">
        <FamilyTree />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";
import FamilyTree from "src/components/Accueil/FamilyTree.vue";
export default {
  components: { FamilyTree },
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

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.4;
  filter: grayscale(100%);
}
h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #342e37;
}
.box-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 24px;
  margin-top: 36px;
}
.box-info li {
  padding: 24px;
  background: #f9f9f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  grid-gap: 24px;
}
.box-info li .bx {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-info li:nth-child(1) .bx {
  background: #cfe8ff;
  color: #3c91e6;
}
.box-info li:nth-child(2) .bx {
  background: #fff2c6;
  color: #ffce26;
}
.box-info li:nth-child(3) .bx {
  background: #ffe0d3;
  color: #fd7238;
}
.box-info li .text h3 {
  font-size: 24px;
  font-weight: 600;
  color: #342e37;
}
.box-info li .text p {
  color: #342e37;
}
</style>
