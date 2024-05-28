<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Dashboard Hôpital</h1>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el label="Accueil" icon="home" />
      </q-breadcrumbs>
    </div>
    <!-- Début Cards -->
    <ul class="box-info q-pa-md">
      <li class="aos-item" data-aos="zoom-in-right">
        <q-icon class="bx" name="supervisor_account" />
        <span class="text">
          <p>Nouveaux nés</p>
        </span>
      </li>
      <li class="aos-item" data-aos="zoom-in">
        <q-icon @click="seamless = true" class="bx" name="group" />
        <router-link to="/Dper" class="text-black">
          <span class="text">
            <h3>Nouvelle naissance</h3>
            <p>Ajouts</p>
          </span>
        </router-link>
        <!-- DEBUT Modal Formulaire Ajout Personne -->

        <q-dialog v-model="seamless" seamless position="top">
          <q-card style="width: auto">
            <q-linear-progress :value="0.6" color="black" />
            <div class="text-right">
              <q-btn flat dense icon="close" v-close-popup />
            </div>
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
                    <q-form>
                      <div class="sudb">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="edit" color="primary" /> Identification
                        </h5>
                        <q-input
                          dense
                          v-model="nom_p"
                          label="Nom du Père"
                          type="text"
                          @keydown="search"
                          @keyup="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="man" color="primary" />
                          </template>
                        </q-input>
                        <q-input
                          dense
                          v-model="postnom_p"
                          label="Postnom"
                          type="text"
                          @keydown="search"
                          @keyup="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="man" color="primary" />
                          </template>
                        </q-input>
                        <q-input
                          dense
                          v-model="prenom_p"
                          label="Prenom"
                          type="text"
                          @keydown="search"
                          @keyup="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="man" color="primary" />
                          </template>
                        </q-input>
                        <q-select
                          dense
                          v-model="l_naiss_p"
                          label="Lieu de naissance"
                          type="text"
                          behavior="menu"
                          options=""
                          @keydown="search"
                          @keyup="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="pin_drop" color="primary" />
                          </template>
                        </q-select>
                        <q-input
                          dense
                          v-model="d_naiss_p"
                          label="Date de Naissance"
                          type="date"
                          @change="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="history" color="primary" />
                          </template>
                        </q-input>
                      </div>

                      <div class="sudb" v-if="show_complete">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="home" color="primary" /> Origine
                        </h5>

                        <q-select
                          v-model="pays"
                          label="Pays de résidence"
                          type="text"
                          :options="les_pays"
                          behavior="menu"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="language" color="primary" />
                          </template>
                        </q-select>
                        <q-select
                          v-if="pays.length > 0"
                          dense
                          v-model="province_p"
                          label="Province d'origine"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="territoire_p"
                          :options="options_territoire"
                          label="Territoire"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="groupement_p"
                          :options="options_groupement"
                          label="Groupement"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="village_p"
                          :options="options_village"
                          label="Village"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <!-- <q-select
                      v-model="groupement"
                      use-input
                      input-debounce="0"
                      label="Nom du groupement"
                      :options="options_groupement"
                      @filter="filterFn"
                      :rules="[(val) => !!val || 'Champ requis']"

                      behavior="menu"
                    /> -->
                      </div>
                      <div class="sudb" v-if="show_complete">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="location_on" color="primary" />Résidence
                        </h5>
                        <q-select
                          dense
                          v-model="commune_p"
                          label="Commune de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          dense
                          v-model="quartier_p"
                          label="Quartier de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
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
                      </div>
                      <!-- Show list existant -->
                      <div
                        v-if="show_list"
                        style="
                          margin: 0px;
                          padding: 0px;
                          box-sizing: border-box;
                          width: inherit;
                        "
                      >
                        <q-list bordered>
                          <q-item
                            clickable
                            v-ripple
                            v-for="item in results"
                            :key="item.id"
                            class="bg-blue-4"
                            @click="recupPere(item)"
                          >
                            <q-item-section
                              class="text-center text-white text-weight-bold"
                            >
                              <div class="row">
                                <div class="col">
                                  <span class="q-mr-sm"
                                    ><q-icon name="face" color="white" /></span
                                  >{{ item.nom }} {{ item.postnom }}
                                  {{ item.prenom }}
                                </div>
                                <q-separator vertical color="white" />
                                <div class="col">
                                  <span class="q-mr-sm"
                                    ><q-icon name="event" color="white" /></span
                                  >Né le {{ item.date_naissance }}
                                </div>
                                <q-separator vertical color="white" />
                                <div class="col">
                                  <span class="q-mr-sm"
                                    ><q-icon
                                      name="location_on"
                                      color="white" /></span
                                  >Né à {{ item.lieu_naissance }}
                                </div>
                              </div>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
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
                    <q-form>
                      <div class="sudb">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="edit" color="primary" /> Identification
                        </h5>
                        <q-input
                          dense
                          v-model="nom_m"
                          label="Nom de la mère"
                          type="text"
                          @keydown="search"
                          @keyup="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="postnom_m"
                          label="Postnom"
                          type="text"
                          @keydown="search"
                          @keyup="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="prenom_m"
                          label="Prenom"
                          type="text"
                          @keydown="search"
                          @keyup="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="l_naiss_m"
                          label="Lieu de naissance"
                          type="text"
                          @change="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="d_naiss_m"
                          label="Date de Naissance"
                          type="date"
                          @change="search"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                      </div>

                      <div class="sudb" v-if="show_complete">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="home" color="primary" />Origine
                        </h5>
                        <q-select
                          v-model="pays_m"
                          label="Pays de résidence"
                          type="text"
                          :options="les_pays"
                          behavior="menu"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          dense
                          v-model="province_m"
                          :options="option_province"
                          label="Province d'origine"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="territoire_m"
                          :options="options_territoire"
                          label="Territoire"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="groupement_m"
                          :options="options_groupement"
                          label="Groupement"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="village_m"
                          :options="options_village"
                          label="Village"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <!-- <q-select
                      v-model="groupement"
                      use-input
                      input-debounce="0"
                      label="Nom du groupement"
                      :options="options_groupement"
                      @filter="filterFn"
                      :rules="[(val) => !!val || 'Champ requis']"

                      behavior="menu"
                    /> -->
                      </div>
                      <div class="sudb" v-if="show_complete">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="location_on" color="primary" />Résidence
                        </h5>
                        <q-select
                          dense
                          v-model="commune_m"
                          label="Commune de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          dense
                          v-model="quartier_m"
                          label="Quartier de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
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
                      </div>
                      <!-- Show list existant -->
                      <div v-if="show_list">
                        <q-list bordered>
                          <q-item
                            clickable
                            v-ripple
                            v-for="item in results"
                            :key="item.id"
                            class="bg-blue-4"
                            @click="recupMere(item)"
                          >
                            <q-item-section
                              class="text-center text-white text-weight-bold"
                            >
                              <div class="row">
                                <div class="col">
                                  <span class="q-mr-sm"
                                    ><q-icon name="face" color="white" /></span
                                  >{{ item.nom }} {{ item.postnom }}
                                  {{ item.prenom }}
                                </div>
                                <q-separator vertical color="white" />
                                <div class="col">
                                  <span class="q-mr-sm"
                                    ><q-icon name="event" color="white" /></span
                                  >Né le {{ item.date_naissance }}
                                </div>
                                <q-separator vertical color="white" />
                                <div class="col">
                                  <span class="q-mr-sm"
                                    ><q-icon
                                      name="location_on"
                                      color="white" /></span
                                  >Né à {{ item.lieu_naissance }}
                                </div>
                              </div>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
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

              <q-step :name="3" icon="add_comment">
                <div class="text-weight-bold text-center text-uppercase">
                  Nouvelle naissance
                </div>

                <ul class="box-info">
                  <li class="aos-item" data-aos="zoom-in-right">
                    <q-form>
                      <div class="sudb">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="edit" color="primary" /> Identification
                        </h5>
                        <q-input
                          dense
                          v-model="nom"
                          label="Nom de la personne"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="postnom"
                          label="Postnom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="prenom"
                          label="Prenom"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        >
                        </q-input>
                        <q-select
                          v-model="sexe"
                          :options="options_genre"
                          label="Genre"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="l_naiss"
                          label="Lieu de naissance"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="d_naiss"
                          label="Date de Naissance"
                          type="date"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-model="couleur_oeil"
                          :options="options_eye"
                          label="Couleur oeil"
                          behavior="menu"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                      </div>
                      <div class="sudb">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="home" color="primary" />Origine
                        </h5>
                        <q-select
                          v-model="pays"
                          label="Pays de résidence"
                          type="text"
                          :options="les_pays"
                          behavior="menu"
                          @update:model-value="searchProv(pays)"
                          dense
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-if="prov"
                          dense
                          v-model="province"
                          label="Province d'origine"
                          type="text"
                          behavior="menu"
                          :options="les_prov"
                          @update:model-value="searchTerr(province)"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-if="terr"
                          v-model="territoire"
                          label="Territoire"
                          dense
                          @update:model-value="searchCol(territoire)"
                          behavior="menu"
                          :options="les_terr"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-if="col"
                          v-model="collectivite"
                          label="Collectivite"
                          dense
                          behavior="menu"
                          :options="les_col"
                          @update:model-value="searchGroup(collectivite)"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          v-if="group"
                          v-model="groupement"
                          label="Groupement"
                          :options="les_group"
                          dense
                          behavior="menu"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />

                        <!-- <q-select
                      v-model="groupement"
                      use-input
                      input-debounce="0"
                      label="Nom du groupement"
                      :options="options_groupement"
                      @filter="filterFn"
                      :rules="[(val) => !!val || 'Champ requis']"

                      behavior="menu"
                    /> -->
                      </div>
                      <div class="sudb">
                        <h5 style="margin-bottom: 10%; text-align: center">
                          <q-icon name="location_on" color="primary" />Résidence
                        </h5>
                        <q-select
                          dense
                          v-model="commune"
                          label="Commune de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          dense
                          v-model="quartier"
                          label="Quartier de résidence"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-select
                          dense
                          v-model="avenue"
                          label="Avenue"
                          type="text"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                        <q-input
                          dense
                          v-model="num_maison"
                          label="Numero Maison"
                          type="number"
                          :rules="[(val) => !!val || 'Champ requis']"
                        />
                      </div>
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
          </q-card>
        </q-dialog>
        <!-- Fin Modal Formulaire Ajout Personne -->
      </li>
    </ul>
    <!-- Fin Cards -->
    <!-- Tableau -->
    <div class="table-data q-pa-md aos-item" data-aos="zoom-in-right">
      <div class="order">
        <div class="head">
          <h3>Ajout récent</h3>
          <i class="bx bx-search"></i>
          <i class="bx bx-filter"></i>
        </div>
        <TablePart />
        <ArbreGen />
      </div>

      <!-- <div class="todo aos-item" data-aos="zoom-in-left">
        <div class="head">
          <h3>Graphique</h3>
          <i class="bx bx-plus"></i>
          <i class="bx bx-filter"></i>
        </div>
      </div> -->
    </div>
    <!-- Fin Tableau -->
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">MESSAGE</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          enregistrement reussi
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import Chart from "chart.js/auto";
import { useQuasar } from "quasar";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
// import FormPartenaire from "src/components/FormPartenaire.vue";
// import TablePart from "src/components/TablePart.vue";
// import ArbreGen from "src/components/arbre/ArbreGen.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import { useStore } from "src/stores/store";
import { usePersonneN } from "src/stores/storePersonneN";
import { usePaysN } from "src/stores/storePaysN";
import { useProvN } from "src/stores/storeProvinceN";
import { useTerriN } from "src/stores/storeTerritoireN";
import { useColleN } from "src/stores/storeCollectiviteN";
import { useGroupeN } from "src/stores/storeGroupementN";

export default {
  // components: { TablePart,ArbreGen },
  setup() {
    const router = useRouter();
    // Gestion des notifications et loading process
    const $q = useQuasar();
    const p = usePersonneN();
    let timer;
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });

    const store = useStore();
    // Les variables
    const dialog = ref(false);
    const show_list = ref(false);
    const show_complete = ref(false);
    const position = ref("top");
    const results = ref(null);
    // infos pere
    const nom_p = ref("");
    const postnom_p = ref("");
    const prenom_p = ref("");
    const l_naiss_p = ref("");
    const d_naiss_p = ref("");
    const groupement_p = ref(null);
    const pays_p = ref(null);
    const ville_p = ref(null);
    const commune_p = ref(null);
    const quartier_p = ref(null);
    const avenue_p = ref(null);
    const num_maison_p = ref("");
    // infos de la mere
    const nom_m = ref("");
    const postnom_m = ref("");
    const prenom_m = ref("");
    const l_naiss_m = ref("");
    const d_naiss_m = ref("");
    const groupement_m = ref(null);
    const pays_m = ref(null);
    const ville_m = ref(null);
    const commune_m = ref(null);
    const quartier_m = ref(null);
    const avenue_m = ref(null);
    const num_maison_m = ref("");
    // infos de la nouvelle personne
    const nom = ref("");
    const postnom = ref("");
    const prenom = ref("");
    const sexe = ref("");
    const l_naiss = ref("");
    const d_naiss = ref("");
    const couleur_oeil = ref("");
    const groupement = ref(null);
    const pays = ref(null);
    const ville = ref(null);
    const commune = ref(null);
    const quartier = ref(null);
    const avenue = ref(null);
    const num_maison = ref("");

    let persistent = false;

    const groupe_type = [];
    const groupe_Types = [];
    let groupement_Type = ref([]);

    // Enregistrement d'une nouvelle personne
    const submitForm = () => {};
    //recherche de la personne existante
    const search = () => {
      if (p.pere) {
        nom_p.value = "";
        postnom_p.value = "";
        prenom_p.value = "";
        l_naiss_p.value = "";
        d_naiss_p.value = "";
        p.pere = null;
      }
      if (p.mere) {
        nom_m.value = "";
        postnom_m.value = "";
        prenom_m.value = "";
        l_naiss_m.value = "";
        d_naiss_m.value = "";
        p.mere = null;
      }
      p.getpers({
        nom: nom_p.value != "" ? nom_p.value : nom_m.value,
        postnom: postnom_p.value != "" ? postnom_p.value : postnom_m.value,
        prenom: prenom_p.value != "" ? prenom_p.value : prenom_m.value,
      }).then((res) => {
        //console.log(nom_m.value);
        results.value = null;
        results.value = res.data.response;
        if (results.value) {
          if (nom_p.value.length > 0 || nom_m.value.length > 0) {
            show_list.value = true;
          } else {
            show_list.value = false;
          }
          show_complete.value = false;
        } else {
          show_complete.value = true;
          show_list.value = false;
        }
        // console.log(res);
      });
    };
    //fin de la methode de recherche

    //recuperer le pere dans le store
    const recupPere = (s) => {
      nom_p.value = s.nom;
      postnom_p.value = s.postnom;
      prenom_p.value = s.prenom;
      l_naiss_p.value = s.lieu_naissance;
      d_naiss_p.value = s.date_naissance;
      show_list.value = false;
      p.setPere(s);
      console.log(p.pere);
    };
    //fin recuperer pere

    //recuperer mere dans le store
    const recupMere = (s) => {
      nom_m.value = s.nom;
      postnom_m.value = s.postnom;
      prenom_m.value = s.prenom;
      l_naiss_m.value = s.lieu_naissance;
      d_naiss_m.value = s.date_naissance;
      show_list.value = false;
      p.setMere(s);
      console.log(p.mere);
    };
    //fin rucuperer mere

    //recuperer les pays
    const les_pays = ref([]);
    const storepays = usePaysN();
    storepays.getpays().then((res) => {
      les_prov.value = [];
      les_terr.value = [];
      les_col.value = [];
      les_group.value = [];
      res.data.response.forEach((element) => {
        les_pays.value.push({
          label: element.nom_pays,
          value: element.id,
        });
      });
    });
    //fin recuperer Pays

    //montrer les provinces
    const prov = ref(false);
    const les_prov = ref([]);
    const sprov = useProvN();
    const searchProv = (s) => {
      les_prov.value = [];
      if (s.label == 'RDC') {
        sprov
        .getFromPays({
          id_pays: s.value,
        })
        .then((res) => {
          prov.value = true;
          res.response.forEach((el) => {
            les_prov.value.push({
              label: el.nom_province,
              value: el.id,
            });
          });
        });
      } else{
        prov.value = false;
        terr.value = false;
        col.value= false;
        group.value=false;
      }
      //code
    };
    //fin montrer Province

    //montrer territoire
    const terr = ref(false);
    const les_terr = ref([]);
    const sterr = useTerriN();
    const searchTerr = (s) => {
      les_terr.value = [];
      sterr
        .getFromPRov({
          id_province: s.value,
        })
        .then((res) => {
          terr.value = true;
          res.response.forEach((el) => {
            les_terr.value.push({
              label: el.nom_territoire,
              value: el.id,
            });
          });
        });
      //code
    };
    //fin montrer territoire
    //montrer groupement
    const les_group = ref([]);
    const sgroup = useGroupeN();
    const group = ref(false);
    const searchGroup = (s) => {
      les_group.value = [];
      sgroup
        .getFromColl({
          id_collectivite: s.value,
        })
        .then((res) => {
          console.log(s);
          res.response.forEach((el) => {
            group.value = true;
            les_group.value.push({
              label: el.nom_groupement,
              value: el.id,
            });
          });
        });
    };
    //fin montrer groupement

    //montrer collectivite
    const col = ref(false);
    const scol = useColleN();
    const les_col = ref([]);
    const searchCol = (s) => {
      les_col.value = []
      scol
        .getFromTerr({
          id_territoire: s.value,
        })
        .then((res) => {
          res.response.forEach((el) => {
            col.value = true;
            les_col.value.push({
              label: el.nom_collectivite,
              value: el.id,
            });
          });
        });
      //code
    };
    //fin montrer collectivite

    return {
      group,
      les_prov,
      les_terr,
      les_col,
      les_group,
      searchGroup,
      col,
      searchCol,
      terr,
      searchTerr,
      prov,
      searchProv,
      les_pays,
      search,
      recupMere,
      recupPere,
      show_list,
      show_complete,
      results,
      timer,
      $q,
      router,
      step: ref(1),
      // infos pere
      nom_p,
      postnom_p,
      prenom_p,
      l_naiss_p,
      d_naiss_p,
      groupement_p,
      pays_p,
      ville_p,
      commune_p,
      quartier_p,
      avenue_p,
      num_maison_p,
      // infos de la mere
      nom_m,
      postnom_m,
      prenom_m,
      l_naiss_m,
      d_naiss_m,
      groupement_m,
      pays_m,
      ville_m,
      commune_m,
      quartier_m,
      avenue_m,
      num_maison_m,
      // infos de la nouvelle personne
      nom,
      postnom,
      prenom,
      sexe,
      l_naiss,
      d_naiss,
      couleur_oeil,
      groupement,
      pays,
      ville,
      commune,
      quartier,
      avenue,
      num_maison,
      submitForm,
      persistent,

      options_genre: ["Masculin", "Féminin"],
      options_eye: ["Bleu", "Marron", "Rouge"],
      store,
      dialog,
      position,
      seamless: ref(false),
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
      groupe_type,
      groupe_Types,
      groupement_Type,
    };
  },
  name: "UserAccountChart",
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.myChart.getContext("2d");

      // Données de l'exemple (à remplacer par vos propres données)
      const userData = {
        labels: ["Administrateur", "Partenaire", "Encodeur", "Utilisateur"],
        counts: [10, 20, 15, 30], // Nombre de comptes par catégorie
      };

      new Chart(ctx, {
        type: "line",
        data: {
          labels: userData.labels,
          datasets: [
            {
              label: "Comptes par catégorie",
              data: userData.counts,
              backgroundColor: [
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  mounted() {
    AOS.init();
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

.table-data {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 24px;
  margin-top: 24px;
  width: 100%;
  color: #342e37;
}
.table-data > div {
  border-radius: 20px;
  background: #f9f9f9;
  padding: 24px;
  overflow-x: auto;
}
.table-data .head {
  display: flex;
  align-items: center;
  grid-gap: 16px;
  margin-bottom: 24px;
}
.table-data .head h3 {
  margin-right: auto;
  font-size: 24px;
  font-weight: 600;
}
.table-data .head .bx {
  cursor: pointer;
}

.table-data .order {
  flex-grow: 1;
  flex-basis: 500px;
}
.table-data .order table {
  width: 100%;
  border-collapse: collapse;
}
.table-data .order table th {
  padding-bottom: 12px;
  font-size: 13px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.sudb {
  background-color: inherit;
  border: none;
  color: rgb(10, 10, 10);
  width: inherit;
  margin-bottom: 10%;
  border-radius: 5%;
}
.table-data .order table td {
  padding: 16px 0;
}
.table-data .order table tr td:first-child {
  display: flex;
  align-items: center;
  grid-gap: 12px;
  padding-left: 6px;
}
.table-data .order table td img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}
.table-data .order table tbody tr:hover {
  background: #eee;
}
.table-data .order table tr td .status {
  font-size: 10px;
  padding: 6px 16px;
  color: #f9f9f9;
  border-radius: 20px;
  font-weight: 700;
}
.table-data .order table tr td .status.completed {
  background: #3c91e6;
}
.table-data .order table tr td .status.process {
  background: #ffce26;
}
.table-data .order table tr td .status.pending {
  background: #fd7238;
}

.table-data .todo {
  flex-grow: 1;
  flex-basis: 300px;
}
.table-data .todo .todo-list {
  width: 100%;
}
.table-data .todo .todo-list li {
  width: 100%;
  margin-bottom: 16px;
  background: #eee;
  border-radius: 10px;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-data .todo .todo-list li .bx {
  cursor: pointer;
}
.table-data .todo .todo-list li.completed {
  border-left: 10px solid #3c91e6;
}
.table-data .todo .todo-list li.not-completed {
  border-left: 10px solid #fd7238;
}
.table-data .todo .todo-list li:last-child {
  margin-bottom: 0;
}
@media screen and (max-width: 576px) {
  .q-form .form-input input {
    display: none;
  }

  .q-form .form-input button {
    width: auto;
    height: auto;
    background: transparent;
    border-radius: none;
    color: #342e37;
  }

  .q-form.show .form-input input {
    display: block;
    width: 100%;
  }
  .q-form.show .form-input button {
    width: 36px;
    height: 100%;
    border-radius: 0 36px 36px 0;
    color: var(--light);
    background: var(--red);
  }

  .q-form.show ~ .notification,
  #content nav form.show ~ .profile {
    display: none;
  }

  .box-info {
    grid-template-columns: 1fr;
  }

  .table-data .head {
    min-width: 420px;
  }
  .table-data .order table {
    min-width: 420px;
  }
  .table-data .todo .todo-list {
    min-width: 420px;
  }
}
</style>
