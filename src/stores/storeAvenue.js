import { defineStore } from "pinia";
// import axios from "src/boot/axios";
import axios from "axios";
export const useStoreAvenue= defineStore("store",{
  state:()=>({
  avenues:[],
  message:[],
  }),
  getters:{
    getAvenues(state){
      return state.avenues.length;
    }

  },
  actions:{
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
      }catch (err){
console.log(err);
      }
    },
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
   
  }
})
