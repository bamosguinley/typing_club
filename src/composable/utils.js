import data from './data';
import { ref } from "vue";

let data2 = ref([]);
let data3 = ref([]);

let count = ref(0);
const refusedChar = ["œ", "Æ", "ë"];

const getWord = ((nombreMot) => {
  // Générer une position aléatoire dans le tableau data
  let position = Math.floor(Math.random() *(data.length-nombreMot+1) );

  // Extraire les mots à partir de la position aléatoire jusqu'à nombreMot
  data2.value = data.slice(position, position + nombreMot);

  // Parcourir les mots extraits
  data2.value.forEach(el => {
    let containsRefusedChar = false;

    // Vérifier si le mot contient un caractère refusé
    for (let char of el) {
      if (refusedChar.includes(char)) {
        containsRefusedChar = true;
        break;
      }
    }

    // Ajouter le mot à data3.value seulement s'il ne contient pas de caractère refusé
    if (!containsRefusedChar) {
      data3.value += el + ' ';
    } 
  });
 console.log(data3.value);
  return data3.value; // Re
});

// export default getWord;


// export default getWord;


// // Fonction pour un décompteur de 3 minutes
// export function countdown() {
//     let totalSeconds = 3 * 60; // 3 minutes en secondes
//     let formattedTime = '';

//     const intervalId = setInterval(function() {
//         const minutes = Math.floor(totalSeconds / 60);
//         const seconds = totalSeconds % 60;

//         // Formatage en mm:ss
//         const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
//         const formattedSeconds = (seconds < 10 ? '0' : '') + seconds;

//         formattedTime = `${formattedMinutes}:${formattedSeconds}`;

//         if (totalSeconds <= 0) {
//             clearInterval(intervalId); // Arrête le décompteur une fois le temps écoulé
//         } else {
//             totalSeconds--; // Décrémente le nombre total de secondes
//         }
//     }, 1000); // Appel toutes les secondes (1000 ms)

//     return formattedTime;
// }
export default getWord;


