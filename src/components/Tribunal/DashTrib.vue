<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Dashboard Tribunal</h1>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el label="Eglise" icon="home" />
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
    </ul>
    <SearchFiltering />
  </q-layout>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import FormPer from "components/Tribunal/FormPer.vue";
import SearchFiltering from "src/components/Ajouts/SearchFiltering.vue";
  import { useQuasar } from 'quasar'
  import { ref, onMounted, onBeforeUnmount} from "vue";
  import { useRouter } from 'vue-router'
  import { useStore } from "src/stores/store";
  
  export default {
    components: { FormPer, SearchFiltering },
    setup() {
      const router = useRouter();
      // Gestion des notifications et loading process
      const $q = useQuasar();
      let timer
      onBeforeUnmount(() => {
          if (timer !== void 0) {
            clearTimeout(timer)
            $q.loading.hide()
          }
        })
      const store = useStore();
      // Les variables
      const dialog = ref(false);
      const position = ref("top");
      const data_groupement = [];
        // infos pere
        const nom_p = ref("")
        const postnom_p = ref("")
        const prenom_p = ref("")
        const l_naiss_p = ref("")
        const d_naiss_p = ref("")
        const groupement_p = ref("")
        const pays_p = ref("");
        const ville_p = ref("");
        const commune_p = ref("");
        const quartier_p = ref("");
        const avenue_p = ref("")
        const num_maison_p = ref("")
        // infos de la mere
        const nom_m = ref("")
        const postnom_m = ref("")
        const prenom_m = ref("")
        const l_naiss_m = ref("")
        const d_naiss_m = ref("")
        const groupement_m = ref("")
        const pays_m = ref("");
        const ville_m = ref("");
        const commune_m = ref("");
        const quartier_m = ref("");
        const avenue_m = ref("")
        const num_maison_m = ref("")
        // infos de la nouvelle personne
        const nom = ref("")
        const postnom = ref("")
        const  prenom = ref("")
        const sexe = ref("")
        const l_naiss = ref("")
        const d_naiss = ref("")
        const couleur_oeil = ref("")
        const groupement = ref("")
        const pays = ref("");
        const ville = ref("");
        const commune = ref("");
        const quartier = ref("");
        const avenue = ref("")
        const num_maison = ref("")
  
        let persistent = false;
  
      const groupe_type = [];
      const groupe_Types =[];
      let groupement_Type = ref([]);
      onMounted(() => {
        // store.afficherNaissance();
        store.afficherGroupement();
      });
      store.afficherGroupement().then((rest) => {
        rest.forEach((element) => {
          let datas = {};
          datas.label = element.nom_groupement;
          datas.value = element.id;
          data_groupement.push(datas);
        });
      });
      const options_groupement = ref([data_groupement]);
      // Enregistrement d'une nouvelle personne
      const submitForm = ()=> {
      // circular progress
      $q.loading.show({
      message: 'Requête en cours.<br/><span class="text-amber text-italic">Veuillez patienter...</span>',
              html: true
            })
            // hiding in 3s
            timer = setTimeout(() => {
              const xperson = {
                nom_p:nom_p.value,
                postnom_p:postnom_p.value,
                prenom_p:prenom_p.value,
                d_naiss_p:d_naiss_p.value,
                l_naiss_p:l_naiss_p.value,
                id_groupement_p:groupement_p.value.value,
                pays_p:pays_p.value,
                ville_p:ville_p.value,
                commune_p:commune_p.value,
                quartier_p:quartier_p.value,
                id_avenue_p:avenue_p.value,
                num_maison_p:num_maison_p.value,
                nom_m:nom_m.value,
                postnom_m:postnom_m.value,
                prenom_m:prenom_m.value,
                d_naiss_m:d_naiss_m.value,
                l_naiss_m:l_naiss_m.value,
                id_groupement_m:groupement_m.value.value,
                pays_m:pays_m.value,
                ville_m:ville_m.value,
                commune_m:commune_m.value,
                quartier_m:quartier_m.value,
                id_avenue_m:avenue_m.value,
                num_maison_m:num_maison_m.value,
                nom:nom.value,
                postnom:postnom.value,
                prenom:prenom.value,
                sexe:sexe.value,
                d_naiss:d_naiss.value,
                l_naiss:l_naiss.value,
                id_groupement:groupement.value.value,
                pays:pays.value,
                ville:ville.value,
                commune:commune.value,
                quartier:quartier.value,
                id_avenue:avenue.value,
                num_maison:num_maison.value,
                couleur_oeil:couleur_oeil.value,
                id_partenaire:1,
              };
              console.log(xperson);
              store.ajouterPersonne_step(
                xperson.nom_p,
                xperson.postnom_p,
                xperson.prenom_p,
                xperson.d_naiss_p,
                xperson.l_naiss_p,
                xperson.id_groupement_p,
                xperson.pays_p,
                xperson.ville_p,
                xperson.commune_p,
                xperson.quartier_p,
                xperson.id_avenue_p,
                xperson.num_maison_p,
                xperson.nom_m,
                xperson.postnom_m,
                xperson.prenom_m,
                xperson.d_naiss_m,
                xperson.l_naiss_m,
                xperson.id_groupement_m,
                xperson.pays_m,
                xperson.ville_m,
                xperson.commune_m,
                xperson.quartier_m,
                xperson.id_avenue_m,
                xperson.num_maison_m,
                xperson.nom,
                xperson.postnom,
                xperson.prenom,
                xperson.d_naiss,
                xperson.sexe,
                xperson.l_naiss,
                xperson.id_groupement,
                xperson.pays,
                xperson.ville,
                xperson.commune,
                xperson.quartier,
                xperson.id_avenue,
                xperson.num_maison,
                xperson.couleur_oeil,
                xperson.id_partenaire,
              );
              persistent = true;
  
                $q.loading.hide()
                timer = void 0
            }, 2000)
        }
    
      return {
        lists: [
        {
          id: 1,
          title: "02",
          subtitle: "Personnes condamnées",
          icon: "🏛️",
        },
        {
          id: 2,
          title: "Casier Judiciare",
          subtitle: "Formulaire d'Ajout",
          icon: "👨‍⚖️",
        },
      ],
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
        data_groupement,
        options_groupement,
        filterFn(val, update) {
          if (val === "") {
            update(() => {
              options_groupement.value = data_groupement;
            });
            return;
          }
          update(() => {
            const needle = val.toLowerCase();
            options_groupement.value = data_groupement.filter(
              (v) => v.label.toLowerCase().indexOf(needle) > -1
            );
          });
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
    computed: {
      isNextButtonDisabled() {
        return !(
        this.nom_p &&
        this.postnom_p &&
        this.prenom_p &&
        this.l_naiss_p &&
        this.d_naiss_p &&
        this.groupement_p &&
        this.pays_p &&
        this.ville_p &&
        this.commune_p &&
        this.quartier_p &&
        this.avenue_p &&
        this.num_maison_p
        );
      },
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
</style>
