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
      <q-item>
        <q-item-section>
          <q-btn icon="logout" flat dense @click="deconnecter" />
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
import { useRouter } from "vue-router";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const dialog = ref(false);
    const position = ref("top");
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    let deconnecter = ()=>{
      localStorage.clear();
      router.push("/");
    }
    return {
      deconnecter,
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

