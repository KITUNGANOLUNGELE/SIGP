<template>
  <q-page>
    <q-form @submit="generateReport">
      <q-field label="Numéro de dossier" v-model="dossierNumber" />
      <q-field label="Nom" v-model="nom" />
      <q-field label="Prénom" v-model="prenom" />
      <q-btn type="submit" label="Générer Rapport" color="primary" />
    </q-form>

    <q-card v-if="reportGenerated">
      <q-card-section>
        <h2 class="report-title">Rapport sur le Casier Judiciaire</h2>
        <p><strong>Numéro de dossier:</strong> {{ dossierNumber }}</p>
        <p><strong>Nom:</strong> {{ nom }}</p>
        <p><strong>Prénom:</strong> {{ prenom }}</p>
        <!-- Ajoutez d'autres informations du casier judiciaire ici -->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      dossierNumber: "",
      nom: "",
      prenom: "",
      reportGenerated: false,
    };
  },
  methods: {
    generateReport() {
      this.reportGenerated = true;
    },
  },
};
</script>

<style scoped>
/* Styles généraux ici */
.q-field {
  margin-bottom: 20px;
}
.q-btn {
  margin-top: 20px;
}

/* Media query pour les appareils mobiles */
@media only screen and (max-width: 600px) {
  /* Ajoutez vos styles réactifs pour les appareils mobiles ici */
  .q-field {
    width: 100%;
  }
  .q-btn {
    width: 100%;
  }
  /* Autres styles réactifs */
}
@media only screen and (max-width: 600px) {
  .report-title {
    font-size: 1.5em; /* Ajustez la taille de la police selon vos besoins */
    /* Ajoutez d'autres styles pour le titre sur les écrans de petite taille ici */
  }
}
</style>
