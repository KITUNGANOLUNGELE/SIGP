const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        // MA PAGE D'ACCUEIL
        path: "",
        component: () => import("pages/AccueilPages/AccueilOn.vue"),
      },
      { path: "/g_admin", component: () => import("pages/IndexPage.vue") },
      {
        path: "/MyDashboard",
        component: () => import("pages/DashboardPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/DashUser",
        component: () => import("pages/UserDashboard.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/MyAccount",
        component: () => import("pages/ComptePage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/MyChart",
        component: () => import("pages/ChartsJs.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/ParaMetre",
        component: () => import("src/pages/PageParam.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/RevieWs",
        component: () => import("src/pages/RapportGlobal.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      // Coté Création commpte Partenaire
      {
        path: "/PartLog",
        component: () => import("src/pages/LogCnx.vue"),
      },
      // Partenaire Hôpital
      {
        path: "/DashPart",
        component: () => import("src/pages/PartenerPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/RapPart",
        component: () => import("src/pages/PartenaireRapport.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/FroMer",
        component: () => import("src/pages/Forms/MyForms.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Da",
        component: () => import("src/pages/FormPages/DashAvenue.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dc",
        component: () => import("src/pages/FormPages/DashCommune.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dg",
        component: () => import("src/pages/FormPages/DashGroupe.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dp",
        component: () => import("src/pages/FormPages/DashPart.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dpa",
        component: () => import("src/pages/FormPages/DashPays.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dpr",
        component: () => import("src/pages/FormPages/DashProv.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dt",
        component: () => import("src/pages/FormPages/DashTerr.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dv",
        component: () => import("src/pages/FormPages/DashVille.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/Dper",
        component: () => import("src/pages/FormPages/DashPersonne.vue"),
        meta: {
          requiresAuth: false,
        },
      },
        // ROUTE VERS GENERATION
        {
       path: "/Generation",
        component: () => import("pages/AccueilPages/GenPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },

        // ROUTE VERS LA PAGE D'AIDE
        {
       path: "/Aide",
        component: () => import("pages/AccueilPages/AidePage.vue"),
        meta: {
          requiresAuth: false,
        },
      },

      //LES DIFFERENTS INTERFACES
      {
        // LOGIN
        path: "/Interface",
        component: () => import("pages/Etat/IndexPage.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        // DASHBOARD & RAPPORT ETAT-CIVIL
        path: "/Eta",
        component: () => import("pages/Etat/DashboardEtat.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/RapEta",
        component: () => import("pages/Etat/DashRap.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        // DASHBOARD & RAPPORT DGM
        path: "/Dgm",
        component: () => import("pages/Dgm/DashboardDgm.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/RapDgm",
        component: () => import("pages/Dgm/RapportDgm.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        // DASHBOARD & RAPPORT ECOLE
        path: "/Eco",
        component: () => import("pages/Ecole/DashboardEcole.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/RapEco",
        component: () => import("pages/Ecole/RapportEco.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        // DASHBOARD & RAPPORT EGLISE
        path: "/Egl",
        component: () => import("pages/Eglise/DashboardEgl.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/RapEgl",
        component: () => import("pages/Eglise/EgliseRapport.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        // DASHBOARD & RAPPORT TRIBUNAL
        path: "/Tri",
        component: () => import("pages/Tribunal/DashboardTrib.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/RapTrib",
        component: () => import("pages/Tribunal/RapportTrib.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        // DASHBOARD UTILISATEUR APRES LOGIN
        path: "/User",
        component: () => import("pages/AccueilPages/InterfaceUser.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/TreeUser",
        component: () => import("pages/AccueilPages/ArbreUser.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
