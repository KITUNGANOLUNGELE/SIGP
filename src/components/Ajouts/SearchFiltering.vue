<template>
  <div
    class="q-field q-pa-md q-gutter-sm"
    style="display: flex; align-items: center"
  >
    <q-select
      style="flex: 1; margin-right: 10px"
      filled
      label="Rechercher une personne......"
      v-model="model"
      use-input
      hide-selected
      fill-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> Aucun résultat</q-item-section>
        </q-item>
      </template>
    </q-select>

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
</template>

<script>
import { ref } from "vue";
const stringOptions = ["Blondy", "Christelle", "Ringo", "Chibox"];

export default {
  data() {
    const options = ref(stringOptions);
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
      model: ref(null),
      options,
      filterFn(val, update, abort) {
        if (val.length < 2) {
          abort();
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
