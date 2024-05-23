<template>
  <div class="q-pa-sm">
    <q-form @submit.prevent="submitForm">
      <!-- <q-select
        v-model="role"
        :options="userTypes"
        label="Rôle"
        dense
        required
      /> -->
      <q-input dense v-model="username" label="username" type="text" required />
      <q-input dense v-model="mdp" label="mot de passe" type="text" required />
      <q-input dense v-model="id" label="id" type="text" required />
      <q-select
        v-model="noms"
        :options="personne"
        label="nom de la personne"
        emit-value
        map-options
        dense
        required
      /> 
      <!-- <q-input
        dense
        v-model="Lieu"
        label="Lieu de Naissance"
        type="text"
        required
      />
      <q-input
        dense
        v-model="dates"
        label="Date de Naissance"
        type="date"
        required
      /> -->
      <!-- <q-select
        label="Sélectionnez une localité"
        v-model="selectedLocality"
        :options="localities"
        emit-value
        map-options
        dense
        required
      />
      <q-input dense v-model="Prenom" label="Adresse" type="text" required /> -->
      <div class="q-pa-md">
      <q-btn
        style="border-radius: 8px"
        color="dark"
        type="submit"
        rounded
        size="md"
        label="créer un compte"
        no-caps
        class="full-width"
      ></q-btn>
    </div>
    </q-form>
  </div>
</template>

<script>
import { store } from "quasar/wrappers";
import { ref, onMounted, computed } from "vue";
import {useStore} from "../stores/store";
import { storeToRefs } from 'pinia';
export default {
  name: "LocalitiesForm",
  setup() {
    const store=useStore();
    const id=ref('');
    const mdp=ref('');
    const username=ref('');
    const personne=ref('');
    const personnes = computed(() => {
  return store.personnes;

});
    // const Genre =ref('');
    // const Lieu=ref('');
    // const dates=ref('');
    // const role=ref('');
    // const selectedLocality=ref('');
    // function submitForm(){
    //        store.ajouterUser(nom,postnom,Prenom,Genre,Lieu,date,role,selectedLocality)
    // };
   return {
    id,
    username,
    mdp,
    store,
     personnes,
personne,
    };
  },
  mounted() {

    // Chargez les localités au moment du montage du composant
    // this.getpersonnes();
  },
  methods: {
    // Fonction pour récupérer les localités depuis une source de données (API, fichier JSON, etc.)
    // getLocalities() {
    //   // Ici, vous devez implémenter la logique pour récupérer les localités depuis votre source de données
    //   // Par exemple, si vous avez une liste de localités stockée dans un tableau :
    //   const congoLocalities = [
    //     "Kinshasa",
    //     "Lubumbashi",
    //     "Mbuji-Mayi",
    //     // ... Ajoutez les autres localités de la RDC ici
    //   ];

    //   // Assurez-vous d'ajouter ces localités à la propriété localities du composant
    //   this.localities = congoLocalities.map((locality) => ({
    //     label: locality,
    //     value: locality,
    //   }));
    // },
    getpersonnes(){
    const listepersonnes = [
        personnes.value
        // ... Ajoutez les autres localités de la RDC ici
      ];

    //   // Assurez-vous d'ajouter ces localités à la propriété localities du composant
      this.personne = listepersonnes.map((personne) => ({
        label: personne.nom,
        value: personne.id,
      }));
    },
    submitForm() {
      // Vous pouvez ajouter ici la logique pour traiter le formulaire lors thide la soumission
      // Par exemple, afficher la localité sélectionné
        // this.store.ajouterUser(this.id,this.mdp,this.username);
        const user = {
          'id_personne' : this.id,
          'email' : this.username,
          'mdp' : this.mdp
        }
        this.store.ajouterUser(user.id_personne, user.email, user.mdp, user)
        // Autres actions à effectuer avec la localité sélectionnée
    },
  },
};
</script>

<style>
/* Styles optionnels pour le formulaire ou les éléments Quasar */
</style>
