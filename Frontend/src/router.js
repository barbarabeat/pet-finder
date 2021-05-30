import Vue from 'vue'
import Router from 'vue-router';

import Login from "./views/Login";
import ViewAnimals from './views/ViewAnimals';
import CreateAccount from './views/CreateAccount';
import UserUpdateInfo from './views/UserUpdateInfo';
import MyPets from './views/MyPets';

Vue.use(Router);

export default new Router({
    routes: [  
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/cadastrar",
            name: "createAccount",
            component: CreateAccount,
        },
        {
            path: "/atualizarCadastro",
            name: "userUpdateInfo",
            component: UserUpdateInfo,           
        },
        {
            path: "/animais",
            name: "viewAnimals",
            component: ViewAnimals
        },
        {
            path: "/meusPets",
            name: "myPets",
            component: MyPets
        },        
    ]
})