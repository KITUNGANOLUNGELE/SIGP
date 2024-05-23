<template>
  <transition name="fade">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section v-if="!isRegistering">
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">Se connecter</div>
          <div class="text-grey-8">
            Connectez-vous ci-dessous pour accéder à votre compte
          </div>
        </q-card-section>
        <q-form @submit="submitForm" ref="form">
          <div>
            <!-- Supprimer le champ "Qui êtes-vous ?" -->
            <q-input
              dense
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
            square
            color="dark"
            type="submit"
            size="md"
            label="Connexion"
            no-caps
            class="full-width"
          ></q-btn>
        </q-form>
        <br />
        <q-card-section class="text-center q-pt-none">
          <div class="text-grey-8">
            Vous n'avez pas encore de compte?
            <a
              href="#"
              class="text-dark text-weight-bold"
              style="text-decoration: none"
              @click.prevent="showRegisterForm"
              >S'inscrire.</a
            >
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section v-else>
        <q-card-section class="text-center">
          <div class="text-grey-9 text-h5 text-weight-bold">
            Création Compte
          </div>
        </q-card-section>
        <q-form
          @submit="submitRegisterForm"
          ref="registerForm"
          class="form-size"
        >
          <div class="q-py-x">
            <q-input dense v-model="registerData.nom" label="Nom" required />
            <q-input
              dense
              v-model="registerData.postnom"
              label="Postnom"
              required
            />
            <q-input
              dense
              v-model="registerData.email"
              label="Adresse Email"
              type="email"
              required
              :rules="emailRule"
              lazy-rules
            />
            <q-input
              dense
              v-model="registerData.telephone"
              label="Téléphone"
              type="tel"
              required
            />
            <q-input
              dense
              v-model="registerData.dateNaissance"
              label="Date de naissance"
              type="date"
              required
            />
            <q-input
              v-model="registerData.password"
              label="Mot de passe"
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
            <q-input
              v-model="registerData.confirmPassword"
              label="Confirmer le mot de passe"
              dense
              type="password"
              required
            />
            <br />
            <q-btn
              color="dark"
              type="submit"
              square
              size="md"
              label="S'inscrire"
              no-caps
              class="full-width"
            />
          </div>
        </q-form>
        <br />
        <q-card-section class="text-center q-pt-none">
          <div class="text-grey-8">
            Avez vous déjà un compte?
            <a
              href="#"
              class="text-dark text-weight-bold"
              style="text-decoration: none"
              @click.prevent="showRegisterForm"
              >Se Connecter.</a
            >
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isRegistering: false,
      registerData: {
        nom: "",
        postnom: "",
        email: "",
        telephone: "",
        dateNaissance: "",
        password: "", // Assurez-vous que cette propriété est définie
        confirmPassword: "",
      },
      // Supprimer userType et userTypes
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
    // Nouvelle méthode pour afficher le formulaire d'inscription
    showRegisterForm() {
      this.isRegistering = true;
    },

    submitForm() {
      if (this.$refs.form.validate()) {
        // Utilisez "Etat-Civil" comme type d'utilisateur fixe
        const userType = "Etat-Civil";
        const credentials = etatCredentials;
        this.authenticateUser(
          this.email,
          this.password,
          credentials,
          `/${userType.substring(0, 3)}`
        );
      }
    },
    submitRegisterForm() {
      if (this.$refs.registerForm.validate()) {
        // Vérifier si les mots de passe correspondent
        if (this.registerData.password !== this.registerData.confirmPassword) {
          this.$q.notify({
            message: "Les mots de passe ne correspondent pas",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
          return; // Arrêter le processus d'inscription
        }
      }
    },
    authenticateUser(email, password, credentials, route) {
      if (email === credentials.email && password === credentials.password) {
        this.$router.push("/MyDashboard");
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

// Ajoutez ici la logique pour la connexion
const etatCredentials = {
  email: "hibaigleadm@gmail.com",
  password: "Partenaire1234",
};
</script>


<style lang="sass">
.my_card
  width: 22rem
  border-radius: 8px
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0
</style>
