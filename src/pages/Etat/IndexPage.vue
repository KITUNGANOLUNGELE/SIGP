<template>
  <q-page class="center">
    <div class="container">
      <MyLog />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import MyLog from "src/components/Etat/MyLog.vue";

export default defineComponent({
  components: { MyLog },
  name: "LoggEr",
});
</script>
