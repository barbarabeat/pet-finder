<template>
<div class="userUpdateInfo">
<v-col
    cols="12"
    sm="4"
    md="6"
    offset-md="3"
 >
    <v-card
        elevation="8"
        shaped
        tile
        outlined
        class=" pa-8 ma-6"
        color="white" >
            <v-card-title class="text">Atualizar cadastro</v-card-title>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
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
            v-model="email"
            :rules="emailRules"
            value="email"
            label="E-mail"
            required
            outlined
            ></v-text-field>


            <v-text-field
            v-model="street"
            :rules="cityRules"
            value="street"
            label="Rua"
            outlined
            ></v-text-field>


            <v-text-field
            v-model="number"
            type="number"
            value="number"
            label="Número"
            outlined
            ></v-text-field>


            <v-text-field
            v-model="additional"
            value="additional"
            label="Complemento"
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

        <v-text-field
            v-model="password"
            :rules="passwordRules"
            value="password"
            label="Senha"
            required
            hint="Sua senha necessita ter números, letras e um caractere especial"
            :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
            :type="value ? 'text' : 'password'" 
            @click:append="value = !value"
            outlined
            ></v-text-field>
            
            <v-btn
            color="success"
            class="mr-4"
            type="submit"
            @click="submit"
            >
            Atualizar
            </v-btn>
            <v-btn
            class="mr-4"
            @click="clear"
            >
            Limpar
            </v-btn>
        <v-btn
            color="error"
            text
            class="alignButton"
            @click="deleteUser"
        >
            Deletar Cadastro
        </v-btn>            
        </v-form>
        </v-card>
    </v-col>    
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
    nameRules: [
        v => !!v || 'Nome é obrigatório',
    ],
    email: '',
    emailRules: [
        v => !!v || 'E-mail é obrigatorio',
        v => /.+@.+\..+/.test(v) || 'Email necessita ser um válido. Exemplo:user@email.com',
    ],
    password: '',
    passwordRules: [
         value => !!value || "Obrigatório",
           // eslint-disable-next-line
        // value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value) ||
       // "Min. 8 characters with at least one capital letter, a number and a special character."
    ],
    street: '',
    number: '',
    additional: '',
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
            try{ await api.put(`/users/${localStorage.userId}`,{
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    street: this.street,
                    number: this.number,
                    additional: this.additional,           
                    city: this.city,
                    state: this.state,
                });
                this.$router.push('/');
            }catch(err){
                this.$toast.error('Erro ao cadastrar', {
                timeout: 2000,
                });
            }              
        },
        clear () {
            this.name = '';
            this.email = '';
            this.password = null;
            this.street = '';
            this.number = '';
            this.additional = '';
            this.city = '';
            this.state = '';
        },
        async deleteUser(userId) {
            
            try{ await api.delete(`/users/${userId}`);
                this.$router.push('/');
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
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 40px;
    }
    .text{
        justify-content: center;
        align-items: center;
    }
    .alignButton{
        margin-left: 170px;
           }
</style>