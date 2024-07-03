<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Se connecter</div>
            <div class="text-grey-8">Accéder à votre compte</div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <q-form @submit="authentification()" ref="form">
                <div>
                  <q-select
                    dense
                    outlined
                    v-model="role"
                    input-debounce="0"
                    label="votre structure"
                    :options="options_catego"
                    @filter="filterFn"
                    :rules="[(val) => !!val || 'Champ requis']"
                    behavior="menu"
                  />
                  <q-input
                    dense
                    outlined
                    v-model="login"
                    label="login"
                    type="email"
                    required
                    :rules="[emailRule]"
                    lazy-rules
                  />
                  <q-input
                    v-model="psw"
                    label="Mot de passe"
                    outlined
                    dense
                    type="password"
                    required
                    lazy-rules
                  /><br />
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
            </div>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Vous n'avez pas encore de compte?
              <a
                href="mailto:info@hibaigle.com"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Contactez l'administrateur.</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
    <!-- lien vers le login partener -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="black">
        <router-link to="/" class="text-black">
          <q-fab-action @click="onClick" color="black" icon="person_add" />
        </router-link>
        <q-fab-action @click="onClick" color="black" icon="mail" />
      </q-fab>
    </q-page-sticky>
    <!-- End Partener -->
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "src/stores/store";

export default {
  setup() {
    const router = useRouter();
    const role = ref("");
    const login = ref("");
    const psw = ref("");
    // Database import's initialisation PINIA
    const store = useStore();
    // console.log(user_auth.name)
    // Gestion des notifications et loading process
    const $q = useQuasar();
    let timer;
    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer);
        $q.loading.hide();
      }
    });
    let categorie_partn = ref([]);
    let data_catego = [];
    onMounted(() => {
      // store.afficherNaissance();
      store.afficherCatPartenaires();
    });
    store.afficherCatPartenaires().then((rest) => {
      rest.forEach((element) => {
        let datas = {};
        datas.label = element.designation;
        datas.value = element.id;
        data_catego.push(datas);
      });
    });
    const options_catego = ref([data_catego]);
    // holding method
    const authentification = () => {
      // circular progress
      $q.loading.show({
        message:
          'Authentification en cours.<br/><span class="text-amber text-italic">Veuillez patienter...</span>',
        html: true,
      });
      // hiding in 3s
      timer = setTimeout(() => {
        // Calling the authentification method from pinia
        const xlogins = {
          role: role.value.label,
          login: login.value,
          psw: psw.value,
        };
        store.authen(xlogins.role, xlogins.login, xlogins.psw);
        $q.loading.hide();
        timer = void 0;
      }, 2000);
    };

    return {
      categorie_partn,
      data_catego,
      options_catego,
      authentification,
      onClick() {},
      router,
      store,
      role,
      login,
      psw,
      passwordIcon: "",
      passwordColor: "",
      passwordTooltip: "",
      emailRule: [
        (v) => !!v || "Adresse email requise",
        (v) => /\S+@\S+\.\S+/.test(v) || "Adresse email invalide",
      ],
      filterFn(val, update) {
        if (val === "") {
          update(() => {
            options_catego.value = data_catego;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          options_catego.value = data_catego.filter(
            (v) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>

<style lang="sass">
.my_card
  width: 25rem
  border-radius: 8px
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
</style>
