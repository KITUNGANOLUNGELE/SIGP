<template>
  <div class="flex flex-center column q-mb-md">
    <h6 class="text-weight-bolder q-pa-md">SIGP</h6>
  </div>
  <div class="flex flex-center column q-mt-sm q-mb-md">
    <q-list>
      <!-- First -->
      <q-item
        clickable
        :active="link === 'user'"
        @click="link = 'user'"
        active-class="border"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="dashboard" />
        </q-item-section>
      </q-item>

      <q-item
        clickable
        :active="link === 'search'"
        @click="open('right')"
        active-class="border"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="fas fa-search" />
        </q-item-section>
        <!-- Search bouton -->
        <q-dialog v-model="dialog" :position="position">
          <q-card style="width: 350px">
            <q-linear-progress :value="0.6" color="black" />

            <q-card-section class="row items-center no-wrap">
              <q-input
                flat
                dense
                v-model="searchQuery"
                @input="handleSearchInput"
                placeholder="Rechercher..."
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>

              <q-space />
              <q-list>
                <q-item v-for="(item, index) in filteredItems" :key="index">
                  <q-item-section>{{ item }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- Fin search bouton -->
      </q-item>

      <router-link to="/">
        <q-item
          clickable
          :active="link === 'logout'"
          @click="link = 'logout'"
          active-class="border"
        >
          <q-item-section avatar class="flex flex-center column">
            <q-icon name="logout" />
          </q-item-section>
        </q-item>
      </router-link>
      <q-item
        clickable
        :active="link === 'setting'"
        @click="link = 'setting'"
        active-class="border"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon name="settings" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div
    style="
      position: absolute;
      bottom: 20px;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
    "
  >
    <div class="text-overline"><q-icon name="bell" /></div>
    <router-link to="/">
      <div class="text-overline"><q-icon name="logout" />" /></div>
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const dialog = ref(false);
    const position = ref("top");
    const leftDrawerOpen = ref(false);
    return {
      link: ref("user"),
      leftDrawerOpen,
      dialog,
      position,

      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
      // Rechercher
      searchQuery: "",
      items: ["Item 1", "Item 2", "Item 3", "Another Item", "Something Else"],
      timer: null,
    };
  },
});
</script >
<style>
.border {
  background: #60c471;
  border-radius: 50%;
}
.q-item__section--side {
  padding-right: 0px !important;
}
.q-item__section--avatar {
  color: black !important;
}
.q-item {
  padding: 16px 0px !important;
}
.row .q-input {
  flex-grow: 1;
  padding: 0 16px;
  height: 100%;
  border: none;
  background: rgb(197, 195, 195);
  border-radius: 36px 0 0 36px;
  outline: none;
  width: 100%;
  color: rgb(39, 38, 38);
}
</style>

