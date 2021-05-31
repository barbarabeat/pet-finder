<template>
<div>
    <v-app-bar
    app
    color="#72bef0"
    >
    <div class="d-flex align-center">
        <a href="#/animais">
        <v-img
        alt="Pet Finder Logo"
        :src="require('../assets/pet-finder-logo.png')"
        class="shrink mr-2"
        contain
        transition="scale-transition"
        width="63"
        />
        </a>

    </div>

    <v-spacer></v-spacer>
    <v-menu
            bottom
            left
        >
        <template v-slot:activator="{ on, attrs }">
        <v-btn
            icon
            v-bind="attrs"
            v-on="on"
        >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
        </template>
        <v-list color="#72bef0">
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                color="white"
                :to="item.href"
            >
            <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title >{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</div>
</template>

<style scoped>
    .v-list-item-title {
        color: aliceblue;
    }
</style>

<script>
export default {
    data: () => ({
        items: [
            {
            icon: 'mdi-logout',
            title: 'Logoff',
            href: '/login'
            },
            {
            icon: 'mdi-account-edit-outline',
            title: 'Meus Dados',
            href: '/atualizarCadastro/'
            },
            { 
            icon: 'mdi-dog',
            title: 'Meus Pets',
            href: '/meusPets'
            },
        ],
    }),   
    };
</script>
