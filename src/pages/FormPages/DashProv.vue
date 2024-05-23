<template>
  <q-layout view="hHh lpR fFf" :class="{ 'q-dark': darkMode }">
    <q-header elevated class="bg-grey-1 text-black">
      <q-toolbar>
        <q-btn dense flat round icon="dashboard" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-form action="#">
            <div class="form-input">
              <input type="search" placeholder="Rechercher..." />
              <button type="submit" class="search-btn">
                <q-icon class="bx" name="search" />
              </button>
            </div>
          </q-form>
          <!-- Menu -->
        </q-toolbar-title>

        <input type="checkbox" id="switch-mode" hidden @click="toggleDarkMode" />
        <label for="switch-mode" class="switch-mode"></label>
        <a href="#" class="notification">
          <q-icon class="bx" name="notifications" />
          <span class="num">8</span>
        </a>
        <a href="#" class="profile"> </a>
        <q-btn dense flat round icon="settings" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      :width="180"
      side="left"
      class="bg-grey-2"
      :content-class="{ 'bg-dark': darkMode }"
    >
      <AsideIn />
      <!-- drawer content -->
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      :width="90"
      side="right"
      class="bg-grey-2"
    >
      <SideBar />
      <!-- drawer content -->
    </q-drawer>
    <q-page-container class="bg-grey-4">
      <FormProvince />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import SideBar from "src/components/SideBar.vue";
import AsideIn from "src/components/Formulaires/AsideIn.vue";
import FormProvince from "src/components/Formulaires/FormProvince.vue";

export default {
  props: {},
  components: { SideBar, AsideIn, FormProvince },
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    return {
      drawer: false,
      darkMode: false,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.$q.dark.set(this.darkMode);
    },
  },
};
</script>
<style lang="scss">
.q-form {
  max-width: 400px;
  width: 100%;
  margin-right: auto;
}
.q-form .form-input {
  display: flex;
  align-items: center;
  height: 36px;
}
.q-form .form-input input {
  flex-grow: 1;
  padding: 0 16px;
  height: 100%;
  border: none;
  background: #eee;
  border-radius: 36px 0 0 36px;
  outline: none;
  width: 100%;
  color: #342e37;
}
.q-form .form-input button {
  width: 36px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #3c91e6;
  color: #f9f9f9;
  font-size: 18px;
  border: none;
  outline: none;
  border-radius: 0 36px 36px 0;
  cursor: pointer;
}
.notification {
  font-size: 20px;
  position: relative;
}
.notification .num {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #f9f9f9;
  background: #db504a;
  color: #f9f9f9;
  font-weight: 700;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.switch-mode {
  display: block;
  min-width: 50px;
  height: 25px;
  border-radius: 25px;
  background: #eee;
  cursor: pointer;
  position: relative;
}
.switch-mode::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  bottom: 2px;
  width: calc(25px - 4px);
  background: #3c91e6;
  border-radius: 50%;
  transition: all 0.3s ease;
}
#switch-mode:checked + .switch-mode::before {
  left: calc(100% - (25px - 4px) - 2px);
}
.bg-dark {
  background-color: #121212; /* Couleur de fond sombre */
}
</style>
