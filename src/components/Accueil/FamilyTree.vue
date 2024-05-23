<template>
  <div id="tree" ref="tree" class="family-tree"></div>
</template>

<script>
import FamilyTree from "@balkangraph/familytree.js";

export default {
  name: "FamilyTree",
  data() {
    return {
      nodes: [
        {
          id: 1,
          pids: [2],
          name: "Bwirabuciza Blondy",
          gender: "male",
          img: "src/assets/blondy.jpg",
        },
        {
          id: 2,
          pids: [1],
          name: "Ava Field",
          gender: "male",
          img: "https://cdn.balkan.app/shared/m30/5.jpg",
        },
        {
          id: 3,
          mid: 1,
          fid: 2,
          name: "Peter Stevens",
          gender: "male",
          img: "https://cdn.balkan.app/shared/m10/2.jpg",
        },
        {
          id: 4,
          mid: 1,
          fid: 2,
          name: "Savin Stevens",
          gender: "male",
          img: "https://cdn.balkan.app/shared/m10/1.jpg",
        },
        {
          id: 5,
          mid: 1,
          fid: 2,
          name: "Emma Stevens",
          gender: "female",
          img: "https://cdn.balkan.app/shared/w10/3.jpg",
        },
      ],
    };
  },

  methods: {
    mytree: function (domEl, x) {
      this.family = new FamilyTree(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: "name",
          img_0: "img",
        },
      });
    },
  },

  mounted() {
    this.mytree(this.$refs.tree, this.nodes);
  },
};
</script>

<style scoped>
/* Styles pour l'arbre généalogique */
.family-tree {
  width: 100%;
  max-width: auto; /* Largeur maximale pour éviter le débordement sur de grands écrans */
  margin: 0 auto; /* Centrer l'arbre généalogique horizontalement */
}

/* Styles pour les nœuds de l'arbre généalogique */
.family-tree .familynode {
  border: 2px solid #ccc;
  border-radius: 50%; /* Rendre les nœuds circulaires */
  width: 80px; /* Largeur des nœuds */
  height: 80px; /* Hauteur des nœuds */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  font-size: 14px;
  text-align: center;
}

/* Styles pour les images de profil des nœuds */
.family-tree .familynode img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%; /* Rendre les images circulaires */
}

/* Media query pour la responsivité mobile */
@media screen and (max-width: 600px) {
  /* Ajustements de style pour les écrans de petite taille */
  .family-tree .familynode {
    width: 60px;
    height: 60px;
  }
}
</style>
