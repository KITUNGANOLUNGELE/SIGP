<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Dashboard Personne</h1>
      <router-link to="/DashPart" class="text-black">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Dashboard" />
          <q-breadcrumbs-el label="Dashboard Personne" icon="home" />
        </q-breadcrumbs>
      </router-link>
    </div>
    <ul class="box-info q-pa-md">
      <li class="aos-item" data-aos="zoom-in-right">
        <q-icon class="bx" name="fa-solid fa-plus" />
        <span class="text">
          <h3>{{ store.getPersonnes }}</h3>
          <p>Persones Ajoutées</p>
        </span>
      </li>
      <!-- <li class="aos-item" data-aos="zoom-in">
        <q-icon @click="open('top')" class="bx" name="person_add" />
        <span class="text">
          <h3>Ajouter</h3>
          <p>Formulaire Ajout Personne</p>
        </span>
      </li> -->
    </ul>

    <!-- Dialogue pour ajouter une Catégorie de Comptes Adm -->
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="black" />
        <q-card-section class="text-center q-pa-md">
          <div class="text-weight-bold">Ajouter une Personne</div>
          <div class="q-pa-md">
            <q-form @submit="submitForm">
              <q-input
                dense
                v-model="nom"
                label="Nom"
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
              />
              <q-input
                dense
                v-model="date_naissance"
                label="Date de Naissance"
                type="date"
                :rules="[(val) => !!val || 'Champ requis']"
              />
              <!-- <q-input
                dense
                v-model="sexe"
                label="sexe"
                type="text"
                required
              /> -->
              <q-select
                v-model="sexe"
                :options="options"
                label="Genre"
                dense
                :rules="[(val) => !!val || 'Champ requis']"
              />
              <q-input
                dense
                v-model="lieu_naissance"
                label="Lieu de Naissance"
                type="text"
                :rules="[(val) => !!val || 'Champ requis']"
              />
              <q-select
                dense
                v-model="id_partenaire"
                use-input
                input-debounce="0"
                label="entrer le nom du partenaire"
                :options="options_partenaire"
                @filter="filterFn2"
                :rules="[(val) => !!val || 'Champ requis']"
                style="width: 100%"
                behavior="menu"
              />
              <q-select
                dense
                v-model="id_groupement"
                use-input
                input-debounce="0"
                label="entrer le nom du groupement"
                :options="options_groupement"
                @filter="filterFn"
                :rules="[(val) => !!val || 'Champ requis']"
                style="width: 100%"
                behavior="menu"
              />
              <q-select
                dense
                v-model="id_avenue"
                use-input
                input-debounce="0"
                label="entrer le nom de l'avenue"
                :options="options_avenue"
                @filter="filterFn1"
                :rules="[(val) => !!val || 'Champ requis']"
                style="width: 100%"
                behavior="menu"
              />
              <q-input
                dense
                v-model="num_maision"
                label="numero du menage"
                type="number"
                :rules="[(val) => !!val || 'Champ requis']"
              />
              <br />
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
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section>
          <!-- Contenu du modal pour modifier un utilisateur -->
          <q-form @submit="updateUser" class="q-pa-md">
            <q-input
              v-model="editedUser.designation"
              label="Designation"
              dense
            />
            <q-input v-model="editedUser.role" label="Role" dense />
            <br />
            <q-btn
              label="Modifier"
              class="q-pa-mr"
              type="submit"
              color="primary"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
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
          enregistrement de {{ nom }} reussi
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <SearchFiltering />
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from "vue";
// Route vers les Animation On ScrollBar (AOS)
import AOS from "aos";
import "aos/dist/aos.css";
import { useStore } from "src/stores/store";
import SearchFiltering from "src/components/Ajouts/SearchFiltering.vue";
// Route vers l'affichage du tableau des Administrateurs (Modifier et Supprimer)

export default {
  components: { SearchFiltering },
  setup() {
    const store = useStore();
    const nom = ref("");
    const postnom = ref("");
    const prenom = ref("");
    const date_naissance = ref("");
    const sexe = ref("");
    const lieu_naissance = ref("");
    const id_partenaire = ref(null);
    const id_groupement = ref(null);
    const id_avenue = ref(null);
    const num_maision = ref("");
    const dialog = ref(false);
    const position = ref("top");
    const options = ref("");
    const data_groupement = [];
    const data_avenue = [];
    const data_partenaire = [];
    const personnes = computed(() => {
      return store.personnes;
    });
    onMounted(() => {
      store.afficherPersonnes();
      store.afficherGroupement();
      store.afficherAvenues();
      store.afficherPartenaires();
    });
    store.afficherGroupement().then((rest) => {
      rest.forEach((element) => {
        let datas = {};
        datas.label = element.nom_groupement;
        datas.value = element.id;
        data_groupement.push(datas);
      });
    });
    store.afficherAvenues().then((rest) => {
      rest.forEach((element) => {
        let datas = {};
        datas.label = element.nom_avenue;
        datas.value = element.id;
        data_avenue.push(datas);
      });
    });
    store.afficherPartenaires().then((rest) => {
      rest.forEach((element) => {
        let datas = {};
        datas.label = element.nom_partenaire;
        datas.value = element.id;
        data_partenaire.push(datas);
      });
    });
    const options_groupement = ref([data_groupement]);
    const options_avenue = ref([data_avenue]);
    const options_partenaire = ref([data_partenaire]);
    const persistent = ref(false);
    return {
      dialog,
      position,
      store,
      personnes,
      nom,
      postnom,
      prenom,
      date_naissance,
      sexe,
      lieu_naissance,
      id_partenaire,
      id_groupement,
      id_avenue,
      num_maision,
      options_groupement,
      options_avenue,
      options_partenaire,
      persistent,
      options: ["F", "M"],
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
      filterFn1(val, update) {
        if (val === "") {
          update(() => {
            options_avenue.value = data_avenue;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          options_avenue.value = data_avenue.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      filterFn2(val, update) {
        if (val === "") {
          update(() => {
            options_partenaire.value = data_partenaire;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          options_partenaire.value = data_partenaire.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
      search: "",
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
  methods: {
    submitForm() {
      const xperson = {
        nom: this.nom,
        postnom: this.postnom,
        prenom: this.prenom,
        date_naissance: this.date_naissance,
        sexe: this.sexe,
        lieu_naissance: this.lieu_naissance,
        id_partenaire: this.id_partenaire.value,
        id_groupement: this.id_groupement.value,
        id_avenue: this.id_avenue.value,
        num_maison: this.num_maison,
      };
      this.store.ajouterPersonnes(
        xperson.nom,
        xperson.postnom,
        xperson.prenom,
        xperson.date_naissance,
        xperson.sexe,
        xperson.lieu_naissance,
        xperson.id_partenaire,
        xperson.id_groupement,
        xperson.id_avenue,
        xperson.num_maison
      );
      this.persistent = true;
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
