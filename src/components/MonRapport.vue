<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Attestation de Naissance</h1>
    </div>

    <div
      class="q-field q-pa-md q-gutter-sm"
      style="display: flex; align-items: center"
    >
      <q-input
        v-model="searchQuery"
        filled
        @keyup.enter="search"
        label="Recherche"
        placeholder="Entrez votre recherche"
        style="flex: 1; margin-right: 10px"
      >
        <q-btn
          flat
          square
          dense
          label="Afficher"
          @click="search"
          class="q-ml-md"
        />
      </q-input>
      <!-- Le bouton du Modal pour la recherche en groupe -->
      <q-btn
        v-for="filter in backdropFilterList"
        :key="filter.label"
        color="primary"
        :label="
          filter.label === 'blur(4px)' ? 'Recherche Par Groupe' : filter.label
        "
        no-caps
        @click="filter.onClick"
        size="1.5em"
        outline
        style="color: goldenrod"
      />
      <!-- Ici commence le dialog du formulaire de recherche -->
      <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
        <q-card>
          <q-linear-progress :value="0.6" color="black" />
          <q-card-section class="row items-center q-pb-none text-h6">
            <div class="text-grey text-center">
              Formulaire de Recherche par Groupe
            </div>
          </q-card-section>

          <q-card-section>
            <div style="width: 300px; height: auto">
              <q-form @submit="submitForm">
                <q-input
                  dense
                  v-model="nom"
                  label="Nom"
                  type="text"
                  @keydown="searchP"
                  @keyup="searchP"
                  :rules="[(val) => !!val || 'Champ nom requis']"
                />
                <q-input
                  dense
                  v-model="postnom"
                  label="Postnom"
                  type="text"
                  @keydown="searchP"
                  @keyup="searchP"
                  :rules="[(val) => !!val || 'Champ  postnom requis']"
                />
                <q-input
                  dense
                  v-model="prenom"
                  label="Prenom"
                  type="text"
                  @keydown="searchP"
                  @keyup="searchP"
                  :rules="[(val) => !!val || 'Champ prenom requis']"
                />
                <q-input
                  dense
                  v-model="lieu_naissance"
                  label="LieuNaissance"
                  type="text"
                  :rules="[(val) => !!val || 'Champ lieu requis']"
                />
                <q-input
                  dense
                  v-model="date_naissance"
                  label="Date de Naissance"
                  type="date"
                  @change="searchP"
                  :rules="[(val) => !!val || 'Champ date requis']"
                />
                <q-input
                  dense
                  v-model="groupement"
                  label="Groupement"
                  type="text"
                  :rules="[(val) => !!val || 'Champ groupement requis']"
                />
                <!-- <q-btn
                  square
                  color="dark"
                  type="submit"
                  size="md"
                  label="Rechercher par groupe"
                  no-caps
                  class="full-width"
                ></q-btn> -->
              </q-form>
              <div v-if="show_list">
                <q-list bordered>
                  <q-item
                    clickable
                    v-ripple
                    v-for="item in results"
                    :key="item.id"
                    class="bg-blue-4"
                    @click="recupPers(item)"
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
                            ><q-icon name="location_on" color="white" /></span
                          >Né à {{ item.lieu_naissance }}
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- End Dialogue -->
    </div>

    <ul v-if="showResults" class="q-pa-md" data-aos="zoom-in">
      <li>
        <div ref="printableContent">
          <AttestationNaissance />
        </div>

        <div class="bg-grey-4 q-mt-md q-flex flex-center q-justify-end">
          <q-btn
            round
            bg-white
            icon="fa-solid fa-arrow-up-from-bracket"
            @click="printContent"
            class="q-mt-md"
            ><q-tooltip>partager</q-tooltip>
          </q-btn>

          <q-btn
            round
            icon="fa-solid fa-print"
            @click="printContent"
            class="q-mt-md"
            ><q-tooltip>imprimer</q-tooltip>
          </q-btn>
          <iframe
            ref="printFrame"
            class="print-frame"
            style="display: none"
          ></iframe>
        </div>
      </li>
    </ul>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import AttestationNaissance from "src/components/Documents/AttestationNaissance.vue";
import ActeNaissance from "./Documents/ActeNaissance.vue";
import { usePersonneN } from "src/stores/storePersonneN";

export default {
  components: { AttestationNaissance },
  data() {
    const list = ["blur(4px)"];
    const dialog = ref(false);
    const backdropFilter = ref(null);
    return {
      searchQuery: "",
      nom: ref(""),
      postnom: ref(""),
      prenom: ref(""),
      lieu_naissance: ref(""),
      date_naissance: ref(""),
      num_maison: ref(""),
      showResults: false,
      show_list: ref(false),
      dialog,
      results: ref(null),
      personne: usePersonneN(),
      backdropFilter,
      backdropFilterList: list.map((filter) => ({
        label: filter,
        onClick: () => {
          backdropFilter.value = filter;
          dialog.value = true;
        },
      })),
    };
  },
  methods: {
    searchP() {
      if (this.personne.pere) {
        this.personne.pere = null;
        this.personne.pere_tmp = null;
      }
      if (this.personne.mere) {
        this.personne.mere = null;
        this.personne.mere_tmp = null;
      }
      this.personne
        .getpers({
          nom: this.nom,
          postnom: this.postnom,
          prenom: this.prenom,
        })
        .then((res) => {
          //console.log(res);
          this.results = null;
          this.results = res.data.response;
          if (this.results) {
            if (this.nom.length > 0) {
              this.show_list = true;
            } else {
              this.show_list = false;
            }
          } else {
            this.show_list = false;
          }
          // console.log(res);
        });
    },
    recupPers(s) {
      this.nom = s.nom;
      this.postnom = s.postnom;
      this.prenom = s.prenom;
      this.lieu_naissance = s.lieu_naissance;
      this.num_maison = s.num_maison;
      this.date_naissance = s.date_naissance;
      this.show_list = false;
      this.personne.buldActeNaiss(s.id).then((res) => {
        this.showResults = true;
        this.dialog = false;
        this.personne.personne = res;
      });
    },
    search() {
      this.personne.buldActeNaiss(this.searchQuery).then((res) => {
        this.showResults = true;
        this.personne.personne = res;
      });
    },
    printContent() {
      const printableElement = this.$refs.printableContent.cloneNode(true);
      this.removeUnwantedElements(printableElement);
      const printFrame = this.$refs.printFrame;
      printFrame.contentDocument.body.innerHTML = printableElement.innerHTML;
      printFrame.contentWindow.print();
    },
    removeUnwantedElements(element) {
      element
        .querySelectorAll("script, link, meta")
        .forEach((el) => el.remove());
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
.q-mx-md {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
}
.q-ml-md {
  margin-left: 1.5rem;
}
.box-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 24px;
  margin-top: 36px;
}
.box-info li {
  padding: auto;
  text-decoration: none;
  background: #f9f9f9;
}
.q-mt-md {
  margin-top: 1.5rem;
}
.q-flex {
  display: flex;
}
.q-justify-end {
  justify-content: flex-end;
}
.print-frame {
  position: fixed;
  top: -9999px;
  left: -9999px;
}
</style>
