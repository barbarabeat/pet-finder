<template id="app">
  <v-app>
    <v-main>
      <v-container fluid>
        <router-view />
        </v-container>
        <Header/>
       <footer id="container"> <Footer/> </footer>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
    name: 'App',

    components: {
        Header,
        Footer,
    },
}
</script>

<style scoped>
    #app {
        background-color: #F0EFA3;
       /* height: 140vh;
        width:  100vw;*/
    }
    #container {
    }
</style>