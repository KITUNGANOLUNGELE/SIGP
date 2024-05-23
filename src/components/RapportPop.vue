<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: auto">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="mails" icon="travel_explore" />
        <q-tab name="alarms" icon="child_care" />
        <q-tab name="movies" icon="balance" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="text-grey-9 text-h5 text-weight-bold">Population</div>
          <div class="vue-app">
            <!-- Dialogue -->

            <q-btn
              outline
              color="black"
              label="Ajouter"
              @click="open('left')"
            />

            <!-- Début Dialogue Form d'ajout  -->
            <q-dialog v-model="dialog" :position="position">
              <q-card style="width: 350px">
                <q-linear-progress :value="0.6" color="black" />
                <q-card-section class="text-center q-pa-md">
                  <div class="text-weight-bold">Créer un Rapport</div>
                  <!-- Form d'ajout rapport -->
                  <form @submit.prevent="ajouterDonnees">
                    <q-input
                      dense
                      v-model="selectedVille"
                      label="Ville"
                      id="ville"
                      type="text"
                      required
                    />
                    <q-input
                      dense
                      v-model="nouvellePopulationTotale"
                      label="Population totale"
                      id="populationTotale"
                      type="number"
                      required
                    />
                    <q-input
                      dense
                      v-model="nouvellePopulation0_18"
                      label="nouvellePopulation0_18"
                      id="population0_18"
                      type="number"
                      required
                    />
                    <q-input
                      dense
                      v-model="nouvellePopulation19_30"
                      label="Population 19-30 ans"
                      id="population19_30"
                      type="number"
                      required
                    />

                    <div class="q-pa-md">
                      <q-btn
                        type="submit"
                        style="border-radius: 8px"
                        color="dark"
                        rounded
                        size="md"
                        no-caps
                        class="full-width"
                        label="Ajouter"
                        dense
                      />
                    </div>
                  </form>
                </q-card-section>
              </q-card>
            </q-dialog>

            <!-- Fin Dialogue -->
            <!-- Fin Form d'ajout Rapport GLobal sur la population -->

            <div class="q-pa-md">
              <q-table
                v-if="villes.length > 0"
                :rows="villes"
                :columns="columns"
              />

              <q-notification
                v-if="notification"
                :class="notification.color"
                :message="notification.message"
                @close="notification = null"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-grey-9 text-h5 text-weight-bold">
            Naissance, Mariage&Décès
          </div>
          <RapportNaiss />
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-grey-9 text-h5 text-weight-bold">
            Casiers Judiciaires
          </div>
          <RappCassiers />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import RapportNaiss from "src/components/RapportNaiss.vue";
import RappCassiers from "src/components/RappCassiers.vue";

export default {
  components: { RapportNaiss, RappCassiers },
  data() {
    const dialog = ref(false);
    const blondy = ref(false);
    const position = ref("top");
    return {
      tab: ref("mails"),
      splitterModel: ref(20),
      selectedVille: "",
      nouvellePopulationTotale: 0,
      nouvellePopulation0_18: 0,
      nouvellePopulation19_30: 0,
      villes: [],
      notification: null,
      columns: [
        { name: "name", label: "Ville", align: "left", field: "name" },
        {
          name: "populationTotale",
          label: "Population totale",
          align: "left",
          field: "populationTotale",
        },
        {
          name: "population0_18",
          label: "Population 0-18 ans",
          align: "left",
          field: "population0_18",
        },
        {
          name: "population19_30",
          label: "Population 19-30 ans",
          align: "left",
          field: "population19_30",
        },
      ],
      dialog,
      position,
      blondy,

      open(pos) {
        position.value = pos;
        dialog.value = true;
        blondy.value = true;
      },
    };
  },
  methods: {
    ajouterDonnees() {
      if (
        this.selectedVille === "" ||
        this.nouvellePopulationTotale === 0 ||
        this.nouvellePopulation0_18 === 0 ||
        this.nouvellePopulation19_30 === 0
      ) {
        this.notification = {
          message: "Veuillez remplir tous les champs",
          color: "negative",
        };
      } else {
        const villeExistante = this.villes.find(
          (ville) =>
            ville.name.toLowerCase() === this.selectedVille.toLowerCase()
        );

        if (villeExistante) {
          villeExistante.populationTotale = this.nouvellePopulationTotale;
          villeExistante.population0_18 = this.nouvellePopulation0_18;
          villeExistante.population19_30 = this.nouvellePopulation19_30;

          this.notification = {
            message: "Données mises à jour avec succès",
            color: "positive",
          };
        } else {
          const nouvelleVille = {
            name: this.selectedVille,
            populationTotale: this.nouvellePopulationTotale,
            population0_18: this.nouvellePopulation0_18,
            population19_30: this.nouvellePopulation19_30,
          };

          this.villes.push(nouvelleVille);

          this.notification = {
            message: "Données ajoutées avec succès",
            color: "positive",
          };

          setTimeout(() => {
            this.notification = null;
          }, 3000);
        }

        this.selectedVille = "";
        this.nouvellePopulationTotale = 0;
        this.nouvellePopulation0_18 = 0;
        this.nouvellePopulation19_30 = 0;
      }
    },
  },
};
</script>

<style>
.q-notification.negative {
  background-color: #f8d7da;
  color: #721c24;
}

.q-notification.positive {
  background-color: #d4edda;
  color: #155724;
}
</style>
