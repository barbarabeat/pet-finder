<template>
<div class="viewAnimals">
        <v-card
        elevation="8"
        outlined
        v-for="(item, index) in pets"
        :key="`${index}-${item}`"
        class="mx-auto my-8"
        min-width="250"
        max-width="250"
        color="white"    
    >
        <v-card-title>{{item.name}}</v-card-title>
        <v-divider class="mx-4"></v-divider>
            <v-card-text>Raça: {{item.breed}}</v-card-text>

            <v-card-text>Idade: {{item.age}} / Peso: {{item.weight}}</v-card-text>

            <v-card-text>Cidade: {{item.city}} - {{item.state}}</v-card-text>  
    
        </v-card>
</div> 
</template>

<script>
import api from '../services/api';

export default {
    name:"viewAnimals",
    data: () => ({
            pets:[],
        }),

    mounted() {
        if (localStorage.userId) {
        this.userId = localStorage.userId;
        }
    },

    async created() {
        try {
            await this.fetchRequests();
        } catch (error) {
            console.log('Error setting up the request');
        }
    },

    methods: {
        async fetchRequests() {
            try {
                const resp = await api.get("/pets");
               // const req = resp; //object
                const req = resp.data; //number + array   
                this.pets = req;     
                return this.pets;
                
        } catch (err) {
            console.log("ops! ocorreu um erro" + err);
        }
        },
    } 
}
</script>

<style scoped>
    .viewAnimals{
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        margin-right: -20px;
    }
</style>