<template>
<div id="column">
    <v-row no-gutters>
        <v-card
        elevation="8"
        outlined
        v-for="(item, index) in pets"
        :key="`${index}-${item}`"
        class="mx-auto my-12"
        min-width="300"
        max-width="300"
        color="white"    
    >
        <v-card-title>{{item.name}}</v-card-title>
        <v-divider class="mx-4"></v-divider>
            <v-card-text>Raça: {{item.breed}}</v-card-text>

            <v-card-text>Idade: {{item.age}} / Peso: {{item.weight}}</v-card-text>

            <v-card-text>Cidade: {{item.city}} - {{item.state}}</v-card-text>   
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

        <v-divider vertical></v-divider>
    </v-row>
    <AddPet/>
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
        pets:[],
    }),

    components:{
        AddPet,
    },

    mounted() {
        if (localStorage.token) {
        this.token = localStorage.token;
        this.userId = localStorage.userId;
        }
        api.defaults.headers.Authorization = `Bearer ${this.token}`;
    }, 

    async created() {
        try {
            await this.fetchRequests();
             const resp = await api.get(`/pets/user-pets/${this.userId}`)
               // const req = resp; //object
                const req = resp.data; //number + array   
                this.pets = req;     
                return this.pets;
        }catch (error) {
             console.log('Error setting up the request');
        }
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

</style>