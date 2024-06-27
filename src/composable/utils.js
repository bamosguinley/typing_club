import data from './data'
import { ref } from "vue";
let data2 = ref([]);
let data3 = ref([]);

let count = ref(0)
let position=0;
// console.log(data2.value);
 const getWord= ((nombreMot)=> {
  // Générer une position aléatoire dans le tableau data
    let position = Math.floor(Math.random() * data.length);
    // console.log(position);
    // Extraire les mots à partir de la position aléatoire jusqu'à nombreMot
   data2.value = data.slice(position, position + nombreMot);
   data2.value.forEach(el => {
     data3.value += el+' ';
   });
  return data3.value;
})
