<template>
  <q-page>
    <q-card>
      <q-card-section>
        <h2>Menu Rapport Utilisateurs par Catégorie de Rôle</h2>
        <q-select
          v-model="selectedRole"
          :options="roleOptions"
          label="Sélectionner un rôle"
          emit-value
          map-options
        />
        <q-btn
          @click="generateReport"
          label="Générer Rapport"
          color="primary"
        />
      </q-card-section>
    </q-card>

    <q-card v-if="reportGenerated">
      <q-card-section>
        <h3>Rapport pour le rôle sélectionné : {{ selectedRole }}</h3>
        <!-- Insérer ici le contenu du rapport -->
        <p>Exemple : Liste des utilisateurs avec le rôle {{ selectedRole }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

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
      // Ici, vous pouvez ajouter la logique pour générer le rapport en fonction du rôle sélectionné
      // Par exemple, récupérer les utilisateurs ayant le rôle sélectionné depuis une API
      // Une fois le rapport généré, définissez reportGenerated sur true pour afficher le rapport
      this.reportGenerated = true;
      // Exemple de console.log pour afficher le rôle sélectionné
      console.log(`Rapport pour le rôle ${this.selectedRole} généré.`);
    },
  },
};
</script>
