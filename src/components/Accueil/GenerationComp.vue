<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-transparent">
      <q-input
        v-model="NouvelleRecherche"
        class="col"
        square
        bg-color="white"
        dense
        placeholder="Rechercher..."
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <!-- <ul class="box-info q-pa-md">
      <li class="aos-item" data-aos="zoom-in-right">
        <div v-for="arbre in arbreShow" :key="arbre.id">
          {{ arbre.label }}
        </div>
        <div
          v-if="!arbreShow.length || arbreShow.length === 0"
          class="chibox flex flex-center"
        >
          <q-icon name="close" size="100px" color="red" />
          <div class="text-h5 text-red text-center">
            Aucune recherche trouvée
          </div>
        </div>
      </li>
    </ul> -->
    <FamilyTree />
  </q-page>
</template>
<script>
import FamilyTree from "src/components/Accueil/FamilyTree.vue";
export default {
  components: { FamilyTree },
  data() {
    return {
      NouvelleRecherche: "",
      arbreShow: [
        {
          id: 1,
          label:
            " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia, accusamus dignissimos quis veritatis accusantium rem minus nisi dolores molestiae? Sapiente ipsum, tempora exercitationem ea molestiae dolorem necessitatibus odit officiis veritatis.",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.chibox {
  opacity: 0.5;
}
.box-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 24px;
  margin-top: 36px;
}
.box-info li {
  padding: 24px;
  background: #f9f9f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  grid-gap: 24px;
}
.box-info li .bx {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-info li:nth-child(1) .bx {
  background: #cfe8ff;
  color: #3c91e6;
}
.box-info li:nth-child(2) .bx {
  background: #fff2c6;
  color: #ffce26;
}
.box-info li:nth-child(3) .bx {
  background: #ffe0d3;
  color: #fd7238;
}
.box-info li .text h3 {
  font-size: 24px;
  font-weight: 600;
  color: #342e37;
}
.box-info li .text p {
  color: #342e37;
}
</style>
