<template>
  <div class="my-card q-pa-sm colorCard" flat :height="100">
    <h6 class="text-weight-bolder q-pa-md">Dashboard</h6>
    <q-list>
      <q-item
        v-for="lien in liens"
        :key="lien.id"
        :to="lien.to"
        exact
        clickable
        :active="link === 'DashBoard'"
        @click="link = 'DashBoard'"
        active-class="border text-primary"
      >
        <q-item-section avatar class="flex flex-center column">
          <q-icon :name="lien.icon" />
        </q-item-section>
        <q-item-section class="q-ml-md">{{ lien.label }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      liens: [
        {
          id: 1,
          label: "Dashboard",
          icon: "fas fa-tachometer-alt",
          to: "/Eco",
        },
        {
          id: 2,
          label: "Document",
          icon: "fa-solid fa-file",
          to: "/RapEco",
        },
      ],
      link: ref("DashbBoard"),
    };
  },
});
</script >
<style>
.colorCard {
  background: #f6f8f7;
  height: auto;
  border-radius: 20px;
}
.q-item__section--avatar {
  color: black !important;
}
.border {
  background: #989ea0;
  border-radius: 50%;
  width: 55px;
}
.styleme {
  margin-left: 165px;
}
</style>
