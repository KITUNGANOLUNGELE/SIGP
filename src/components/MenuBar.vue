<template>
  <div class="q-pa-md">
    <q-btn-dropdown flat color="primary" label="Menu" @click="onMainClick">
      <q-list class="q-pa-md">
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar icon="location_city" color="pink-6" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Commune/Ville</q-item-label>
            <q-item-label caption>Menu</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="menu" color="pink-6" />
          </q-item-section>
        </q-item>
        <q-separator inset="item-thumbnail" />
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar
              icon="admin_panel_settings"
              color="green-13"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Administrateur</q-item-label>
            <q-item-label caption>Menu</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="menu" color="green-13" />
          </q-item-section>
        </q-item>
        <q-separator inset="item-thumbnail" />
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar icon="diversity_3" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Partenaire</q-item-label>
            <q-item-label caption>Menu</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="menu" color="primary" />
          </q-item-section>
        </q-item>
        <q-separator inset="item-thumbnail" />
        <q-item clickable v-close-popup @click="onItemClick">
          <q-item-section avatar>
            <q-avatar
              icon="settings_accessibility"
              color="secondary"
              text-color="white"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Utilisateur</q-item-label>
            <q-item-label caption>Menu</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon name="menu" color="secondary" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      onMainClick() {
        // console.log('Clicked on main button')
      },

      onItemClick() {
        // console.log('Clicked on an Item')
      },
    };
  },
};
</script>
