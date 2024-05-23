<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Acte de Naissance</h1>
      <q-input
        v-model="searchQuery"
        filled
        @keyup.enter="search"
        label="Recherche"
        placeholder="Entrez votre recherche"
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
import AOS from "aos";
import "aos/dist/aos.css";
import ActeNaissance from "src/components/Documents/ActeNaissance.vue";

export default {
  components: { ActeNaissance },
  data() {
    return {
      searchQuery: "",
      showResults: false,
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
