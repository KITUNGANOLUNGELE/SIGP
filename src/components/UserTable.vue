<template>
  <q-page>
    <div class="q-pa-md">
      <q-toolbar class="aos-item" data-aos="zoom-out-up">
        <q-input v-model="search" label="Rechercher" dense flat />
      </q-toolbar>

      <q-table
        data-aos="zoom-in-right"
        class="my-sticky-dynamic aos-item"
        flat
        bordered
        title="Voici la liste des Utilisateus "
        :columns="columns"
        :loading="loading"
        virtual-scroll
        :virtual-scroll-item-size="48"
        :virtual-scroll-sticky-size-start="48"
        :pagination="pagination"
        :rows-per-page-options="[0]"
        @virtual-scroll="onScroll"
        :rows="usersx"
        row-key="id"
        :search="search"
      >
        <template v-slot:body-cell-action="props">
          <q-btn-group flat>
            <q-btn
              @click="viewUser(props.row)"
              dense
              flat
              round
              color="grey"
              icon="visibility"
            />
            <q-btn
              @click="editUser(props.row)"
              dense
              flat
              round
              color="success"
              icon="edit"
            />
            <q-btn
              @click="deleteUser(props.row)"
              dense
              flat
              round
              color="red"
              icon="delete"
            />
          </q-btn-group>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section>
          <!-- Contenu du modal pour modifier un utilisateur -->
          <q-form @submit="updateUser" class="q-pa-md">
            <q-input v-model="editedUser.nom" label="Nom" dense />
            <q-input v-model="editedUser.postNom" label="PostNom" dense />
            <q-input v-model="editedUser.date" label="Date" type="date" dense />
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
  </q-page>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { ref, onMounted, computed } from "vue";
import {useStore} from "../stores/store";
import { storeToRefs } from 'pinia';
export default {
  mounted() {
    AOS.init();
  },
  setup() {
    const store=useStore();
    const users = computed(() => {
  return store.users;
});
const usersx= users.value.forEach(user => {
   {id:user.id;nom:user.nom;postNom:user.postnom;date:user.date_naissance }
        
});
    return {
      search: "",
     usersx, 
      columns: [
        { name: "nom", label: "Nom", align: "left", field: "nom" },
        { name: "postNom", label: "PostNom", align: "left", field: "postNom" },
        { name: "date", label: "Date", align: "left", field: "date" },
        { name: "action", label: "Action", align: "left" },
      ],
      showModal: false,
      editedUser: {
        id: null,
        nom: "",
        postNom: "",
        date: "",
      },
    };
  },
  methods: {
    viewUser(user) {
      // Logique pour afficher les détails de l'utilisateur
      console.log("Voir utilisateur:", user);
    },
    editUser(user) {
      this.editedUser = { ...user };
      this.showModal = true;
    },
    updateUser() {
      // Logique pour mettre à jour l'utilisateur
      console.log("Utilisateur mis à jour:", this.editedUser);
      this.showModal = false;
    },
    deleteUser(user) {
      // Logique pour supprimer l'utilisateur
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users.splice(index, 1);
        console.log("Utilisateur supprimé:", user);
      }
    },
  },
};
</script>
