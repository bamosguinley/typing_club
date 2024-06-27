<template>
  <span v-for="el in data2" :key="el.index">
    {{ el }}
  </span>
</template>

<script setup>
/**
 * l'importation  du fichier data(contient lest mot que l'on va affivhier lors de saisir) 
 */
import data from "@/composable/data";
import { ref } from "vue";
console.log(data);
/**data2 est le nouveau tableau qui va nous permettre de recuper une portion des mot de notre data */
let data2 = ref([]);
let count = ref(0)
let position=0;
// console.log(data2.value);
function getWord(nombreMot) {
  // Générer une position aléatoire dans le tableau data
    let position = Math.floor(Math.random() * data.length);
    console.log(position);
    // Extraire les mots à partir de la position aléatoire jusqu'à nombreMot
    data2.value = data.slice(position, position + nombreMot);
  return data2.value;
}

console.log(getWord(10));
</script>

<style scoped>
</style>