<template>
  <div class="video-background">
    <video autoplay muted loop class="bg-video">
      <source
        src="~/assets/Blue White Galaxy Motivational Animation Video (2).mp4"
        type="video/mp4"
      />
    </video>
    <q-layout view="hHh lpR fFf" class="back q-pa-md">
      <nav class="navbar">
        <div class="logo text-white">
          <div class="text-h6">SIGP</div>
        </div>
        <ul class="nav-links">
          <li
            v-for="list in lists"
            :key="list.id"
            clickable
            exact
            :to="list.to"
            @click="handleClick(list.id)"
          >
            <router-link :to="list.to"
              ><a>{{ list.label }}</a></router-link
            >
          </li>
        </ul>
        <div class="hider">
          <q-btn outline style="color: white" label="Donation" />
          <q-icon color="white" name="menu" size="2em">
            <q-menu transition-show="jump-down" transition-hide="jump-down">
              <q-list>
                <q-item
                  class="itema"
                  v-for="item in items"
                  :key="item.id"
                  @click="handleClick(item.id)"
                  exact
                  :to="item.to"
                  clickable
                >
                  <q-item-section> {{ item.label }} </q-item-section>
                </q-item>

                <q-item exact clickable>
                  <q-btn outline style="color: black" label="Donation" />
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>
      </nav>
      <br />
      <br />
      <q-page-container>
        <div
          class="q-pt-md blondy q-pa-md"
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            align-items: flex-start;
            height: 50vh;
          "
        >
          <p class="text-left text-white text-h4 ringo" id="souligne">
            SYSTEME D'IDENTIFICATION PERSONNEL
          </p>

          <p class="text-left text-white text-h6">
            Construction de son propre arbre généalogique ascendant et
            descendant
          </p>
          <q-btn outline style="color: white" label="A Propos" />
        </div>
      </q-page-container>
    </q-layout>
  </div>
  <div>
    <AboutStage />
  </div>
  <!-- Dialogue pour la connexion/LOGIN -->
  <q-dialog v-model="alert">
    <FormLogin />
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import AboutStage from "src/components/Accueil/AboutStage.vue";
import FormLogin from "src/components/Accueil/FormLogin.vue";

// Importez les composants Quasar nécessaires ici
import {
  QBtn,
  QIcon,
  QMenu,
  QItem,
  QItemSection,
  QList,
  QDialog,
} from "quasar";

export default {
  components: {
    AboutStage,
    FormLogin,
    QBtn,
    QIcon,
    QMenu,
    QItem,
    QItemSection,
    QList,
    QDialog,
  },
  data() {
    return {
      alert: ref(false),
      lists: [
        {
          id: 0,
          label: "Eleza",
          to: "",
        },
        {
          id: 1,
          label: "Qui suis-Je?",
          to: "",
        },
        {
          id: 2,
          label: "Générations",
          to: "/Generation",
        },
        {
          id: 3,
          label: "Fumbo",
          to: "",
        },
        {
          id: 4,
          label: "Partenaire",
          to: "",
        },
      ],
      items: [
        {
          id: 0,
          label: "Eleza",
          to: "",
        },
        {
          id: 1,
          label: "Qui suis-je?",
          to: "",
        },
        {
          id: 2,
          label: "Générations",
          to: "/Generation",
        },
        {
          id: 3,
          label: "Fumbo",
          to: "",
        },
        {
          id: 4,
          label: "Partenaire",
          to: "",
        },
      ],
    };
  },
  methods: {
    handleClick(id) {
      if (id == 1) {
        this.alert = true;
      }
    },
  },
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .q-pa-md {
    align-items: center;
  }

  .text-h4 {
    font-size: 20px;
  }
  .text-h6 {
    font-size: 14px;
  }

  q-btn {
    width: 90%;
  }
  .blondy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: flex-start;
    height: 50vh;
  }
}
</style>
