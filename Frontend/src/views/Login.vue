<template>
<div class="login">
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
>

    <v-text-field
    v-model="email"
    :rules="emailRules"
    value="email"
    label="E-mail"
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
    @click:append="() => (value = !value)"
    :type="value ? 'text' : 'password'"  
    outlined
    ></v-text-field>

    <v-btn
    color="success"
    class="mr-4"
    type="submit"
    @click="submit"
    >
    Entrar
    </v-btn> 
    <a href="#/cadastrar">Não tem cadastro?</a>       
</v-form>
</div>
</template>

<script>
import api from '../services/api';

export default {
    data: () => ({
        name: 'login',
        valid: true,
        value: false,
        token:'',
        email: '',
        emailRules: [
            v => !!v || 'E-mail é obrigatorio',
            v => /.+@.+\..+/.test(v) || 'Email necessita ser um válido. Exemplo: user@email.com',
        ],
    password: '',
    passwordRules: [
         value => !!value || "Obrigatório",
           // eslint-disable-next-line
        // value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value) ||
       // "Min. 8 characters with at least one capital letter, a number and a special character."
    ],
    }),
    mounted() {
        if (localStorage.token) {
        this.token = localStorage.token;
        }
    },
    methods: {
        async submit() {
        try{ 
                const resp = await api.post("/sessions",{
                email: this.email,
                password: this.password,
                });
                localStorage.token = this.resp;
                const token = resp.data.token;
                const id = resp.data.user.id;
                api.defaults.headers.Authorization = `Bearer ${token}`;
                localStorage.token = token;
                localStorage.userId = id;
                this.$router.push('/animais');


            }catch(err){
                this.$toast.error('Email/Senha inválido!', {
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
        margin-top: 100px;
    }

</style>