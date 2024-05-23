import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
import { data } from "autoprefixer";
import { useRouter } from 'vue-router'

export const useStore= defineStore("store",{
  state(){
    return{
      // accessing the route
      router: useRouter(),        
      // accessing the route
      loggedIn: localStorage.getItem('token') ? true : false,
      user: localStorage.getItem('user') ?? null,
      n_user: sessionStorage.getItem('n_user') ?? null,
      token_user: sessionStorage.getItem('token_user') ?? null,
      token: localStorage.getItem('token') ?? false,
      users:[],
      l_user:'',
      loggedIn:'',
      user:'',    
      personnes:[],
      naissances:[],
      dernierePersonneAjoutee:[],
      cat_partenaires:[],
      partenaires:[],
      pays:[],
      message:[],
      province:[],
      groupements:[],
      avenues:[],
      errors:[],
    }

  },
  getters:{
    nombreUser(state){
        return state.users.length;
    },
    getNaissances(state){
      return state.naissances.length;
    },
    getProvince(state){
      return state.province.length;
    },
    getPersonnes(state){
      return state.personnes.length;
    },
    getGroupement(state){
      return state.groupements.length;
    },
    getPartenaires(state){
      return state.partenaires.length;
    }

  },
  actions:{
        //ajouter une personne
        async authen(role,login,psw){
          try{
            const datas= new FormData();
            datas.append('role', role)
            datas.append('login', login)
            datas.append('psw', psw)
            const url='https://sigp2023.hibaigle.net/user/authen/?user=hibaigle&mdp=mdp';
            const headers={
              "Content-Type":"multipart/form-data"
            };
            const res=await axios({
              method: 'post',
              url: url,
              params:{
                user:"hibaigle",
                mdp:"mdp"
              },
              headers: {
                "Content-Type":"multipart/form-data"
              },
              data: datas
            });
            //  Managing the response
              if (res.status === 200) {
                const user = res.data.n_user;
                const role = res.data.role;
                const u_role = res.data.u_role;
                const token = res.data.token;
                this.l_user = res.data.n_user;
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                sessionStorage.setItem("n_user", user);
                sessionStorage.setItem("role", role);
                sessionStorage.setItem("u_role", u_role);
                sessionStorage.setItem("token_user", token);
                axios.defaults.headers.common["Authorization"] = token;
                this.loggedIn = true;
                this.user = token;          
                // console.log(res.data);
                  // redirections
                      if (res.data.u_role == "hopital") {
                        // redirection vers Hôpital
                        this.router.push({path: "/DashPart"});

                      }else if(res.data.u_role == "scolarite"){
                        // redirection vers Ecole
                        this.router.push({path: "/Eco"});

                      }else if(res.data.u_role == "justice"){
                        // redirection vers Justice
                        this.router.push({path: "/Tri"});

                      }else if(res.data.role == "deplacement"){
                        // redirection vers Deplacement
                        this.router.push({path: "/Dgm"});

                      }else if(res.data.role == "eglise"){
                        // redirection vers Eglise
                        this.router.push({path: "/Egl"});

                      }else if(res.data.role == "orphelinat"){
                        // redirection vers Orphelinat
                        this.router.push({path: "/Orph"});

                      }else if(res.data.role == "etat-civil"){
                        // redirection vers Etat-civil
                        this.router.push({path: "/Eta"});
                      }else{
                        // redirection vers l'authentification
                        this.router.push({path: "/g_admin"});
                      }
              }else{
                alert("Erreur serveur. Veuillez réessayer plus tard svp.");
              }
          }catch (err){
            console.log(err);
          }
        },
        // logout user
        async logout(id) {
          try {
            this.errors = [];
            //  Managing the response
            if (this.user === id) {
              this.token = null;
              this.loggedIn = false;
              localStorage.clear();
              this.$reset;
            }
            return user;
          } catch (err) {
            if(err.status == 422){
              for(const key in err.data.errors){
                this.errors.push(err.data.errors[key][0] + ' ')
              }
              return this.errors;
            }
          }
        },
    async afficherUsers(){
      try{
        const url='https://sigp2023.hibaigle.net/user_person/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest=await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          validateStatus: function(status){
            return status<500;
          },
        });
          this.users=rest.data.response;
          console.log(this.users)
          return this.users;
      }catch (err){
console.log(err);
      }
    },
    //affichage des personnes
    async afficherPersonnes(){
      try{
        const url='https://sigp2023.hibaigle.net/personne/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest=await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          // validateStatus: function(status){
          //   return status<500;
          // },
        });
          this.personnes=rest.data.response;
          console.log(this.personnes)
          return this.personnes;
      }catch (err){
console.log(err);
      }
    },
    //afficher les naissance
  
    async afficherNaissance(){
      try{
        const url='https://sigp2023.hibaigle.net/naissance/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest=await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          // validateStatus: function(status){
          //   return status<500;
          // },
        });
          this.naissances=rest.data.response;
          console.log(this.naissances)
          return this.naissances;
      }catch (err){
console.log(err);
      }
    },
    //afficher groupement
    async afficherGroupement(){
      try{
        const url='https://sigp2023.hibaigle.net/groupement/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest= await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          validateStatus: function(status){
            return status<500;
          },
        });
          this.groupements=rest.data.response;
          // console.log(this.groupements)
          return this.groupements;
      }catch (err){
console.log(err);
      }
    },
    //affichage des avenues
    async afficherAvenues(){
      try{
        const url='https://sigp2023.hibaigle.net/avenue/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest=await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          validateStatus: function(status){
            return status<500;
          },
        });
          this.avenues=rest.data.response;
          console.log(this.avenues)
          return this.avenues;
      }catch (err){
console.log(err);
      }
    },
    //afficher categorie de partenaire
    async afficherCatPartenaires(){
      try{
        const url='https://sigp2023.hibaigle.net/cat_parten/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest=await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          validateStatus: function(status){
            return status<500;
          },
        });
          this.cat_partenaires=rest.data.response;
          // console.log(this.cat_partenaires)
          return this.cat_partenaires;
      }catch (err){
console.log(err);
      }
    },
    //afficher partenaires
    async afficherPartenaires(){
      try{
        const url='https://sigp2023.hibaigle.net/partenaire/get/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"application/json"
        };
        const rest=await axios.get(url,headers,{
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          validateStatus: function(status){
            return status<500;
          },
        });
          this.partenaires=rest.data.response;
          console.log(this.partenaires)
          return this.partenaires;
      }catch (err){
console.log(err);
      }
    },
      //ajout de l'utilisateur
   async ajouterUser(id_personne, email, mdp, user={}){
      try{
        const datas= new FormData();
        datas.append('id_personne', id_personne)
        datas.append('email', email)
        datas.append('mdp', mdp)
        const url='https://sigp2023.hibaigle.net/user_person/save/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"multipart/form-data"
        };
        const rest=await axios({
          method: 'post',
          url: url,
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          headers: {
            "Content-Type":"multipart/form-data"
          },
          data: datas
        });
          this.message=rest.data.response;
          console.log(this.message)
          this.users.push(user)
      }catch (err){
console.log(err);
      }
    },
    //ajouter une personne
    async ajouterPersonnes(nom, postnom, prenom,date_naissance,sexe,lieu_naissance,id_partenaire,id_groupement,id_avenue,num_maison){
      try{
        const datas= new FormData();
        datas.append('nom', nom)
        datas.append('postnom', postnom)
        datas.append('prenom', prenom)
        datas.append('date_naissance', date_naissance)
        datas.append('sexe', sexe)
        datas.append('lieu_naissance', lieu_naissance)
        datas.append('id_partenaire', id_partenaire)
        datas.append('id_groupement', id_groupement)
        datas.append('id_avenue', id_avenue)
        datas.append('num_maison', num_maison)
        const url='https://sigp2023.hibaigle.net/personne/save/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"multipart/form-data"
        };
        const rest=await axios({
          method: 'post',
          url: url,
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          headers: {
            "Content-Type":"multipart/form-data"
          },
          data: datas
        });
          this.message=rest.data.response;
          console.log(this.message)
          this.users.push(user)
      }catch (err){
console.log(err);
      }
    },
    //ajouter une personne par etape
    async ajouterPersonne_step(nom_p, postnom_p, prenom_p, d_naiss_p, l_naiss_p, id_groupement_p, pays_p, ville_p, commune_p, quartier_p, id_avenue_p, num_maison_p, 
      nom_m, postnom_m, prenom_m, d_naiss_m, l_naiss_m, id_groupement_m, pays_m, ville_m, commune_m, quartier_m, id_avenue_m, num_maison_m, 
     nom, postnom, prenom, d_naiss, sexe, l_naiss, id_groupement, pays, ville, commune, quartier, id_avenue, num_maison, couleur_oeil, id_partenaire){
      try{
        const datas= new FormData();
        datas.append('nom_p', nom_p)
        datas.append('postnom_p', postnom_p)
        datas.append('prenom_p', prenom_p)
        datas.append('d_naiss_p', d_naiss_p)
        datas.append('l_naiss_p', l_naiss_p)
        datas.append('id_groupement_p', id_groupement_p)
        datas.append('pays_p', pays_p)
        datas.append('ville_p', ville_p)
        datas.append('commune_p', commune_p)
        datas.append('quartier_p', quartier_p)
        datas.append('id_avenue_p', id_avenue_p)
        datas.append('num_maison_p', num_maison_p)
        datas.append('nom_m', nom_m)
        datas.append('postnom_m', postnom_m)
        datas.append('prenom_m', prenom_m)
        datas.append('d_naiss_m', d_naiss_m)
        datas.append('l_naiss_m', l_naiss_m)
        datas.append('id_groupement_m', id_groupement_m)
        datas.append('pays_m', pays_m)
        datas.append('ville_m', ville_m)
        datas.append('commune_m', commune_m)
        datas.append('quartier_m', quartier_m)
        datas.append('id_avenue_m', id_avenue_m)
        datas.append('num_maison_m', num_maison_m)
        datas.append('nom', nom)
        datas.append('postnom', postnom)
        datas.append('prenom', prenom)
        datas.append('d_naiss', d_naiss)
        datas.append('sexe', sexe)
        datas.append('l_naiss', l_naiss)
        datas.append('id_groupement', id_groupement)
        datas.append('pays', pays)
        datas.append('ville', ville)
        datas.append('commune', commune)
        datas.append('quartier', quartier)
        datas.append('id_avenue', id_avenue)
        datas.append('num_maison', num_maison)
        datas.append('couleur_oeil', couleur_oeil)
        datas.append('id_partenaire', id_partenaire)
        const url='https://sigp2023.hibaigle.net/personne/save/?user=hibaigle&mdp=mdp';
        const headers={
          "Content-Type":"multipart/form-data"
        };
        const rest=await axios({
          method: 'post',
          url: url,
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          headers: {
            "Content-Type":"multipart/form-data"
          },
          data: datas
        });
          this.message=rest.data.response;
          console.log(this.message)
          this.users.push(user)
      }catch (err){
console.log(err);
      }
    },
    //ajouter une naissance
    async ajouterNaissance(id_enfant, id_pere, id_mere, couleur){
        const datas= new FormData();
        datas.append('id_enfant', id_enfant)
        datas.append('id_pere', id_pere)
        datas.append('id_mere', id_mere)
        datas.append('couleur_oeil', couleur) 
      try{
        const url='https://sigp2023.hibaigle.net/naissance/save/?user=hibaigle&mdp=mdp';
        // const headers={
        //   "Content-Type":"multipart/form-data"
        // };
        const rest=await axios({
          method: 'post',
          url: url,
          params:{
            user:"hibaigle",
            mdp:"mdp"
          },
          headers: {
            "Content-Type":"multipart/form-data"
          },
          data: datas
        });
          //this.message=rest.data.response;
          console.log(rest.data.response)
      }catch (err){
console.log(err);
      }
    },
    //ajouter un groupement
    async ajoutGroupement(nomGroupement,province){
      try {
        const datas=new FormData();
        datas.append('nom_groupement',nomGroupement)
        datas.append('id_province',province)
        const url='https://sigp2023.hibaigle.net/groupement/save/?user=hibaigle&mdp=mdp';
        const rest=await axios({
        method: 'post',
        url: url,
        params:{
          user:"hibaigle",
          mdp:"mdp"
        },
        headers: {
          "Content-Type":"multipart/form-data"
        },
        data: datas
      });
        this.message=rest.data.response;
        console.log(this.message)
        console.log(datas)
      } catch (error) {
        console.log(error);
      }
    },
    //ajouter des avenues
    async ajoutAvenue(nomAvenue, quartier){
      try {
        const datas=new FormData();
        datas.append('nom_avenue',nomAvenue)
        datas.append('id_quartier',quartier)
        const url='https://sigp2023.hibaigle.net/avenue/save/?user=hibaigle&mdp=mdp';
        const rest=await axios({
        method: 'post',
        url: url,
        params:{
          user:"hibaigle",
          mdp:"mdp"
        },
        headers: {
          "Content-Type":"multipart/form-data"
        },
        data: datas
      });
        this.message=rest.data.response;
        console.log(this.message)
        console.log(datas)
      } catch (error) {
        console.log(error);
      }
    },
    //ajout du partenaire
    async ajoutPartenaire(nom_partenaire,id_categorie_partenaire){
      const xpart=nom_partenaire;
      const xid=id_categorie_partenaire;
      const datas=new FormData();
        datas.append('nom_partenaire',xpart)
        datas.append('id_categorie_partenaire',xid)
      try {
        const url='https://sigp2023.hibaigle.net/partenaire/save/?user=hibaigle&mdp=mdp';
        const rest=await axios({
        method: 'post',
        url: url,
        params:{
          user:"hibaigle",
          mdp:"mdp"
        },
        headers: {
          "Content-Type":"multipart/form-data"
        },
        data:datas
      });
        this.message=rest.data.response;
        console.log(this.message)
        console.log(datas)
      } catch (error) {
        console.log(error);
      }
    }
  }
})
