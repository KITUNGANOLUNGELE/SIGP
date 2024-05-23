<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-pa-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el label="DGM" icon="home" />
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
          <h3>{{ list.title }} <sup>ème</sup></h3>
          <p>{{ list.subtitle }}</p>
        </span>
      </li>

      <!-- Fin Modal Formulaire Ajout Personne -->

      <li @click="open('top')" class="aos-item" data-aos="zoom-in-left">
        <q-icon class="bx" name="fa-solid fa-circle-info" />
        <span class="text"> <h3>Completer mes Informations</h3></span>
        <q-dialog v-model="dialog" :position="position">
          <q-card style="width: 350px">
            <q-linear-progress :value="0.6" color="black" />
            <q-form @submit="submitForm">
              <div class="q-pa-md">
                <q-input
                  dense
                  v-model="nom_grand_pere"
                  label="Nom grand père"
                  type="text"
                  :rules="[(val) => !!val || 'Champ requis']"
                />
                <q-input
                  dense
                  v-model="grand_mere"
                  label="Nom Grand Mère"
                  type="text"
                  :rules="[(val) => !!val || 'Champ requis']"
                />

                <!-- <q-select
                  v-model="nommariee"
                  :options="options"
                  label="Nom du Bourgoumestre"
                  dense
                  :rules="[(val) => !!val || 'Champ requis']"
                /> -->
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
    <ul class="box-info q-pa-md">
      <li>
        <p class="text-h4 text-bold">Informations Personnel</p>
      </li>
    </ul>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
export default {
  components: {},
  data() {
    const dialog = ref(false);
    const position = ref("top");

    return {
      lists: [
        {
          id: 1,
          title: "8",
          subtitle: "Generations",
          icon: "fa-solid fa-globe",
        },
      ],
      lieu_provenance: "",
      lieu_depart: "",
      motif_deplacement: "",
      montant_paye: "",
      scan_piece_identite: "",
      numero_piece_identite: "",
      devise: "",
      sejour: "",
      dialog,
      position,
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
