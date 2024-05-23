<template>
  <div>
    <div class="q-pa-md example-row-stacked-to-horizontal">
      <div class="row">
        <div class="col-12 col-md-10">
          <div class="q-gutter-md">
            <h1 class="text-h5 text-bold">REPUBLIQUE DEMOCRATIQUE DU CONGO</h1>
            <p class="text-h5">Province du : ...........</p>
            <p class="text-h5">Ville de : ...........</p>
            <p class="text-h5">District de : ...........</p>
            <p class="text-h5">Territoire / Commune de: ...........</p>
            <p class="text-h5">Chefferie / Secteur ou cité de : ...........</p>
            <p class="text-h5">
              Bureau principal de l'Etat Civil de : ...........
            </p>
            <p class="text-h5">
              Bureau Secondaire de l'Etat Civil de : ...........
            </p>
            <p class="text-h5">
              Acte N° : ........... Volume ........... Folio N° ...........
            </p>
          </div>
        </div>
        <div class="col-12 col-md-2">
          <div class="q-mt-md q-flex q-justify-right">
            <!-- <p class="text center">Volet 1</p> -->
            <img
              class="text-right"
              src="~assets/flag.jpg"
              alt="Drapeau"
              style="max-height: 120px"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="text-h4 text-center text-bold">ACTE DE NAISSANCE</div>
      <div class="q-pt-md q-pb-md relative-position">
        <div class="watermark">ACTE DE NAISSANCE</div>
        <br />
        <br />
        <!-- Image en filigrane -->
        <div class="watermark-image">
          <img src="~assets/flag1.png" alt="Drapeau" />
        </div>
        <div class="text-center">
          <h2 class="text-h5 text-justify q-pa-md q-col-gutter-lg-md indente">
            L'an deux mille
            <span class="text-h5 text-bold">{{ currentYear }}</span> le
            <span class="text-h5 text-bold">{{ currentDay }}</span>
            <sup>ème</sup> Jour du mois de
            <span class="text-h5 text-bold">{{ currentMonth }}</span> à
            <span class="text-h5 text-bold">{{ currentHour }}</span> heures
            ..........par devant nous ......................... officier de
            l'Etat civil de ......................................... a comparu
            ............................ en qualité de père né (e) à
            ................................. le
            ................................ profession
            ................................résident à
            ................................ lequel (laquelle) nous déclare ce
            qui suit: Le ..............jours du mois de................ de
            l'année............................... est né à
            ............................... un enfant du
            sexe...........................
            nommé.......................................................... fils
            (fille) de .............................................. né
            à............................... le
            .................................. de nationalité
            ................................
            profession................................ résident à
            .................................. et de
            .................................. né à
            .................................. le ..............................
            nationalité ................................. profession
            ........................ résident à
            ....................................... conjoints Lecture de l'acte
            a été faite au connaissance de l'acte a été donné au traduction de
            l'acte a été fait en............................. langue que nous
            connaissons ou par .................................... interprète
            ayant prêté serment.
          </h2>
          <br />
          <br />
          <br />
          <br />
          <h2 class="text-h5">
            En fois de quoi, avons dressé le présent acte.
          </h2>
        </div>
      </div>
    </div>
    <div class="row q-pa-md text-center">
      <div class="col text-h5 text-bold">Le Déclarant</div>
      <div class="col">
        <p class="text-h6 text-grey text-bold">(*)Préciser le nom et qualité</p>
        <p class="text-h6 text-grey text-bold">
          (*)Biffet les mentions inutiles
        </p>
      </div>
      <div class="col text-h5 text-bold">L'Officier de l'Etat-Civil</div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const currentDate = new Date();
    const currentYear = ref(currentDate.getFullYear());
    const currentDay = ref(currentDate.getDate());
    const currentMonth = ref(getMonthName(currentDate.getMonth() + 1));
    const currentHour = ref(currentDate.getHours());

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
    };
  },
};
</script>
<style>
.indente {
  text-indent: 70px;
}
.relative-position {
  position: relative;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
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
}

.watermark-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
  object-fit: cover;
  opacity: 0.2;
  z-index: 0;
}
.text-h4 {
  text-decoration: underline;
  text-underline-offset: inherit;
}

@media only screen and (max-width: 600px) {
  .text-h5 {
    font-size: 12px;
  }

  .q-pt-md {
    padding-top: 0;
    position: relative;
    overflow: hidden;
  }

  .watermark-image {
    max-width: 100px;
    height: auto;
  }

  .text-h4 {
    font-size: 16px;
  }

  .text-center {
    text-align: justify !important;
  }

  .q-pa-md {
    padding: 10px;
  }

  .col-12 {
    width: 100%;
  }

  .col-md-10,
  .col-md-2 {
    flex: none;
    width: 50%;
  }

  .flex-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
  }

  .watermark {
    font-size: 48px;
  }

  .q-mt-md {
    margin-top: 0 !important;
  }
}
</style>
