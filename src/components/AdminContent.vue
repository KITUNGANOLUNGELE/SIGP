<template>
  <q-layout view="hHh lpR fFf">
    <div class="q-mx-md">
      <h1>Dashboard</h1>
      <q-breadcrumbs>
        <q-breadcrumbs-el label="Dashboard" />
        <q-breadcrumbs-el label="Accueil" icon="home" />
      </q-breadcrumbs>
    </div>
    <!-- Début Cards -->
    <ul class="box-info q-pa-md">
      <li class="aos-item" data-aos="zoom-in-right">
        <q-icon class="bx" name="supervisor_account" />
        <span class="text">
          <h3>{{ store.nombreUser }}</h3>
          <p>Utilisateurs</p>
        </span>
      </li>
      <li class="aos-item" data-aos="zoom-in">
        <q-icon class="bx" name="group" />
        <span class="text">
          <h3>2834</h3>
          <p>Ajouts</p>
        </span>
      </li>
      <li @click="open('top')" class="aos-item" data-aos="zoom-in-left">
        <q-icon class="bx" name="person_add" />
        <span class="text">
          <h3>Ajouter</h3>
          <p>un nouveau compte</p>
        </span>
        <!-- Dialogue pour ajouter un compte -->
        <q-dialog v-model="dialog" :position="position">
          <q-card style="width: 350px">
            <q-linear-progress :value="0.6" color="black" />
            <q-card-section class="text-center q-pa-md">
              <div class="text-weight-bold">Créer un compte</div>
              <FormAccount />
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- Fin Dialogue -->
      </li>
    </ul>
    <!-- Fin Cards -->
    <!-- Tableau -->
    <div class="table-data q-pa-md aos-item" data-aos="zoom-in-right">
      <div class="order">
        <div class="head">
          <h3>Ajout récent</h3>
          <i class="bx bx-search"></i>
          <i class="bx bx-filter"></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Type Compte</th>
              <th>Accès</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(user, index) in users">
              <td>
                <!-- <img src="~assets/IMG_7944.jpg" /> -->
                {{ user.email }}
              </td>
              <td>{{ user.mdp}}</td>
              <td>{{ user.id_personne}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="todo aos-item" data-aos="zoom-in-left">
        <div class="head">
          <h3>Graphique</h3>
          <i class="bx bx-plus"></i>
          <i class="bx bx-filter"></i>
        </div>
        <ul class="todo-list">
          <li class="completed">
            <div class="q-pa-md">
              <div class="chart-container">
                <canvas ref="myChart"></canvas>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- Fin Tableau -->
  </q-layout>
</template>

<script>
import Chart from "chart.js/auto";
import { ref, onMounted, computed } from "vue";
import FormAccount from "src/components/FormAccount.vue";
import AOS from "aos";
import "aos/dist/aos.css";
import {useStore} from "../stores/store";
import { storeToRefs } from 'pinia';

export default {
  components: { FormAccount },
  setup() {
    const dialog = ref(false);
    const position = ref("top");
    const store=useStore();
    const users = computed(() => {
  return store.users;
});
onMounted(() => {
  store.afficherUsers();
});
    return {
      store,
      dialog,
      position,
      users,
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
    };
  },
  name: "UserAccountChart",
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.myChart.getContext("2d");

      // Données de l'exemple (à remplacer par vos propres données)
      const userData = {
        labels: ["Administrateur", "Partenaire", "Encodeur", "Utilisateur"],
        counts: [10, 20, 15, 30], // Nombre de comptes par catégorie
      };

      new Chart(ctx, {
        type: "line",
        data: {
          labels: userData.labels,
          datasets: [
            {
              label: "Comptes par catégorie",
              data: userData.counts,
              backgroundColor: [
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
              ],
              borderColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
  mounted() {
    AOS.init();
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

.table-data {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 24px;
  margin-top: 24px;
  width: 100%;
  color: #342e37;
}
.table-data > div {
  border-radius: 20px;
  background: #f9f9f9;
  padding: 24px;
  overflow-x: auto;
}
.table-data .head {
  display: flex;
  align-items: center;
  grid-gap: 16px;
  margin-bottom: 24px;
}
.table-data .head h3 {
  margin-right: auto;
  font-size: 24px;
  font-weight: 600;
}
.table-data .head .bx {
  cursor: pointer;
}

.table-data .order {
  flex-grow: 1;
  flex-basis: 500px;
}
.table-data .order table {
  width: 100%;
  border-collapse: collapse;
}
.table-data .order table th {
  padding-bottom: 12px;
  font-size: 13px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.table-data .order table td {
  padding: 16px 0;
}
.table-data .order table tr td:first-child {
  display: flex;
  align-items: center;
  grid-gap: 12px;
  padding-left: 6px;
}
.table-data .order table td img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}
.table-data .order table tbody tr:hover {
  background: #eee;
}
.table-data .order table tr td .status {
  font-size: 10px;
  padding: 6px 16px;
  color: #f9f9f9;
  border-radius: 20px;
  font-weight: 700;
}
.table-data .order table tr td .status.completed {
  background: #3c91e6;
}
.table-data .order table tr td .status.process {
  background: #ffce26;
}
.table-data .order table tr td .status.pending {
  background: #fd7238;
}

.table-data .todo {
  flex-grow: 1;
  flex-basis: 300px;
}
.table-data .todo .todo-list {
  width: 100%;
}
.table-data .todo .todo-list li {
  width: 100%;
  margin-bottom: 16px;
  background: #eee;
  border-radius: 10px;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-data .todo .todo-list li .bx {
  cursor: pointer;
}
.table-data .todo .todo-list li.completed {
  border-left: 10px solid #3c91e6;
}
.table-data .todo .todo-list li.not-completed {
  border-left: 10px solid #fd7238;
}
.table-data .todo .todo-list li:last-child {
  margin-bottom: 0;
}
@media screen and (max-width: 576px) {
  .q-form .form-input input {
    display: none;
  }

  .q-form .form-input button {
    width: auto;
    height: auto;
    background: transparent;
    border-radius: none;
    color: #342e37;
  }

  .q-form.show .form-input input {
    display: block;
    width: 100%;
  }
  .q-form.show .form-input button {
    width: 36px;
    height: 100%;
    border-radius: 0 36px 36px 0;
    color: var(--light);
    background: var(--red);
  }

  .q-form.show ~ .notification,
  #content nav form.show ~ .profile {
    display: none;
  }

  .box-info {
    grid-template-columns: 1fr;
  }

  .table-data .head {
    min-width: 420px;
  }
  .table-data .order table {
    min-width: 420px;
  }
  .table-data .todo .todo-list {
    min-width: 420px;
  }
}
</style>
