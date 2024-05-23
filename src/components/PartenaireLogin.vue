<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Se connecter</div>
            <div class="text-grey-8">
              Connectez-vous ci-dessous pour accéder à votre compte
            </div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="submitForm" ref="form">
              <div class="q-gutter-md">
                <q-select
                  v-model="selectedValue"
                  :options="options_cat"
                  label="Qui êtes-vous ?"
                  outlined
                  dense
                  required
                />

                <q-input
                  dense
                  outlined
                  v-model="email"
                  label="Adresse Email"
                  type="email"
                  required
                  :rules="[emailRule]"
                  lazy-rules
                />
                <q-input
                  v-model="password"
                  label="Mot de passe"
                  outlined
                  dense
                  type="password"
                  required
                  :rules="[passwordRule]"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon :name="passwordIcon" :color="passwordColor" />
                    <q-tooltip :content="passwordTooltip" />
                  </template>
                </q-input>
              </div>

              <q-btn
                style="border-radius: 8px"
                color="dark"
                type="submit"
                rounded
                size="md"
                label="Connexion"
                no-caps
                class="full-width"
              ></q-btn>
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Vous n'avez pas encore de compte?
              <a
                href="#"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >S'inscrire.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref,onMounted } from 'vue';
import { useStore } from 'src/stores/store';
export default {
  setup() {
    const store=useStore();
    const options_cat=ref([]);
    onMounted(()=>{
      store.afficherCatPartenaires().then(rest => {
    //cat_part.push(rest);
    rest.forEach(el => {
      let data={};
          data.label= el.designation;
          data.value= el.id,
        options_cat.value.push(data);
       console.log(data)
      });
    });
    })
    const selectedValue =ref([]);
    return {
      store,
      selectedValue,
      options_cat,
      userType: "",
      userTypes: ["Hopital", "Ecoles", "Eglise", "Etat_Civil", "Autres"],
      email: "",
      password: "",
      passwordIcon: "",
      passwordColor: "",
      passwordTooltip: "",
      emailRule: [
        (v) => !!v || "Adresse email requise",
        (v) => /\S+@\S+\.\S+/.test(v) || "Adresse email invalide",
      ],
      passwordRule: [
        (v) => !!v || "Mot de passe requis",
        (v) =>
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) ||
          "Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre",
      ],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        if (this.userType === "Hopital") {
          this.authenticateUser(
            this.email,
            this.password,
            adminCredentials,
            "/DashPart"
          );
        } else if (this.userType === "Utilisateur") {
          this.authenticateUser(
            this.email,
            this.password,
            userCredentials,
            "/DashUser"
          );
        }
      }
    },
    authenticateUser(email, password, credentials, route) {
      if (email === credentials.email && password === credentials.password) {
        this.$router.push(route);
        // Ici, l'authentification est réussie
        // Ajoutez des actions supplémentaires si nécessaire
      } else {
        // Gérer l'échec de l'authentification
        console.log("Identifiants incorrects");
      }
    },
    checkPasswordCriteria() {
      if (this.passwordRule[1](this.password) === true) {
        this.passwordIcon = "check_circle";
        this.passwordColor = "green";
        this.passwordTooltip = "Mot de passe valide";
      } else {
        this.passwordIcon = "highlight_off";
        this.passwordColor = "red";
        this.passwordTooltip =
          "Le mot de passe doit contenir au moins 8 caractères, dont une lettre et un chiffre";
      }
    },
  },
  watch: {
    password() {
      this.checkPasswordCriteria();
    },
  },
};

// Ajoutez ici la logique pour la connexion de l'administrateur
const adminCredentials = {
  email: "hibaigleadm@gmail.com",
  password: "Admin1234",
};

// Ajoutez ici la logique pour la connexion de l'utilisateur
const userCredentials = {
  email: "user@example.com",
  password: "UserPass123",
};
</script>

<style lang="sass">
.my_card
  width: 25rem
  border-radius: 8px
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
</style>
