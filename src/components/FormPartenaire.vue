<template>
  <q-stepper v-model="step" header-nav ref="stepper" color="black" animated>
    <q-step :name="1" icon="child_care" :done="step > 1">
      <ul class="box-info q-pa-sm">
        <li class="aos-item" data-aos="zoom-in-right">
          <!-- FORMULAIRE ABOUT PERE -->
          <q-form @submit="submitForm">
            <p class="text-weight-bold text-center">naissance</p>
            <q-select
              dense
              v-model="id_enfant"
              use-input
              input-debounce="0"
              label="entrer le nom de l'enfant"
              :options="options_enfants"
              @filter="filterFn"
              style="width: 100%"
              behavior="menu"
            />
            <q-select
              dense
              v-model="id_mere"
              use-input
              input-debounce="0"
              label="entrer le nom de la mere"
              :options="options_mere"
              @filter="filterFn1"
              style="width: 100%"
              behavior="menu"
            />
            <q-select
              dense
              v-model="id_pere"
              use-input
              input-debounce="0"
              label="entrer le nom du pere"
              :options="options_pere"
              @filter="filterFn2"
              style="width: 100%"
              behavior="menu"
            />

            <q-input
              v-model="couleur"
              label="couleur des yeux"
              dense
              required
            />
            <div class="q-pa-md">
              <q-btn
                style="border-radius: 8px"
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
        </li>
      </ul>
    </q-step>
  </q-stepper>
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
        enregistrement de {{ id_enfant.label }} reussi
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "src/stores/store";
export default {
  setup() {
    const store = useStore();
    const id_enfant = ref(null);
    const id_pere = ref(null);
    const id_mere = ref(null);
    const couleur = ref("");
    const data_enfant = [];
    const data_mere = [];
    const data_pere = [];
    const personnes = computed(() => {
      return store.personnes;
    });
    onMounted(() => {
      store.afficherPersonnes();
    });
    store.afficherPersonnes().then((rest) => {
      rest.forEach((element) => {
        let datas = {};
        datas.label =
          element.nom + " " + element.postnom + " " + element.prenom;
        datas.value = element.id;
        data_enfant.push(datas);
      });
    });
    store.afficherPersonnes().then((rest) => {
      rest.forEach((element) => {
        let datas = {};
        datas.label =
          element.nom + " " + element.postnom + " " + element.prenom;
        datas.value = element.id;
        data_mere.push(datas);
      });
    });
    store.afficherPersonnes().then((rest) => {
      rest.forEach((element) => {
        let datas = {};
        datas.label =
          element.nom + " " + element.postnom + " " + element.prenom;
        datas.value = element.id;
        data_pere.push(datas);
      });
    });
    const options_enfants = ref([data_enfant]);
    const options_mere = ref([data_mere]);
    const options_pere = ref([data_pere]);
    const persistent = ref(false);
    return {
      personnes,
      store,
      id_enfant,
      options_enfants,
      options_mere,
      options_pere,
      id_pere,
      id_mere,
      couleur,
      persistent,
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options_enfants.value = data_enfant;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          options_enfants.value = data_enfant.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      filterFn1(val, update) {
        if (val === "") {
          update(() => {
            options_mere.value = data_mere;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          options_mere.value = data_mere.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      filterFn2(val, update) {
        if (val === "") {
          update(() => {
            options_pere.value = data_pere;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          options_pere.value = data_pere.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      step: ref(1),
      model: ref(null),
      modeler: ref(null),
      sexe: ref(null),
      options: ["M", "F"],
      optionss: ["Marron", "Bleu", "Vert", "Gris", "Noir", "Hétérochromie"],
    };
  },
  methods: {
    submitForm() {
      //  console.log(this.id_enfant.value)
      //  console.log(this.id_mere.value)
      //  console.log(this.id_pere.value)
      //  console.log(this.couleur)
      this.store.ajouterNaissance(
        this.id_enfant.value,
        this.id_pere.value,
        this.id_mere.value,
        this.couleur
      );
      this.persistent = true;
    },
  },
};
</script>
