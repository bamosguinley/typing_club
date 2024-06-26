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
    console.log(position);
    // Extraire les mots à partir de la position aléatoire jusqu'à nombreMot
   data2.value = data.slice(position, position + nombreMot);
   data2.value.forEach(el => {
     data3.value += el+' ';
   });
  return data3.value;
})


// Fonction pour un décompteur de 3 minutes
export function countdown() {
    let totalSeconds = 3 * 60; // 3 minutes en secondes
    let formattedTime = '';

    const intervalId = setInterval(function() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Formatage en mm:ss
        const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
        const formattedSeconds = (seconds < 10 ? '0' : '') + seconds;
        
        formattedTime = `${formattedMinutes}:${formattedSeconds}`;

        if (totalSeconds <= 0) {
            clearInterval(intervalId); // Arrête le décompteur une fois le temps écoulé
        } else {
            totalSeconds--; // Décrémente le nombre total de secondes
        }
    }, 1000); // Appel toutes les secondes (1000 ms)

    return formattedTime;
}
export default getWord;
  
