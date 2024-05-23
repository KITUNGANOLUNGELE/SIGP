<template>
  <q-page class="center">
    <div class="container">
      <LogIn />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LogIn from "src/components/LogIn.vue";

export default defineComponent({
  components: { LogIn },
  name: "LogInUser",
});
</script>
