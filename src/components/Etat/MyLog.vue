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
                  v-model="userType"
                  :options="userTypes"
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
                  :rules="emailRule"
                  lazy-rules
                />
                <q-input
                  v-model="password"
                  label="Mot de passe"
                  outlined
                  dense
                  type="password"
                  required
                  :rules="passwordRule"
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
    <!-- lien vers le login partener -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="black">
        <router-link to="/PartLog" class="text-black">
          <q-fab-action @click="onClick" color="black" icon="person_add" />
        </router-link>
        <q-fab-action @click="onClick" color="black" icon="mail" />
      </q-fab>
    </q-page-sticky>
    <!-- End Partener -->
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      userType: "",
      userTypes: ["Etat-Civil", "Ecole", "Eglise", "Tribunal", "DGM"],
      email: "",
      password: "",
      passwordIcon: "",
      passwordColor: "",
      passwordTooltip: "",
      emailRule: [
        (v) => !!v || "Adresse email requise",
        (v) => /.+@.+\..+/.test(v) || "Adresse email invalide",
      ],
      passwordRule: [
        (v) => !!v || "Mot de passe requis",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v) ||
          "Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre majuscule, une lettre minuscule et un chiffre",
      ],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        let credentials;
        if (this.userType === "Etat-Civil") {
          credentials = etatCredentials;
        } else if (this.userType === "Ecole") {
          credentials = ecoleCredentials;
        } else if (this.userType === "Eglise") {
          credentials = egliseCredentials;
        } else if (this.userType === "Tribunal") {
          credentials = tribCredentials;
        } else if (this.userType === "DGM") {
          credentials = dgmCredentials;
        }
        this.authenticateUser(
          this.email,
          this.password,
          credentials,
          `/${this.userType.substring(0, 3)}`
        );
      }
    },
    authenticateUser(email, password, credentials, route) {
      if (email === credentials.email && password === credentials.password) {
        this.$router.push(route);
        // Afficher une notification pour l'authentification réussie
        this.$q.notify({
          message: "Authentification réussie",
          color: "positive",
          position: "top",
          timeout: 2000,
        });
      } else {
        // Afficher une notification pour l'échec de l'authentification
        console.log("Identifiants incorrects");
        this.$q.notify({
          message: "Identifiants incorrects",
          color: "negative",
          position: "top",
          timeout: 2000,
        });
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
          "Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre majuscule, une lettre minuscule et un chiffre";
      }
    },
    onClick() {
      // console.log('Clicked on a fab action')
    },
  },
  watch: {
    password() {
      this.checkPasswordCriteria();
    },
  },
};

// Ajoutez ici la logique pour la connexion de l'Etat-civil
const etatCredentials = {
  email: "hibaigleadm@gmail.com",
  password: "Partenaire1234",
};

// la logique pour la connexion de l'ecole
const ecoleCredentials = {
  email: "hibaigleadm@gmail.com",
  password: "Partenaire1234",
};
// la logique pour la connexion de l'Eglise
const egliseCredentials = {
  email: "hibaigleadm@gmail.com",
  password: "Partenaire1234",
};
// la logique pour la connexion du Tribunal
const tribCredentials = {
  email: "hibaigleadm@gmail.com",
  password: "Partenaire1234",
};
// la logique pour la connexion de la DGM
const dgmCredentials = {
  email: "hibaigleadm@gmail.com",
  password: "Partenaire1234",
};
</script>


<style lang="sass">
.my_card
  width: 25rem
  border-radius: 8px
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
</style>
