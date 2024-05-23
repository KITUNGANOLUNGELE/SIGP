<template>
  <div class="app">
    <form @submit.prevent="addEntry" @reset="resetForm" class="form">
      <div class="form-group">
        <label for="name">Nom:</label>
        <input
          type="text"
          v-model="entry.name"
          id="name"
          required
          placeholder="Entrez le nom"
        />
      </div>
      <div class="form-group">
        <label for="type">Type (Naissance/Mariage/Décès):</label>
        <input
          type="text"
          v-model="entry.type"
          id="type"
          required
          placeholder="Entrez le type"
        />
      </div>
      <div class="form-group">
        <label for="date">Date:</label>
        <input
          type="date"
          v-model="entry.date"
          id="date"
          required
          placeholder="Sélectionnez la date"
        />
      </div>
      <div class="form-actions">
        <button type="submit">Ajouter</button>
        <button type="reset">Réinitialiser</button>
      </div>
    </form>

    <div class="table">
      <h5 class="text-grey-9 text-h5 text-weight-bold">
        Tableau du Rapport sur les naissances/Mariage/Décès
      </h5>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>postnom</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(naissance, index) in naissances" >
            <td>{{ naissance.nom_enfant }}</td>
            <td>{{ naissance.prenom_enfant }}</td>
            <td>{{ naissance.naissance_enfant }}</td>
            <td>
              <button @click="editEntry(index)" title="Modifier">
                <i class="fa fa-pencil"></i>
              </button>
              <button @click="deleteEntry(index)" title="Supprimer">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import {useStore} from "../stores/store";
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const store=useStore();
    const naissances = computed(() => {
  return store.naissances;
});
    onMounted(() => {
  store.afficherNaissance();
});
onMounted(()=>{
store.getNaissances;
});
    return {
      naissances,
      entry: {
        name: "",
        type: "",
        date: "",
      },
      rows: [],
    };
  },
  methods: {
    addEntry() {
      this.rows.push({ ...this.entry });
      this.resetForm();
    },
    resetForm() {
      this.entry.name = "";
      this.entry.type = "";
      this.entry.date = "";
    },
    editEntry(index) {
      // Implement the logic for editing an entry
      console.log("Edit entry at index", index);
    },

    deleteEntry(index) {
      // Implement the logic for deleting an entry
      console.log("Delete entry at index", index);
    },
  },
};
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
}

.form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-actions {
  text-align: right;
}

button {
  background-color: #0e0e0e;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}

.table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #036ce4;
  color: white;
}
.button {
  background-color: #4caf50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.fa {
  font-size: 16px;
}
</style>
