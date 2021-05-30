<template>
<div class="login">
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
    v-model="city"
    :rules="cityRules"
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
    Criar
    </v-btn>
    <v-btn
    class="mr-4"
    @click="clear"
    >
    Limpar
    </v-btn> 
    <a href="#/login">Já tem conta?</a>       
</v-form>
</div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'createAccount',
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
    city:'',
    cityRules: [
        v => !!v || 'Cidade é obrigatório',
    ],    
    state:'',
    stateRules: [
        v => !!v || 'UF',
    ],    
    password: '',
    passwordRules: [
         value => !!value || "Obrigatório",
           // eslint-disable-next-line
        // value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value) ||
       // "Min. 8 characters with at least one capital letter, a number and a special character."
    ],
    }),

    methods: {
    async submit() {
        await api.post("/users",{
            name: this.name,
            email: this.email,
            password: this.password,
            city: this.city,
            state: this.state,
            });
        this.$toast.success('Cadastrado com sucesso!', {
                timeout: 2000,
         }); 
         this.clear();           
    },
    clear () {
        this.name = '',
        this.email = '',
        this.password = null,
        this.city = '',
        this.state = '',
        this.$refs.observer.reset()
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
        margin-top: 60px;
    }

</style>