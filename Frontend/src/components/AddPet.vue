<template>
<div class="addPet">
<v-card
    elevation="8"
    shaped
    tile
    outlined
    class="mx-auto my-4"
    offset-md="1"
    color="white" >
        <v-card-title class="text">Adicionar Pet</v-card-title>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        class ="addPet"
    >
        <v-text-field
        v-model="name"
        :rules="nameRules"
        value="name"
        label="Nome"
        required
        outlined
        ></v-text-field>

        <v-text-field
        v-model="breed"
        :rules="breedRules"
        value="breed"
        label="Raça"
        required
        outlined
        ></v-text-field>


        <v-text-field
        v-model="age"
        type="number"
        value="agw"
        label="Idade"
        outlined
        ></v-text-field>


        <v-text-field
        v-model="weight"
        type="number"
        value="weight"
        label="Peso"
        outlined
        ></v-text-field>

        <v-text-field
        v-model="city"
        value="city"
        label="Cidade"
        required
        outlined
        ></v-text-field>

        <v-text-field
        v-model="state"
        :rules="stateRules"
        value="state"
        label="Estado"
        max="2"
        required
        outlined
        ></v-text-field>
        
        <v-btn
        color="success"
        class="mr-4"
        type="submit"
        @click="submit"
        >
        Cadastrar
        </v-btn>
        <v-btn
        class="mr-4"
        @click="clear"
        >
        Limpar
        </v-btn>    
    </v-form>
</v-card>
</div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'userUpdateInfo',
    data: () => ({
    valid: true,
    value: false,
    name: '',
    userId:'',
    nameRules: [
        v => !!v || 'Nome é obrigatório',
    ],
    breed: '',
    breedRules: [
        v => !!v || 'Raça é obrigatorio',
    ],
    age: '',
    weight: '',
    city:'',
    cityRules: [
        v => !!v || 'Cidade é obrigatório',
    ],    
    state:'',
    stateRules: [
        v => !!v || 'UF',
    ],
    }),

    mounted() {
        if (localStorage.token) {
        this.token = localStorage.token;
        this.userId = localStorage.userId;
        }
        api.defaults.headers.Authorization = `Bearer ${this.token}`;
    },

    methods: {
        async submit() {
            try{ await api.post("/pets",{
                    name: this.name,
                    breed: this.breed,
                    age: this.age,
                    weight: this.weight,        
                    city: this.city,
                    state: this.state,
                    isAdopted: false,
                });
                this.$toast.success('Pet incluído :D', {
                    timeout: 2000,
                });
             this.$router.push('/animais');
            }catch(err){
                this.$toast.error('Erro ao cadastrar', {
                timeout: 2000,
                });
        }            
        },
        clear() {
            this.name = '';
            this.breed = '';
            this.age = null;
            this.weight = '';
            this.city = '';
            this.state = '';
            
        },
    },
}
</script>

<style scoped>
    .addPet {
        margin: 1em;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 20px;
    }
    .text{
        justify-content: center;
        align-items: center;
    }
</style>