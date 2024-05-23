<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Acte de Naissance</h1>
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
                  :rules="[(val) => !!val || 'Champ nom requis']"
                />
                <q-input
                  dense
                  v-model="postnom"
                  label="Postnom"
                  type="text"
                  :rules="[(val) => !!val || 'Champ  postnom requis']"
                />
                <q-input
                  dense
                  v-model="prenom"
                  label="Prenom"
                  type="text"
                  :rules="[(val) => !!val || 'Champ prenom requis']"
                />
                <q-input
                  dense
                  v-model="num_maison"
                  label="LieuNaissance"
                  type="text"
                  :rules="[(val) => !!val || 'Champ lieu requis']"
                />
                <q-input
                  dense
                  v-model="date_naissance"
                  label="Date de Naissance"
                  type="date"
                  :rules="[(val) => !!val || 'Champ date requis']"
                />
                <q-input
                  dense
                  v-model="groupement"
                  label="Groupement"
                  type="text"
                  :rules="[(val) => !!val || 'Champ groupement requis']"
                />
                <q-btn
                  square
                  color="dark"
                  type="submit"
                  size="md"
                  label="Rechercher par groupe"
                  no-caps
                  class="full-width"
                ></q-btn>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- End Dialogue -->
    </div>

    <ul v-if="showResults" class="box-info q-pa-md" data-aos="zoom-in">
      <li>
        <div ref="printableContent">
          <ActeNaissance />
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
import ActeNaissance from "src/components/Documents/ActeNaissance.vue";

export default {
  components: { ActeNaissance },
  data() {
    const list = ["blur(4px)"];
    const dialog = ref(false);
    const backdropFilter = ref(null);
    return {
      searchQuery: "",
      showResults: false,
      dialog,
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
    search() {
      this.showResults = true;
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
