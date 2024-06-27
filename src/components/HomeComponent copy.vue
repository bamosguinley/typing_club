<script setup>
import { onMounted, ref, watch } from "vue";
import IconeTime from "./icons/IconeTime.vue";
import ResultComponent from "./ResultComponent.vue";

const words = ref("");
const lettersArray = ref([]);
const wordsArray = ref([]);
const minutes = ref(0);
const seconds = ref(0);
const countWords = ref(1);
const keysToSkip = ["Shift", "CapsLock", "Dead", "Control", "Alt"];
let count = 0;
let startCounter = ref(0);
const isResultVisible = ref(false);
const resultData = ref({
  precision: 0,
  speed: 0,
  time: 0,
});
const textContainersRef = ref(null);


/**
 * Fonction permettant d'obtenir les mots à travvers un API
 */
async function getWorlds() {
  fetch("https://trouve-mot.fr/api/random/30")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element, i) => {
        if (i < data.length - 1) {
          words.value += element.name + " ";
        } else {
          words.value += element.name;
        }
      });
      // retourne les lettres des sous forme d'objets dans le tableau lettersArray
      words.value.split("").forEach((letter) => {
        lettersArray.value.push({ char: letter, isRight: "", tentative: 0 });
        // compter le nombre de mots
        if (letter === " ") countWords.value++;
      });

      // retourne les mots sous forme d'objets dans le tableau wordsArray
      data.forEach((word, index) => {
        const letters = [];

        word.name.split("").forEach(letter => {
          letters.push({ char: letter, isRight: "", tentative: 0 })
        })

        if (index !== data.length - 1) {
          // if (wordsArray.value[index - 1].type === "space") {
          wordsArray.value.push({ value: word.name, letters, isRight: "", type: "word" }, { value: " ", isRight: "", type: "space" });
          // }
        } else {
          wordsArray.value.push({ value: word.name, letters, isRight: "", type: "word" });
        }
      });


      console.log("API words array", data);
      console.log("lettersArray", lettersArray.value);
      console.log("wordsArray", wordsArray.value);
    });
}

/**
 * Formate le temps effectué en un format mm:ss
 */
function formatTime(t) {
  if (t < 10) {
    return `0${t}`;
  }
  return t;
}

function getUserInput(e) {
  // console.log("back space", e.key);
  // Détecter la toute première frappe
  if (startCounter.value < 1) {
    startCounter.value++;
  }
  if (count < lettersArray.value.length - 1) {
    // condition de suppression
    if (e.key === "Backspace") {
      // à la première lettre, on retire le style lié à isRight sans décrémenter count
      if (count === 0) {
        lettersArray.value[count].isRight = "";
        console.log("count", count);
        console.log("element suppr", lettersArray.value[count].isRight);
        // après le premier caractère on décrémente count puis on retire le style lié à isRight
      } else {
        lettersArray.value[--count].isRight = "";
        console.log("count", count);
        console.log("element suppr", lettersArray.value[count].isRight);
      }
    } else if (!keysToSkip.includes(e.key)) {
      if (lettersArray.value[count].char === e.key) {
        lettersArray.value[count].tentative > 0
          ? (lettersArray.value[count].isRight = "succesAfterManyAttempts")
          : (lettersArray.value[count].isRight = "successAfterOneAttempt");
      } else {
        lettersArray.value[count].isRight = "failed";
        lettersArray.value[count].tentative++;
      }
      count++;
    }
  } else {
    // supprimer les écouteurs d'évênements
    document.removeEventListener("keydown", getUserInput)
    document.removeEventListener("keydown", stopSpaceKeyScrolling)
    // Afficher le composant ResultComponent après la dernière frappe
    displayResult();
  }
}

/** Compter le temps en minutes et en secondes */
function timer() {
  const intervalId = setInterval(() => {
    if (seconds.value === 60) {
      minutes.value++;
      seconds.value = 0;
    } else if (seconds.value < 60) {
      seconds.value++;
    }
    if (count === lettersArray.value.length - 1) clearInterval(intervalId);
  }, 1000);
}

/** Calculer la précision */
function getPrecision() {
  const countChars = lettersArray.value.length - 1;
  const attempts = lettersArray.value.map((el) => el.tentative);
  const countAttempts = attempts.reduce((acc, curr) => acc + curr, 0);
  return Math.floor(((countChars - countAttempts) * 100) / countChars);
}

/** Calculer la vitesse */
function getSpeed() {
  const countMinutes = minutes.value + seconds.value / 60;
  return Math.floor(countWords.value / countMinutes);
}

// Afficher le composant ResultComponent
function displayResult() {
  resultData.value.precision = getPrecision();
  resultData.value.speed = getSpeed();
  resultData.value.time = `${formatTime(minutes.value)} min ${formatTime(
    seconds.value
  )} s`;
  // Stopper l'écouteur d'évênements

  isResultVisible.value = true;
}

// Lancer le counter à la première frappe
watch(startCounter, () => {
  timer();
});

/** Empêcher défilement à la frappe de la touche Space */
function stopSpaceKeyScrolling(e) {
  if (e.code == "Space" && e.target == document.body) {
    e.preventDefault();
  }
}

onMounted(() => {
  getWorlds();
  console.log("textContainersRef", textContainersRef);
  console.log("tex tContainers width", textContainersRef.value.clientWidth);
  window.addEventListener("keydown", stopSpaceKeyScrolling);
  document.addEventListener("keydown", getUserInput);
});
</script>

<template>
  <div v-if="isResultVisible">
    <!-- resultData est l'objet contenant la vitesse, la précision et la durée de la session -->
    <ResultComponent :data="resultData" />
  </div>
  <div v-else>
    <p class="start-text-container">
      <span v-show="!startCounter">Commencez à taper</span>
    </p>
    <div class="container">
      <p class="text-container" ref="textContainersRef">
        <!-- <p v-for="(mot, i) in mots" ></p> -->
        <span v-for="(letter, index) in lettersArray" :key="index" :class="{
          spaceClass: letter.char === ' ',
          letterClass: true,
          letterRight: letter.isRight === 'successAfterOneAttempt',
          letterWrong: letter.isRight === 'failed',
          letterRepeat: letter.isRight === 'succesAfterManyAttempts',
        }">
          {{ letter.char }}
        </span>
      </p>
    </div>
    <p class="start-text-container">
      <IconeTime /><br />
      <span>{{ formatTime(minutes) + " : " + formatTime(seconds) }}</span>
    </p>
  </div>
</template>

<style scoped>
.start-text-container {
  text-align: center;
}

.start-text-container span {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding: 8px;
  font-weight: bold;
  display: inline-block;
  color: #fff;
  background-color: #0275d8;
}

.container {
  line-height: 70px;
  /* font-family: "Playwrite"; */
  font-size: 50px;
  width: 90%;
  margin: 0 auto;
  height: fit-content;
  box-shadow: 5px 5px 12px gray;
  background-color: #fff;
}

.spaceClass {
  content: " ";
  padding: 0;
  padding-inline: 8px !important;

  width: 10px;
}

.letterClass {
  padding-inline: 3px;
  padding-bottom: 0;
  margin-left: 2px;
}

.letterRight {
  color: green;
  background-color: rgba(172, 255, 47, 0.3);
  border-bottom: 3px solid rgb(120, 185, 23);
  box-shadow: 1px 1px 1px;
}

.letterWrong {
  color: red;
  background-color: rgba(255, 0, 0, 0.3);
  border-bottom: 3px solid red;
  box-shadow: 1px 1px 1px;
}

.letterRepeat {
  color: orange;
  background-color: rgba(255, 166, 0, 0.3);
  border-bottom: 3px solid orange;
  box-shadow: 1px 1px 1px;
}

.text-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  border: 1px solid red;
}
</style>
