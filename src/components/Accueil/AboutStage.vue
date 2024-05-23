<template>
  <div class="q-pa-md MySecond">
    <div class="on-right">
      <p class="text-h3 bold q-pa-ms">ELEZA</p>
    </div>
    <ElezaPage />
  </div>
</template>
<script>
import { ref } from "vue";
import ElezaPage from "src/components/Accueil/ElezaPage.vue";
export default {
  components: { ElezaPage },
  data() {
    return {
      alert: ref(false),
    };
  },
};
</script>

<style>
.MySecond {
  background: #0f172a;

  width: 100%;
  color: #fff;
}
</style>
