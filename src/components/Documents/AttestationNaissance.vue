<template>
  <div class="container bg-light-blue-2">
    <div class="drapeau">
      <img src="~assets/flag.jpg" alt="Drapeau Gauche" class="drapeau-gauche" />
      <h4 class="text-center text-bold">RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</h4>
      <img src="~assets/flag.jpg" alt="Drapeau Droite" class="drapeau-droite" />
    </div>

    <br />
    <p>PROVINCE DU NORD-KIVU</p>
    <p>VILLE DE GOMA</p>
    <p>COMMUNE DE GOMA</p>
    <p>BUREAU DE L'ETAT CIVIL</p>
    <p>E-mail: communedegomank@gmail.com</p>
    <h1 class="text-center text-uppercase underline">
      Attestation de Naissance
    </h1>

    <!-- Ajoutez ici les détails spécifiques de l'attestation -->
    <p class="text-h5 text-center text-bold">
      N°5072/22.9.2./CD/D3/{{ currentYear }}
    </p>
    <div class="watermark">COMMUNE DE GOMA</div>
    <p class="text-justify indente q-pa-md" style="line-height: 1.5">
      Je soussigné <span class="text-bold">MUSOMBA LUBUBU Guy</span> officier de
      l'état civil et Bourgmestre de la Commune de Goma, atteste par la présente
      qu'en date du {{ formatDate(personne.personne.donnee.date_naissance) }} est né à <span class="text-bold">{{ personne.personne.donnee.nom_ville.toUpperCase() }}</span> un
      enfant de sexe <span class="text-bold">{{ personne.personne.donnee.sexe == "F" || personne.personne.donnee.sexe =="f" || personne.personne.donnee.sexe =="Féminin" ? "FEMININ" : "MASCULIN" }}</span> auquel a été donné
      le nom de <span class="text-bold">{{ personne.personne.donnee.nom.toUpperCase() }} {{ personne.personne.donnee.postnom.toUpperCase() }} {{ personne.personne.donnee.prenom.toUpperCase() }}</span> enfant
      issu d'un mariage monogamique, coutumier, civil, religieux conclu entre
      Monsieur <span class="text-bold"> {{ personne.personne.pere.nom.toUpperCase() }} {{ personne.personne.pere.postnom.toUpperCase() }} {{ personne.personne.pere.prenom.toUpperCase() }}</span> ayant
      sa résidence principale à <span class="text-bold">{{ personne.personne.pere.nom_territoire.toUpperCase() }}</span> et sa
      résidence temporaire à <span class="text-bold">{{ personne.personne.pere.nom_ville.toUpperCase() }}</span> et Madame
      <span class="text-bold">{{ personne.personne.mere.nom.toUpperCase() }} {{ personne.personne.mere.postnom.toUpperCase() }} {{ personne.personne.mere.prenom.toUpperCase() }}</span> ayant sa résidence principale
      à <span>{{ personne.personne.pere.nom_territoire.toUpperCase() }}</span> et sa résidence temporaire à
      <span class="text-bold">{{ personne.personne.pere.nom_ville.toUpperCase() }}</span> .
    </p>
    <p class="indente">
      Ces renseignements ont été tirés de la carte d'identité de ses parents.
    </p>
    <p class="indente">
      En foi de quoi la présente attestation lui est délivrée pour valoir et
      servir ce que de droit.
    </p>
    <p>N.B: Durée pour Six (6) mois</p>
    <p class="text-right">
      Fait à Goma le {{ currentDay }} {{ currentMonth }} {{ currentYear }}
    </p>
    <div class="text-right text-weight-bold">
      <p>OFFICIER DE L'ETAT CIVIL COMMUNE DE GOMA</p>
      <span class="text-center">Ou son délégué</span>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import  {usePersonneN} from "../../stores/storePersonneN"
export default {
  setup() {
    const currentDate = new Date();
    const currentYear = ref(currentDate.getFullYear());
    const currentDay = ref(currentDate.getDate());
    const currentMonth = ref(getMonthName(currentDate.getMonth() + 1));
    const currentHour = ref(currentDate.getHours());
    //get names of personne
    const personne = usePersonneN()
    console.log(personne.personne)

    function formatDate(date=""){
      let d = date.split("-")
      let thdate = new Date()
      thdate.setDate(d[2])
      thdate.setMonth(d[1]-1)
      thdate.setFullYear(d[0])
      return thdate.toLocaleString("fr-fr", {
        day : 'numeric',
        weekday : 'long',
        month : "long",
        year : 'numeric'
      })
    }
    function getMonthName(monthNumber) {
      const months = [
        "janvier",
        "février",
        "mars",
        "avril",
        "mai",
        "juin",
        "juillet",
        "août",
        "septembre",
        "octobre",
        "novembre",
        "décembre",
      ];
      return months[monthNumber - 1];
    }

    return {
      currentYear,
      currentDay,
      currentMonth,
      currentHour,
      formatDate,
      personne
    };
  },
};
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  padding: 20mm;
  border: 2px solid #ccc;
  background-color: #f9f9f9;
  box-shadow: 0 0 0 2px #ccc, 0 0 0 4px black;
}
.indente {
  text-indent: 70px;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
p {
  font-size: 16px;
  line-height: 1.5;
}
.footer {
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
}
.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-size: 88px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.1);
  z-index: 1;
  overflow: hidden;
  white-space: nowrap;
}
.drapeau {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drapeau img {
  width: 100px;
  height: auto;
}

.drapeau-gauche {
  margin-right: auto;
}

.drapeau-droite {
  margin-left: auto;
}
</style>




