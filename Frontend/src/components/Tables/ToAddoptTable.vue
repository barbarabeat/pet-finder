
<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pets"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
//import api from '../services/api';

export default {
data () {
      return {
        search: '',
        headers: [
          {
            text: 'Nome',
            align: 'start',
            filterable: true,
            value: 'name',
          },
          { text: 'Animal', value: 'animal' },
          { text: 'Raça', value: 'breed' },
          { text: 'Idade', value: 'age' },
          { text: 'Peso', value: 'weight' },
          { text: 'Cidade', value: 'city' },
          { text: 'Estado', value: 'state' },
        ],
        pets: [
         /* axios.get("/pets")
                .then((resp) => (resp.data)
                .catch((err) => {
               console.error("ops! ocorreu um erro" + err);
          });*/
        ]
      }
    },
}; 
</script>

<style lang="scss" scoped></style>
