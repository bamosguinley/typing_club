import data from './data';
import { ref } from "vue";

let data2 = ref([]);
let data3 = ref([]);

let count = ref(0);
const refusedChar = ["œ", "Æ", "ë"];

const getWord = ((nombreMot) => {
  // Générer une position aléatoire dans le tableau data
  let position = Math.floor(Math.random() * data.length);
  console.log(position);

  // Extraire les mots à partir de la position aléatoire jusqu'à nombreMot
  data2.value = data.slice(position, position + nombreMot);

  for (let el = 0; el < data.length; el++) {
    let containsRefusedChar = false;

    for (let char = 0; char < data[el].length; char++) {
      if (refusedChar.includes(data[el][char])) {
        containsRefusedChar = true;
        break;
      }
    }

    if (containsRefusedChar) {
      // Si le mot contient un caractère refusé, change `position` et met à jour `data2.value`
      position = Math.floor(Math.random() * data.length);
      data2.value = data.slice(position, position + nombreMot);
      data3.value= data2.value+ "     "
    }

    // Ajoute le mot actuel à data3.value une seule fois
    // data2.value.push(data[el]+" ");
    data3.value= data2.value+ "   "
    console.log("fdf");
  }

  // console.log(data2.value);
  console.log(data3.value);
  return data3.value;
});

// export default getWord;


// Fonction pour un décompteur de 3 minutes
export function countdown() {
  let totalSeconds = 3 * 60; // 3 minutes en secondes
  let formattedTime = '';

  const intervalId = setInterval(function () {
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

