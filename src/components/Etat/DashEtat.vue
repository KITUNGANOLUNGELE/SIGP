<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Dashboard Etat-Civil</h1>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el label="Etat-Civil" icon="home" />
      </q-breadcrumbs>
    </div>
    <ul class="box-info q-pa-md">
      <li
        v-for="list in lists"
        :key="list.id"
        class="aos-item"
        data-aos="zoom-in-right"
        @click="handleClick(list)"
      >
        <q-icon class="bx" :name="list.icon" />
        <span class="text">
          <h3>{{ list.title }}</h3>
          <p>{{ list.subtitle }}</p>
        </span>
      </li>

      <!-- DEBUT Modal Formulaire Ajout Personne -->

      <q-dialog v-model="seamless" seamless position="top">
        <q-card style="width: auto">
          <q-linear-progress :value="0.6" color="black" />
          <div class="text-right">
            <q-btn flat dense icon="close" v-close-popup />
          </div>
          <!-- STEPPER -->
          <FormPer />
        </q-card>
      </q-dialog>
      <!-- Fin Modal Formulaire Ajout Personne -->

      <li @click="open('top')" class="aos-item" data-aos="zoom-in-left">
        <q-icon class="bx" name="👰" />
        <span class="text">
          <h3>Enregistrer un Mariage</h3>
          <p>Ajouts</p>
        </span>
        <q-dialog v-model="dialog" :position="position">
          <q-card style="width: 350px">
            <q-linear-progress :value="0.6" color="black" />
            <q-form @submit="submitForm">
              <div class="q-pa-md">
                <q-select
                  v-model="nommarie"
                  :options="options"
                  label="Nom du Marié"
                  dense
                  :rules="[(val) => !!val || 'Champ requis']"
                />
                <q-select
                  v-model="nommariee"
                  :options="options"
                  label="Nom de la Mariée"
                  dense
                  :rules="[(val) => !!val || 'Champ requis']"
                />
                <q-input
                  dense
                  v-model="date_mariage"
                  label="Date du Mariage"
                  type="date"
                  :rules="[(val) => !!val || 'Champ requis']"
                />
                <q-select
                  v-model="nommariee"
                  :options="options"
                  label="Nom de la du Bourgoumestre"
                  dense
                  :rules="[(val) => !!val || 'Champ requis']"
                />
                <q-btn
                  square
                  color="dark"
                  type="submit"
                  rounded
                  size="md"
                  label="Enregistrer"
                  no-caps
                  class="full-width"
                ></q-btn>
              </div>
            </q-form>
          </q-card>
        </q-dialog>
      </li>
    </ul>
    <SearchFiltering />
  </q-layout>
</template>

<script>
import { ref } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import FormPer from "components/Etat/FormPer.vue";
import SearchFiltering from "src/components/Ajouts/SearchFiltering.vue";
export default {
  components: { FormPer, SearchFiltering },
  data() {
    const dialog = ref(false);
    const position = ref("top");

    return {
      lists: [
        {
          id: 1,
          title: "02",
          subtitle: "Données Ajoutées",
          icon: "fa-solid fa-database",
        },
        {
          id: 2,
          title: "Enregistrer Personne",
          subtitle: "Formulaire d'Ajout",
          icon: "🧑‍🍼",
        },
      ],
      nom: "",
      postnom: "",
      prenom: "",
      date_naissance: null,
      sexe: "",
      groupement: "",
      avenue: "",
      num_maison: "",
      options: ["Masculin", "Féminin"],
      dialog,
      position,
      userType: "",
      userTypes: ["Cat_1", "Cat_2", "...etc"],
      step: ref(1),
      seamless: ref(false),
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
      search: "",
    };
  },
  mounted() {
    AOS.init();
  },
  computed: {
    isNextButtonDisabled() {
      return !(
        this.nom &&
        this.postnom &&
        this.prenom &&
        this.date_naissance &&
        this.sexe &&
        this.groupement &&
        this.avenue &&
        this.num_maison
      );
    },
  },

  methods: {
    handleClick(list) {
      if (list.id === 2) {
        this.seamless = true;
        this.openDialog("top");
      } else if (list.id === 3) {
        this.someOtherFunction();
      }
    },
    openDialog(position) {
      console.log("Ouverture en position :", position);
    },
    someOtherFunction() {
      console.log("Liste ID est égal à 2");
    },
  },
};
</script>

<style lang="scss">
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
