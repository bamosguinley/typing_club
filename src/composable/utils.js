import data from "./data";
import { ref } from "vue";
let data2 = ref([]);
let data3 = ref([]);
let dataAleatoire = ref([]);

let count = ref(0);
const refusedChar = ["œ", "Æ"];

// Ajoute les mots de chaque élément à data2.value au lieu de le réinitialiser
data.forEach((element) => {
  data2.value = data2.value.concat(element.split(/\s/));
});

const getWord = (nombreMot) => {
  // Génére une position aléatoire dans le tableau data2.value
  let position = Math.floor(
    Math.random() * (data2.value.length - nombreMot + 1)
  );

  // Extraire les mots à partir de la position aléatoire jusqu'à nombreMot
  dataAleatoire.value = data2.value.slice(position, position + nombreMot);
  console.log("Mots extraits avant filtrage :", dataAleatoire.value);
  // Parcours les mots extraits
  data3.value = []; // Réinitialiser data3.value en tant que tableau
  dataAleatoire.value.forEach((el) => {
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
      data3.value.push(el);
    }
  });
  return data3.value; // Retourner data3.value en tant que tableau
};

// export default getWord;

// export default getWord;

// Fonction pour un décompteur de 3 minutes
export const chrono = function countdown() {
  let totalSeconds = 3 * 60; // 3 minutes en secondes
  let formattedTime = "";

  const intervalId = setInterval(function () {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Formatage en mm:ss
    const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
    const formattedSeconds = (seconds < 10 ? "0" : "") + seconds;

    formattedTime = `${formattedMinutes}:${formattedSeconds}`;

    if (totalSeconds <= 0) {
      clearInterval(intervalId); // Arrête le décompteur une fois le temps écoulé
    } else {
      totalSeconds--; // Décrémente le nombre total de secondes
    }
  }, 1000); // Appel toutes les secondes (1000 ms)

  return formattedTime;
};

export default getWord;

/*
 *Stocker les données
 */
export function storeRandomWord(word) {
  localStorage.setItem("randomWord", word);
  window.addEventListener("load", () => {
    const storedRandomWord = localStorage.getItem("randomWord");
    return storedRandomWord;
  });
}





// fonction du song des bonnes touche touches

const audioValid = new Audio('../composable/assets/songs/COMType_Machine a ecrire touche (ID 2842)_LS.wav');

function playAudioValid() {
    audioValid.play(); // Démarre la lecture du fichier audio
}
// Exemple d'écouteur d'événement sur un bouton
const goodLetter = document.getElementById('classe de la touche');
goodLetter.addEventListener('nom de l\'evenement', playAudioValid);



// fonction du song des mauvaises touches
const audioFail = new Audio('../composable/assets/songs/FGHTImpt_Coup de poing 12 (ID 2467)_LS.wav');

function playAudioValid() {
    audioFail.play(); // Démarre la lecture du fichier audio
}
// Exemple d'écouteur d'événement sur un bouton
const wrongLetter = document.getElementById('classe de la touche');
wrongLetter.addEventListener('nom de l\'evenement', playAudioValid);




