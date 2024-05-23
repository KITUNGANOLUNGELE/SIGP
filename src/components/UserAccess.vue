<template>
  <q-page>
    <p class="text-justify-end">
      Veuillez sélectionner l'utilisateur pour révoquer ou accorder le droit
      d'accès ainsi que la permission.
    </p>
    <div class="row">
      <div class="col">
        <q-select
          dense
          v-model="selectedUser"
          :options="users"
          label="Sélectionner l'utilisateur"
          emit-value
          map-options
        />
      </div>
      <div class="col">
        <q-select
          dense
          v-model="selectedPermission"
          :options="permissions"
          label="Sélectionner la permission"
          emit-value
          map-options
        />
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-btn label="Revoke" @click="revokeAccess" color="red" />
      <q-btn label="Grant" @click="grantAccess" color="primary" />
    </div>
  </q-page>
</template>

<style scoped>
@media screen and (max-width: 600px) {
  .row {
    flex-direction: column;
  }

  .col {
    margin-bottom: 10px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      selectedUser: null,
      selectedPermission: null,
      users: ["Utilisateur 1", "Utilisateur 2", "Utilisateur 3"],
      permissions: ["Permission 1", "Permission 2", "Permission 3"],
    };
  },
  methods: {
    revokeAccess() {
      if (this.selectedUser && this.selectedPermission) {
        console.log(
          `Accès révoqué pour ${this.selectedUser} - ${this.selectedPermission}`
        );
        this.showNotification("Accès révoqué avec succès");
      } else {
        this.showNotification("Sélectionnez un utilisateur et une permission");
      }
    },
    grantAccess() {
      if (this.selectedUser && this.selectedPermission) {
        console.log(
          `Accès accordé pour ${this.selectedUser} - ${this.selectedPermission}`
        );
        this.showNotification("Accès accordé avec succès");
      } else {
        this.showNotification("Sélectionnez un utilisateur et une permission");
      }
    },
    showNotification(message) {
      this.$q.notify({
        message: message,
        color: "positive",
        position: "top",
        icon: "check_circle",
      });
    },
  },
};
</script>
