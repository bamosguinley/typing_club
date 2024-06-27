<script setup>
import TimerComponent from "../v2Component/TimerComponent.vue";
import { onMounted, ref } from "vue";
const refreshPage = () => {
  location.reload();
};
import getWord from "@/composable/utils";

let words = getWord(25); //Mots récupérés de façon aléatoire
let wordObject = ref([]); //Initialiser un tableau d'objet mot
const counting = ref(false);
const wordCounter = ref(0);
const letterCounter = ref(0);
let succedWord = ref(0);
const minutes = 2;
const secondes = 56;

/**
 * Ajouter chaque objet mot au tableau wordObject
 */
words.forEach((el) => {
  wordObject.value.push({
    mot: el + " ",
    isFinding: "",
    isCurrent: false,
    attemps: 0,
  });
});

/**
 * Stocker localement les mots actuel
 * @param word
 */
function storeRandomWord(word) {
  let currentStorage = localStorage.setItem("randomWord", word);
  console.log(currentStorage);
  let storedRandomWord = currentStorage.getItem("randomWord");
  return storedRandomWord;
}

/**
 * Récupérer la frappe au clavier et qui gère le declenchement du timer
 * @param e
 */
function Input(e) {
  if (!counting.value) {
    counting.value = true;
  }
  console.log(e.key);

  // Vérifie si wordCounter est inférieur à la longueur totale des mots
  if (wordCounter.value < wordObject.value.length) {
    // Récupère le mot actuel à tester
    let currentWord = wordObject.value[wordCounter.value].mot;
    //Passer la propriété du mot courant a true pour appliquer une class
    wordObject.value[wordCounter.value].isCurrent = true;
    // Vérifie si letterCounter est inférieur à la longueur du mot actuel
    if (letterCounter.value < currentWord.length) {
      // Récupère la lettre attendue dans le mot actuel
      let expectedLetter = currentWord.charAt(letterCounter.value);

      // Compare la lettre entrée avec la lettre attendue
      if (e.key === expectedLetter) {
        console.log("Exact");
        // Si la lettre est correcte, passe à la lettre suivante
        letterCounter.value++;

        // Vérifie si toutes les lettres du mot ont été vérifiées
        if (letterCounter.value === currentWord.length) {
          wordObject.value[wordCounter.value].isFinding = "vrai";
          // console.log("Mot complet: " + currentWord);
          // Passe au mot suivant
          wordCounter.value++;
          letterCounter.value = 0; // Réinitialiser le compteur des lettres pour le nouveau mot
        }
      } else {
        wordObject.value[wordCounter.value].isFinding = "faux";
        let x = wordObject.value[wordCounter.value].attemps++; // Incrementation du nombre de tentative pour chaque mot
        console.log("nombres de mauvaise tentatives " + x);
      }
    }
  }

   // Si wordCounter a atteint la fin des mots
   if (wordCounter.value === wordObject.value.length) {
     // console.log("Tous les mots ont été vérifiés.");
   }
 }

     /**
      * fonction de calcul de précision
       */
  const getPrecision = () => {
    let totalAttempts = wordObject.value.reduce( 
      (acc, el) => acc + el.attemps,// fait la somme de tous les tentatives de chaque objet (mot)
      0
    );
    let precision = ((words.length - totalAttempts) / words.length) * 100; // fait le nombre de mots réussis * 100 , puis divise le resultat par le nombre total de mots 
    if (precision <= 0) { // la précision ne doit pas être en dessous de 0
      precision = 0;
    }
    console.log(precision);
    succedWord.value = words.length - totalAttempts; //nombre de mots réussis
    return precision; // retour de la précision
  };
 getPrecision();

/**
 * fonction de calcul de la vitesse 
 */

const getSpeed = () => {
  let totalAttempts = wordObject.value.reduce((acc, el) => acc + el.attemps, 0); //somme de tous les tentatives manquées de chaque objet (mot)
  succedWord.value = words.length - totalAttempts; // nombre de mots réussis 
  let time = minutes + secondes / 60; // calcul du temps et conversion en minutes 
  let speed = succedWord.value / time; // calcul de la vitesse
  console.log("nombres de mots réussis" + succedWord.value);
  return speed; // retour de la valeur de la vitesse 
};
console.log(getSpeed());

// console.log(attempts);
//Ecouter la frappe dès le chargement de la page
onMounted(() => {
  document.addEventListener("keydown", Input);
});
</script>
<template>
  <div class="container">
    <TimerComponent v-if="counting" />
    <span
      class="text"
      v-for="(word, index) in wordObject"
      :key="index"
      :class="{
        writeWord: word.isFinding === 'vrai',
        wrongWord: word.isFinding === 'faux',
        currentW: word.isCurrent === true,
      }"
    >
      {{ word.mot }}
    </span>
  </div>
  <div class="restart">
    <a href="#" @click="storeRandomWord(wordObject)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="60px"
        viewBox="0 -960 960 960"
        width="60px"
        fill="#df7132"
      >
        <path
          d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"
        />
      </svg>
    </a>
  </div>
</template>
<style scoped>
/* Style pour le contenu du texte */
.container {
  max-width: 1000px;
  width: 100%;
  height: 300px;
  margin: 2rem auto;
  background-color: transparent;
  padding: 2rem;
  overflow: clip;
}
.restart {
  text-align: center;
  color: rgb(223, 113, 50);
}
.timer {
  font-size: 3rem;
  color: #df7132;
}
/* style pour le text  */
.text {
  font-size: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  line-height: 1.5;
  text-align: justify;
  opacity: 0.5;
}
.writeWord {
  color: green;
}
.currentW {
  background-color: #4947473a;
}
.wrongWord {
  background-color: #e20606;
}
</style>

