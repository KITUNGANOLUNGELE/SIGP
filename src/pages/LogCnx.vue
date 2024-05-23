<template>
  <q-page class="center">
    <div class="container">
      <PartenaireLogin />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PartenaireLogin from "src/components/PartenaireLogin.vue";

export default defineComponent({
  components: { PartenaireLogin },
  name: "LogInUser",
});
</script>
