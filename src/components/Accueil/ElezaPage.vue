
<template>
  <div class="q-pa-md flex flex-center q-gutter-md carousel-container">
    <div class="carousel">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <div class="image-wrapper">
          <img :src="card.image" alt="Image" />
        </div>
        <div class="card-content text-white">
          <h4>{{ card.title }}</h4>
          <p>{{ card.description }}</p>
          <div class="details">
            <q-datetime
              :v-model="card.currentDate"
              format="YYYY-MM-DD"
            ></q-datetime>
            <q-datetime :v-model="card.currentTime" format="HH:mm"></q-datetime>
            <q-btn
              dense
              class="text-black"
              color="white"
              label="Voir Plus"
              @click="voir"
            ></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: "",
      currentTime: "",
      cards: [
        {
          title: "Titre de la carte",
          description: "Description de la carte.",
          image:
            "https://i.pinimg.com/236x/4e/be/21/4ebe218e01ed0640e99cde61d7e83836.jpg",
        },
        {
          title: "Titre de la carte",
          description: "Description de la carte.",
          image:
            "https://i.pinimg.com/236x/4e/be/21/4ebe218e01ed0640e99cde61d7e83836.jpg",
        },
        {
          title: "Titre de la carte",
          description: "Description de la carte.",
          image:
            "https://i.pinimg.com/236x/4e/be/21/4ebe218e01ed0640e99cde61d7e83836.jpg",
        },
        {
          title: "Titre de la carte",
          description: "Description de la carte.",
          image:
            "https://i.pinimg.com/236x/4e/be/21/4ebe218e01ed0640e99cde61d7e83836.jpg",
        },
        // Ajoutez d'autres objets de carte ici si nécessaire
      ],
    };
  },
  methods: {
    voir() {
      // Fonction à exécuter lorsque le bouton est cliqué
    },
  },
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel {
  display: flex;
  gap: 20px;
  margin-left: auto; /* Pour centrer la liste des cartes */
  margin-right: auto;
}

.card {
  width: 250px; /* Largeur fixe pour toutes les cartes */
  background: #1e293b;
  border: 1px solid #7287a8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px; /* Ajuste la largeur des cartes pour trois cartes par ligne avec espacement */
  margin: 0 5px;
}

.image-wrapper {
  width: 100%;
  height: 200px; /* Hauteur fixe pour toutes les images */
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 20px;
}

.card-content h2 {
  margin-top: 0;
}

.details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
@media (max-width: 768px) {
  .carousel {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    justify-content: flex-start;
  }

  .card {
    width: auto; /* Cartes prennent toute la largeur disponible */
    margin-right: 20px;
    flex: 0 0 auto; /* Empêche le rétrécissement des cartes */
  }

  .card:last-child {
    margin-right: 0;
  }
}
</style>
