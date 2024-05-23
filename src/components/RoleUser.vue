<template>
  <q-page>
    <q-select
      v-model="selectedRole"
      :options="roleOptions"
      label="Sélectionner un rôle"
      emit-value
      map-options
    />
    <div class="q-pa-md">
      <q-btn @click="generateReport" label="Générer Rapport" color="primary" />
    </div>

    <q-card v-if="reportGenerated">
      <q-card-section>
        <p class="text-bold text-justify-end">
          Rapport pour le rôle sélectionné :
          <span class="text-weight-light">{{ selectedRole }}</span>
        </p>
        <!-- Insérer ici le contenu du rapport -->
        <p>Liste des utilisateurs avec le rôle {{ selectedRole }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
/* Add mobile responsiveness styles here */
@media only screen and (max-width: 600px) {
  .q-pa-md {
    padding: 10px; /* Adjust padding for smaller screens */
  }
}
</style>

<script>
export default {
  data() {
    return {
      selectedRole: null,
      roleOptions: [
        { label: "Administrateur", value: "Administrateur" },
        { label: "Utilisateur Standard", value: "Standard" },
        // Ajoutez d'autres options de rôles au besoin
      ],
      reportGenerated: false,
    };
  },
  methods: {
    generateReport() {
      this.reportGenerated = true;
      // Exemple de console.log pour afficher le rôle sélectionné
      console.log(`Rapport pour le rôle ${this.selectedRole} généré.`);
    },
  },
};
</script>
