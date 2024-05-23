<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>PostNom</th>
        <th>Prenom</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="index" v-for="(naissance, index) in naissances">
        <td>{{naissance.id}}</td>
        <td>{{naissance.nom_enfant}}</td>
        <td>{{naissance.postnom_enfant}}</td>
        <td>{{naissance.prenom_enfant}}</td>
        <td class="action-icons">
          <!-- <a href="#" class="edit-icon" icon="edit" title="Modifier"></a>
          <a href="#" class="delete-icon" icon="delete" title="Supprimer"></a> -->
          <div class="text-Grey q-gutter-md">
            <q-icon
              v-for="size in ['sm']"
              :key="size"
              :size="size"
              name="edit"
            />
          </div>
          <div class="text-red q-gutter-md">
            <q-icon
              v-for="size in ['sm']"
              :key="size"
              :size="size"
              name="delete"
            />
          </div>
        </td>
      </tr>
      <!-- Ajouter d'autres lignes au besoin -->
    </tbody>
  </table>
</template>
<script>
import { useStore } from 'src/stores/store';
import { computed, onMounted } from 'vue';
export default {
  setup() {
    const store = useStore();
    const naissances=computed(()=>{
      return store.naissances;
    });
    onMounted(()=>{
      store.afficherNaissance();
    })
    return {
      store,
      naissances,
    };
  },
}
</script>

<style scoped>
/* Styles responsifs pour les mobiles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

td:last-child {
  text-align: center;
}

.action-icons {
  display: flex;
  justify-content: space-around;
}

.action-icons a {
  text-decoration: none;
  color: #333;
}

.edit-icon::before {
  content: "\270E";
}

.delete-icon::before {
  content: "\2716";
}

@media (max-width: 600px) {
  th,
  td {
    font-size: 14px;
  }

  .action-icons::before {
    font-size: 14px;
  }
}
</style>
