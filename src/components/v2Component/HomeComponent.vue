<script setup>
import TimerComponent from "../v2Component/TimerComponent.vue";
import SpinnerComponent from "../v2Component/SpinnerComponent.vue";
import { onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import {
  getObject,
  getPrecision,
  getSpeed,
  getWord,
  setObject,
} from "@/composable/utils";
import ResultComponent from "./ResultComponent.vue";

const preventKey = ["Shift", "CapsLock", "Dead"];
const refreshPage = () => {
  location.reload();
};
let word = ref([]);
let start = ref(false);
let wordObject = ref([]); //Initialiser un tableau d'objet mot
onBeforeMount(() => {
  word.value = getWord(50);
  if (localStorage.getItem(1) == undefined) {
    setObject(1, word.value);
  }
});

//Ecouter la frappe dès le chargement de la page
onMounted(() => {
  document.addEventListener("keydown", Input);
  word.value = getObject(1);
  word.value.forEach((el) => {
    wordObject.value.push({
      mot: el + " ",
      isFinding: "",
      isCurrent: false,
      wrongPerWord: 0,
    });
  });
  setTimeout(() => {
    return (start.value = true);
  }, 2000);
});

const typingCount = ref(0);
const counting = ref(false);
const wordCounter = ref(0);
const letterCounter = ref(0);
let wrongCount = ref(0);
const timeIsUp = ref(false); // Variable pour vérifier si le temps est écoulé
let vitesse = 0;
let totalWrong = 0;
let precision = 0;

/**
 * Stocker localement les mots actuel
 * @param word
 */
function storeRandomWord(word) {
  let currentStorage = localStorage.setItem("randomWord", word);
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
  if (preventKey.includes(e.key)) {
    return; // Ignorer cette touche et sortir de la fonction
  }
  typingCount.value++;
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
        // Si la lettre est correcte, passe à la lettre suivante
        letterCounter.value++;
        console.log(wrongCount.value);
        // Vérifie si toutes les lettres du mot ont été vérifiées
        if (letterCounter.value === currentWord.length) {
          //Vérifier si le nombre d'erreur par mot est 0
          console.log(": " + wrongCount.value);
          if (wrongCount.value === 0) {
            wordObject.value[wordCounter.value].isFinding = "vrai";
          }
          // Passe au mot suivant
          wordCounter.value++;
          wordObject.value[wordCounter.value].isCurrent = true;
          letterCounter.value = 0; // Réinitialiser le compteur des lettres pour le nouveau mot
          wrongCount.value = 0;
        }
      } else if (e.key === "Backspace" && letterCounter.value > 0) {
        /**
         * Retourner en arrière en cas d'erreur
         */
        wordObject.value[wordCounter.value].isFinding = "";
        letterCounter.value--;
        wrongCount.value--;
        console.log(wrongCount.value);
        console.log(letterCounter.value);
      } else {
        letterCounter.value++;
        wordObject.value[wordCounter.value].isFinding = "faux";
        wrongCount.value++;
        wordObject.value[wordCounter.value].wrongPerWord++;
        console.log(
          "erreur de frappe" + wordObject.value[wordCounter.value].wrongPerWord
        );
        if (letterCounter.value === currentWord.length) {
          //Vérifier si le nombre d'erreur par mot est 0
          console.log(": " + wrongCount.value);
          wordCounter.value++;
          wordObject.value[wordCounter.value].isCurrent = true;
          letterCounter.value = 0; // Réinitialiser le compteur des lettres pour le nouveau mot
          wrongCount.value = 0;
        }
      }
    }
  }

  // // Si wordCounter a atteint la fin des mots
  // if (wordCounter.value === wordObject.value.length) {
  //   console.log("Tous les mots ont été vérifiés.");
  // }
}

// Watcher pour la propriété vitesse
watch(
  () => timeIsUp.value,
  () => {
    vitesse = getSpeed(wordCounter.value, 3);
    const attemps = wordObject.value.map((el) => el.wrongPerWord);
    const totalCaract = wordObject.value
      .map((el) => el.mot.length)
      .reduce((acc, el) => el + acc, 0);
    console.log(totalCaract);
    totalWrong = attemps.reduce((acc, el) => el + acc, 0);
    precision = getPrecision(totalCaract, totalWrong);
    localStorage.clear();
  }
);
</script>
<template>
  <div class="global">
    <div class="loader" v-if="start === false">
      <spinner-component />
    </div>
    <div class="contenu" v-else>
      <div class="container" v-if="timeIsUp === false">
        <TimerComponent
          v-if="counting"
          @sendTimeOver="(el) => (timeIsUp = el)"
        />
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
          <span
            class="letterSpan"
            v-for="(letter, index1) in word.mot.split('')"
            :key="index1"
            :class="{
              green: index === wordCounter && index1 === letterCounter,
            }"
          >
            {{ letter }}
          </span>
        </span>
      </div>
      <ResultComponent
        v-if="timeIsUp === true"
        :vitesseProps="vitesse"
        :precisionProps="precision"
      />
      <div class="restart">
        <a href="">
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
    </div>
  </div>
</template>
<style scoped>
/* .global{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}
.loader{
  text-align: center;
  margin: 0 auto;
} */
.green {
  color: rgb(90, 92, 90);
  background-color: #5b5e5b6c;
  border-bottom: 1px solid;
}

/* Style pour le contenu du texte */
.container {
  max-width: 1000px;
  width: 100%;
  height: 300px;
  margin: 2rem auto;
  background-color: transparent;
  padding: 3rem;
  margin-bottom: 2rem;
  overflow: clip;
}
.restart {
  margin-top: 10rem;
  text-align: center;
  color: rgb(223, 113, 50);
  position: relative;
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
  color: #e20606;
}
.letterSpan {
  padding: 0 4px;
}
</style>

