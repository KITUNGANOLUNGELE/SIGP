<template>
  <q-stepper
    dense
    v-model="step"
    ref="stepper"
    color="primary"
    header-nav
    animated
  >
    <q-step :name="1" :error="step < 3" :done="step > 1">
      <div class="text-weight-bold text-center text-uppercase">
        Information Père
      </div>

      <ul class="box-info">
        <li class="aos-item" data-aos="zoom-in-right">
          <div class="text-weight-bold">Information Père</div>
          <q-form @submit="submitForm">
            <q-input
              dense
              v-model="nom"
              label="Nom du Père"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="postnom"
              label="Postnom"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="prenom"
              label="Prenom"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="date_naissance"
              label="Date de Naissance"
              type="date"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-select
              v-model="sexe"
              :options="options"
              label="Genre"
              dense
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="groupement"
              label="Groupement"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="avenue"
              label="Avenue"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="num_maison"
              label="Numero Maison"
              type="number"
              :rules="[(val) => !!val || 'Champ requis']"
            />
          </q-form>
        </li>
      </ul>
    </q-step>

    <q-step :name="2" icon="create_new_folder" :done="step > 2">
      <div class="text-weight-bold text-center text-uppercase">
        Information Mère
      </div>
      <ul class="box-info">
        <li class="aos-item" data-aos="zoom-in-right">
          <div class="text-weight-bold">Information Mère</div>
          <q-form @submit="submitForm">
            <q-input
              dense
              v-model="nom"
              label="Nom de la Mère"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="postnom"
              label="Postnom"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="prenom"
              label="Prenom"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="date_naissance"
              label="Date de Naissance"
              type="date"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-select
              v-model="sexe"
              :options="options"
              label="Genre"
              dense
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="groupement"
              label="Groupement"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="avenue"
              label="Avenue"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="num_maison"
              label="Numero Maison"
              type="number"
              :rules="[(val) => !!val || 'Champ requis']"
            />
          </q-form>
        </li>
      </ul>
    </q-step>

    <q-step :name="3" icon="add_comment">
      <div class="text-weight-bold text-center text-uppercase">
        Information Personne
      </div>

      <ul class="box-info">
        <li class="aos-item" data-aos="zoom-in-right">
          <div class="text-weight-bold">Information Personne</div>
          <q-form @submit="submitForm">
            <q-input
              dense
              v-model="nom"
              label="Nom du Père"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            /><q-input
              dense
              v-model="nom"
              label="Nom de la Mère"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="nom"
              label="Nom"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="postnom"
              label="Postnom"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="prenom"
              label="Prenom"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="date_naissance"
              label="Date de Naissance"
              type="date"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-select
              v-model="sexe"
              :options="options"
              label="Genre"
              dense
              :rules="[(val) => !!val || 'Champ requis']"
            />

            <q-input
              dense
              v-model="avenue"
              label="Avenue"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
          </q-form>
        </li>
      </ul>
    </q-step>
    <q-step :name="4" icon="add_comment">
      <div class="text-weight-bold text-center text-uppercase">
        Information du déplacé
      </div>

      <ul class="box-info">
        <li class="aos-item" data-aos="zoom-in-right">
          <q-form @submit="submitForm">
            <q-select
              v-model="id_personne"
              :options="options"
              label="Personne"
              dense
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="piece_identite"
              label="Pièce d'identité"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            /><q-input
              dense
              v-model="lieu_provenance"
              label="Lieu de Provenance"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="lieu_depart"
              label="Lieu de Départ"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="motif_deplacement"
              label="Motif"
              type="text"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="montant_paye"
              label="Montant à Payer"
              type="numer"
              :rules="[(val) => !!val || 'Champ requis']"
            />
          </q-form>
        </li>
      </ul>
    </q-step>
    <q-step :name="5" icon="add_comment">
      <div class="text-weight-bold text-center text-uppercase">
        Informations du déplacé
      </div>

      <ul class="box-info">
        <li class="aos-item" data-aos="zoom-in-right">
          <q-form @submit="submitForm">
            <q-file
              v-model="scan_piece_identite"
              dense
              label="Scan Pièce d'identité"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>

            <q-input
              dense
              v-model="numero_piece"
              label="Numèro Pièce"
              type="number"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-input
              dense
              v-model="devise"
              label="devise"
              type="number"
              :rules="[(val) => !!val || 'Champ requis']"
            />

            <q-input
              dense
              v-model="sejour"
              label="Date Incarceration"
              type="date"
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-select
              v-model="id_avenue"
              :options="options"
              label="avenue"
              dense
              :rules="[(val) => !!val || 'Champ requis']"
            />
            <q-select
              v-model="num_maison"
              :options="options"
              label="Numero Maison"
              dense
              :rules="[(val) => !!val || 'Champ requis']"
            />
          </q-form>
        </li>
      </ul>
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn
          square
          @click="$refs.stepper.next()"
          color="primary"
          :label="step === 5 ? 'Enregistrer' : 'Suivant'"
          :disable="isNextButtonDisabled"
        />
        <q-btn
          square
          v-if="step > 1"
          flat
          color="primary"
          @click="$refs.stepper.previous()"
          label="Back"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
  <!-- FIN STEPPER -->
</template>
<script>
import { ref } from "vue";
// Route vers le formulaire de Création Compte sous administrateur
// Route vers les Animation On ScrollBar (AOS)
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  components: {},
  data() {
    const dialog = ref(false);
    const position = ref("top");

    return {
      lists: [
        {
          id: 1,
          title: "02",
          subtitle: "Données Ajoutées",
          icon: "fa-solid fa-database",
        },
        {
          id: 2,
          title: "Enregistrer Personne",
          subtitle: "Formulaire d'Ajout",
          icon: "🧑‍🍼",
        },
      ],
      nom: "",
      postnom: "",
      prenom: "",
      date_naissance: null,
      sexe: "",
      groupement: "",
      avenue: "",
      num_maison: "",
      options: ["Masculin", "Féminin"],
      date_add: "",
      dialog,
      position,
      userType: "",
      userTypes: ["Cat_1", "Cat_2", "...etc"],
      step: ref(1),
      seamless: ref(false),
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
      search: "",
      users: [
        {
          id: 1,
          designation: "designation",
          role: "role",
        },
      ],
      columns: [
        {
          name: "designation",
          label: "Designation",
          align: "left",
          field: "designation",
        },
        { name: "role", label: "Rôle", align: "left", field: "role" },
        { name: "action", label: "Action", align: "left" },
      ],
      showModal: false,
      editedUser: {
        id: null,
        designation: "",
        role: "",
      },
    };
  },
  mounted() {
    AOS.init();
  },
  computed: {
    isNextButtonDisabled() {
      return !(
        this.nom &&
        this.postnom &&
        this.prenom &&
        this.date_naissance &&
        this.sexe &&
        this.groupement &&
        this.avenue &&
        this.num_maison
      );
    },
  },
  methods: {
    handleClick(list) {
      if (list.id === 2) {
        this.seamless = true;
        // Ajouter la logique pour ouvrir quelque chose, ici une fonction d'exemple
        this.openDialog("top");
        // Ajoutez d'autres logiques à exécuter lors du clic ici si nécessaire
      } else if (list.id === 3) {
        // Logique spécifique lorsque list.id === 2
        // Par exemple, appeler une autre fonction ou exécuter d'autres actions
        this.someOtherFunction();
      }
    },
    openDialog(position) {
      // Logique pour ouvrir quelque chose, ici une fonction d'exemple
      console.log("Ouverture en position :", position);
    },
    someOtherFunction() {
      // Logique spécifique lorsque list.id === 2
      console.log("Liste ID est égal à 2");
    },
  },
};
</script>

<style lang="scss">
h1 {
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #342e37;
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
