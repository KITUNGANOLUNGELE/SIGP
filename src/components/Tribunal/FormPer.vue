<template>
          <!-- STEPPER -->
          <q-stepper
                dense
                v-model="step"
                ref="stepper"
                color="primary"
                header-nav
                animated
              >
                <q-step :name="1" :error="step < 3" :done="step > 1">
                  <div class="text-weight-bold text-center text-uppercase">
                    Information Père
                  </div>
  
                  <ul class="box-info">
                    <li class="aos-item" data-aos="zoom-in-right">
                      <div class="text-weight-bold">Information Père</div>
                      <q-form>
                        <q-input
                          dense
                          v-model="nom_p"
                          label="Nom du Père"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="postnom_p"
                          label="Postnom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="prenom_p"
                          label="Prenom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="l_naiss_p"
                          label="Lieu de naissance"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="d_naiss_p"
                          label="Date de Naissance"
                          type="date"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                           <q-select
                            dense
                            v-model="groupement_p"
                            use-input
                            input-debounce="0"
                            label="Nom du groupement"
                            :options="options_groupement"
                            @filter="filterFn"
                            :rules="[(val) => !!val || 'Champ requis']"
                            style="width: 100%"
                            behavior="menu"
                          />
                        <q-input
                          dense
                          v-model="pays_p"
                          label="Pays de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="ville_p"
                          label="Ville de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="commune_p"
                          label="Commune de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="quartier_p"
                          label="Quartier de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="avenue_p"
                          label="Avenue"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="num_maison_p"
                          label="Numero Maison"
                          type="number"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                      </q-form>
                    </li>
                  </ul>
                  <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 2;
                    }
                  "
                  color="black"
                  class="btn"
                  label="Continuer"
                />
                <q-btn
                  flat
                  @click="step = 1"
                  color="black"
                  label="Retour"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
                </q-step>
  
                <q-step :name="2" icon="create_new_folder" :done="step > 2">
                  <div class="text-weight-bold text-center text-uppercase">
                    Information Mère
                  </div>
                  <ul class="box-info">
                    <li class="aos-item" data-aos="zoom-in-right">
                      <div class="text-weight-bold">Information Mère</div>
                      <q-form>
                        <q-input
                          dense
                          v-model="nom_m"
                          label="Nom de la mère"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="postnom_m"
                          label="Postnom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="prenom_m"
                          label="Prenom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="l_naiss_m"
                          label="Lieu de naissance"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="d_naiss_m"
                          label="Date de Naissance"
                          type="date"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="groupement_m"
                          use-input
                            input-debounce="0"
                            label="Nom du groupement"
                            :options="options_groupement"
                            @filter="filterFn"
                            :rules="[(val) => !!val || 'Champ requis']"
                            style="width: 100%"
                            behavior="menu"
                        />
                        <q-input
                          dense
                          v-model="pays_m"
                          label="Pays de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="ville_m"
                          label="Ville de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="commune_m"
                          label="Commune de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="quartier_m"
                          label="Quartier de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="avenue_m"
                          label="Avenue"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="num_maison_m"
                          label="Numero Maison"
                          type="number"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                      </q-form>
                    </li>
                  </ul>
                  <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 3;
                    }
                  "
                  color="black"
                  class="btn"
                  label="Continuer"
                />
                <q-btn
                  flat
                  @click="step = 1"
                  color="black"
                  label="Retour"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
                </q-step>

                <q-step :name="3" icon="create_new_folder" :done="step > 2">
                  <div class="text-weight-bold text-center text-uppercase">
                    Information Juge
                  </div>
                  <ul class="box-info">
                    <li class="aos-item" data-aos="zoom-in-right">
                      <div class="text-weight-bold">Information sur le Juge</div>
                      <q-form>
                        <q-input
                          dense
                          v-model="nom_m"
                          label="Nom de la mère"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="postnom_m"
                          label="Postnom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="prenom_m"
                          label="Prenom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="l_naiss_m"
                          label="Lieu de naissance"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="d_naiss_m"
                          label="Date de Naissance"
                          type="date"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="groupement_m"
                          use-input
                            input-debounce="0"
                            label="Nom du groupement"
                            :options="options_groupement"
                            @filter="filterFn"
                            :rules="[(val) => !!val || 'Champ requis']"
                            style="width: 100%"
                            behavior="menu"
                        />
                        <q-input
                          dense
                          v-model="pays_m"
                          label="Pays de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="ville_m"
                          label="Ville de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="commune_m"
                          label="Commune de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="quartier_m"
                          label="Quartier de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="avenue_m"
                          label="Avenue"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="num_maison_m"
                          label="Numero Maison"
                          type="number"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                      </q-form>
                    </li>
                  </ul>
                  <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 4;
                    }
                  "
                  color="black"
                  class="btn"
                  label="Continuer"
                />
                <q-btn
                  flat
                  @click="step = 2"
                  color="black"
                  label="Retour"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
                </q-step>
                <q-step :name="4" icon="create_new_folder" :done="step > 2">
                  <div class="text-weight-bold text-center text-uppercase">
                    Information Avocat
                  </div>
                  <ul class="box-info">
                    <li class="aos-item" data-aos="zoom-in-right">
                      <div class="text-weight-bold">Information sur l'Avocat</div>
                      <q-form>
                        <q-input
                          dense
                          v-model="nom_m"
                          label="Nom de la mère"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="postnom_m"
                          label="Postnom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="prenom_m"
                          label="Prenom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="l_naiss_m"
                          label="Lieu de naissance"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="d_naiss_m"
                          label="Date de Naissance"
                          type="date"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="groupement_m"
                          use-input
                            input-debounce="0"
                            label="Nom du groupement"
                            :options="options_groupement"
                            @filter="filterFn"
                            :rules="[(val) => !!val || 'Champ requis']"
                            style="width: 100%"
                            behavior="menu"
                        />
                        <q-input
                          dense
                          v-model="pays_m"
                          label="Pays de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="ville_m"
                          label="Ville de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="commune_m"
                          label="Commune de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="quartier_m"
                          label="Quartier de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="avenue_m"
                          label="Avenue"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="num_maison_m"
                          label="Numero Maison"
                          type="number"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                      </q-form>
                    </li>
                  </ul>
                  <q-stepper-navigation>
                <q-btn
                  @click="
                    () => {
                      step = 5;
                    }
                  "
                  color="black"
                  class="btn"
                  label="Continuer"
                />
                <q-btn
                  flat
                  @click="step = 3"
                  color="black"
                  label="Retour"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
                </q-step>

                <q-step :name="5" icon="add_comment">
                  <div class="text-weight-bold text-center text-uppercase">
                    Information su le Crime
                  </div>
  
                  <ul class="box-info">
                    <li class="aos-item" data-aos="zoom-in-right">
                      <div class="text-weight-bold">Information Crime</div>
                      <q-form>
                            <q-input
                            dense
                            v-model="id_personne"
                            label="Nom de l'accusé"
                            type="text"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="crime"
                            label="Crime"
                            type="text"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="verdicte"
                            label="Verdicte"
                            type="text"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-file
                            dense
                            v-model="photo_accuse"
                            label="Photo de l'Accusé"
                            type="file"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="date_verdicte"
                            label="Date du Verdicte"
                            type="date"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="date_debut_proces"
                            label="Date Débu procès"
                            type="date"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="date_fin_proces"
                            label="Date Fin procès"
                            type="date"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="date_condamnation"
                            label="Date de la Condamnation"
                            type="date"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="peine"
                            label="Peine"
                            type="text"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                            <q-input
                            dense
                            v-model="lieu_incarseration"
                            label="Lieu incarseration"
                            type="text"
                            :rules="[(val) => !!val || 'Champ requis']"
                            />
                        </q-form>
                    </li>
                  </ul>
                    <q-stepper-navigation>
                      <q-btn
                        square
                        @click="submitForm"
                        color="primary"
                        label="Enregistrer"
                        :disable="isNextButtonDisabled"
                      />
  
                      <q-btn
                        square
                        v-if="step > 1"
                        flat
                        color="primary"
                        @click="$refs.stepper.previous()"
                        label="Back"
                        class="q-ml-sm"
                      />
                    </q-stepper-navigation>
                </q-step>
              </q-stepper>
  <!-- FIN STEPPER -->
</template>
<script>
import { ref } from "vue";
// Route vers le formulaire de Création Compte sous administrateur
// Route vers les Animation On ScrollBar (AOS)
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
      date_add: "",
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
      users: [
        {
          id: 1,
          designation: "designation",
          role: "role",
        },
      ],
      columns: [
        {
          name: "designation",
          label: "Designation",
          align: "left",
          field: "designation",
        },
        { name: "role", label: "Rôle", align: "left", field: "role" },
        { name: "action", label: "Action", align: "left" },
      ],
      showModal: false,
      editedUser: {
        id: null,
        designation: "",
        role: "",
      },
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
        // Ajouter la logique pour ouvrir quelque chose, ici une fonction d'exemple
        this.openDialog("top");
        // Ajoutez d'autres logiques à exécuter lors du clic ici si nécessaire
      } else if (list.id === 3) {
        // Logique spécifique lorsque list.id === 2
        // Par exemple, appeler une autre fonction ou exécuter d'autres actions
        this.someOtherFunction();
      }
    },
    openDialog(position) {
      // Logique pour ouvrir quelque chose, ici une fonction d'exemple
      console.log("Ouverture en position :", position);
    },
    someOtherFunction() {
      // Logique spécifique lorsque list.id === 2
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
