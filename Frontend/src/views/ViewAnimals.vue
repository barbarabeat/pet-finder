<template>
<div class="viewAnimals">
        <v-card
        elevation="8"
        shaped
        tile
        outlined
        v-for="(item, i) in fetchRequests"
            :key="i"
        class="mx-auto my-12 pa-4 ms-14"
        color="white"    
    >
        <v-card-title>{{item.name}}</v-card-title>
        <v-divider class="mx-4"></v-divider>
            <v-card-text>{{item.breed}}</v-card-text>

            <v-card-text>{{item.age}}</v-card-text>

            <v-card-text>{{item.weight}}</v-card-text>

            <v-card-text>{{item.city}}</v-card-text>  
            
            <v-card-text>{{item.state}}</v-card-text>        
        </v-card>
</div> 
</template>

<script>
import api from '../services/api';

export default {
    name:"viewAnimals",
    data: () => ({
            items:[],
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
                console.log(req[0].name);
                return req;
            /*for (let i = 0; i<= Object.keys(req).length; i++){
                let arrayInfo = req.data.[i]; //array
                console.log(arrayInfo);
                let name = arrayInfo.name;
                this.name = name;
                let breed = arrayInfo.breed;
                this.breed = breed;
                let age = arrayInfo.age;
                this.age = age; 
                let weight = arrayInfo.weight;
                this.weight = weight;
                let city = arrayInfo.city;
                this.city = city;  
                let state = arrayInfo.breed;
                this.state = state;           */                  
        } catch (err) {
            console.log("ops! ocorreu um erro" + err);
        }
        },
    } 
}
</script>

<style scoped>

</style>