<template>
  <div class="my-card q-pa-sm colorCard" flat :height="100">
    <h6 class="text-weight-bolder q-pa-md">Dashboard</h6>
    <q-list>
      <router-link to="/DashPart" class="text-black">
        <q-item
          exact
          clickable
          :active="link === 'DashBoard'"
          @click="link = 'DashBoard'"
          active-class="border text-primary"
        >
          <q-item-section avatar class="flex flex-center column">
            <q-icon name="fas fa-tachometer-alt" />
          </q-item-section>
          <q-item-section class="q-ml-md">Dashboard</q-item-section>
        </q-item>
      </router-link>
      <router-link to="/RapPart" class="text-black">
        <q-item
          exact
          clickable
          :active="link === 'CashBox'"
          @click="link = 'CashBox'"
          active-class="border text-primary"
        >
          <q-item-section avatar class="flex flex-center column">
            <q-icon name="fa-solid fa-file" />
          </q-item-section>
          <q-item-section class="q-ml-md">Document</q-item-section>
        </q-item>
      </router-link>

      <router-link to="/" class="text-black">
        <q-item
          exact
          clickable
          :active="link === 'Cash'"
          @click="link = 'Cash'"
          active-class="border text-primary"
        >
          <q-item-section avatar class="flex flex-center column">
            <q-icon name="fa-solid fa-gears" />
          </q-item-section>
          <q-item-section class="q-ml-md">Paramètre</q-item-section>
        </q-item>
      </router-link>
    </q-list>
  </div>
</template>
<script>
import { ref } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
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
