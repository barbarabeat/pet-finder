import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';

Vue.use(Vuetify);
Vue.use(Toast);

new Vue({
  vuetify : new Vuetify(),
  router,
  render: h => h(App),
}).$mount('#app')