<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Pays</h1>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el label="Accueil" icon="home" />
      </q-breadcrumbs>
    </div>
    <ul class="box-info q-pa-md">
      <li class="aos-item" data-aos="zoom-in-right">
        <q-icon class="bx" name="fa-solid fa-plus" />
        <span class="text">
          <h3>{{ store.getPaysNombre }}</h3>
          <p>Pays Ajoutées</p>
        </span>
      </li>
      <li class="aos-item" data-aos="zoom-in">
        <q-icon @click="open('top')" class="bx" name="person_add" />
        <span class="text">
          <h3>Pays</h3>
          <p>Formulaire Ajout Pays</p>
        </span>
      </li>
    </ul>

    <!-- Dialogue pour ajouter une Catégorie de Comptes Adm -->
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="black" />
        <q-card-section class="text-center q-pa-md">
          <div class="text-weight-bold">Ajouter Pays</div>
          <q-form @submit.prevent="submitForm">
            <q-input
              dense
              v-model="xnom_pays"
              label="Nom Pays"
              type="text"

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

        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Fin Dialogue -->
    <!-- TABLEAU (Avec Option de Suppression et Modification) -->
    <div class="q-pa-md">
      <q-toolbar class="aos-item" data-aos="zoom-out-up">
        <q-input v-model="search" label="Rechercher" dense flat />
      </q-toolbar>

      <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Id pays</th>
          <th class="text-left">designation pays</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(pay, index) in pays">
          <td class="text-left">{{ pay.id }}</td>
          <td class="text-left">{{ pay.nom_pays }}</td>

        </tr>
      </tbody>
      </q-markup-table>
    </div>

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
  </q-layout>
</template>

<script>
import { ref, onMounted, computed } from "vue";
// Route vers les Animation On ScrollBar (AOS)
import AOS from "aos";
import "aos/dist/aos.css";
import { useStorePays } from "src/stores/storePays";
import {usePaysN } from "src/stores/storePaysN";
// Route vers l'affichage du tableau des Administrateurs (Modifier et Supprimer)

export default {
 components: {  },
  setup() {
    const store=useStorePays();
    const dialog = ref(false);
    const position = ref("top");
    const xnom_pays=ref('');
    const p = usePaysN();
    const pays = computed(() => {
  return store.pays;
});
onMounted(() => {
  store.afficherPays();
});
    return {
      pays,
      dialog,
      position,
      xnom_pays,
      store,
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
  mounted(){
  AOS.init();
  },
 methods:{
  submitForm(){
    const xpays={
     'nomPays': this.xnom_pays
    }
    this.store.ajoutPays(xpays.nomPays)
}
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
