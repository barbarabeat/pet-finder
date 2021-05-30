<template>
<div id="column">
    <v-row no-gutters>
      <v-col
        cols="4"
        sm="6"
        md="4"
      >
    <v-card
    elevation="8"
    shaped
    tile
    outlined
    class="mx-auto my-12 pa-4 ms-14"
    v-for="(item, i) in items"
    :key="i"
    color="white"    
>
    <v-card-title>{{name}}</v-card-title>
    <v-divider class="mx-4"></v-divider>
            <v-card-text>{{item.breed}}</v-card-text>

            <v-card-text>{{item.age}}</v-card-text>

            <v-card-text>{{item.weight}}</v-card-text>

            <v-card-text>{{item.city}}</v-card-text>  
            
            <v-card-text>{{item.state}}</v-card-text>   
      <v-btn
        color="success"
        text

      >
        Atualizar dados
      </v-btn>
      <v-btn
        color="error"
        text
        @click="deletePet"
      >
        Deletar Pet
      </v-btn>          
    </v-card>
    </v-col>
        <v-divider vertical class="pa-12"></v-divider>
        <v-col
        cols="6"
        sm="4"
        md="4"
        offset-md="2"
      >
    <AddPet class="mx-auto pa-1"/>
    </v-col>
    </v-row>
</div>    
</template>

<script>
import api from '../services/api';
import AddPet from '../components/AddPet';

export default {
    name: 'myPets',
    data: () => ({
        items:[
            {
             name: '',
             breed: '',
             age: null ,
             weight: null ,
             city: '',
             state: '',
             userId:'',
            }, 
        ],
    }),
    components:{
        AddPet,
    },

    mounted() {
        if (localStorage.userId) {
        this.userId = localStorage.userId;
        }
    }, 

    async created() {
        await api.get(`/pets/user-pets/${this.userId}`)
            .then((resp) => (resp.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    },
   
    methods: {
        async fetchRequests(resp) {
        try {
            this.petId = resp.data.id;
            const { data } = resp.data;
            this.items = data.map((resp) => {
            const copy = { ...resp };
            return copy;
            });
        } catch (err) {
            console.log("ops! ocorreu um erro" + err);
        }
    },
        async deletePet(petId) {
            
            try{ await api.delete(`/pets/${petId}`);
                this.$router.push('/myPets');
            }catch(err){
                this.$toast.error('Erro ao deletar', {
                timeout: 2000,
                });
        }              
        },
    },
}
</script>

<style scoped>
    #column{
        display:flex;
    }
    .column{
        padding-left: 100px;
    }
</style>