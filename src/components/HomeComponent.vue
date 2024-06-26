<script setup>
import { onMounted, ref, watch } from "vue";
import IconeTime from "./icons/IconeTime.vue";
import ResultComponent from "./ResultComponent.vue";

const words = ref("");
const wordsArray = ref([]);
const userInput = ref("");
const minutes = ref(0);
const seconds = ref(0);
const countWords = ref(1)
const keysToSkip = ["Shift", "CapsLock", "Dead"]

let count = 0;
let startCounter = ref(0);

const isResultVisible = ref(false);
const resultData = ref({
  precision: 0,
  speed: 0,
});

async function getWorlds() {
  fetch("https://trouve-mot.fr/api/random/1")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element, i) => {
        if (i < data.length - 1) {
          words.value += element.name + " ";
        } else {
          words.value += element.name;
        }
      });
      words.value.split("").forEach((letter) => {
        wordsArray.value.push({ char: letter, isRight: "", tentative: 0 });
        // compter le nombre de mots
        if (letter === " ") countWords.value++
      });
    });
}



function formatTime(t) {
  if (t < 10) {
    return `0${t}`;
  }
  return t;
}



function getUserInput(e) {
  if (startCounter.value < 1) {
    startCounter.value++;
  }
  if (count < wordsArray.value.length - 1) {
    if (!keysToSkip.includes(e.key)) {
      if (wordsArray.value[count].char === e.key) {
        wordsArray.value[count].tentative > 0
          ? (wordsArray.value[count].isRight = "repeat")
          : (wordsArray.value[count].isRight = "vrai");
        count++;
      } else {
        wordsArray.value[count].isRight = "faux";
        wordsArray.value[count].tentative++;
      }
    }
  } else {
    displayResult();
  }
}

function timer() {
  const intervalId = setInterval(() => {
    if (seconds.value === 60) {
      minutes.value++;
      seconds.value = 0;
    } else if (seconds.value < 60) {
      seconds.value++;
    }
    if (count === wordsArray.value.length - 1) clearInterval(intervalId);
  }, 1000);
}

function getPrecision() {
  const countChars = wordsArray.value.length - 1;
  const attempts = wordsArray.value.map((el) => el.tentative);
  const countAttempts = attempts.reduce((acc, curr) => acc + curr, 0);
  // console.log("tableau tentatives", attempts);
  // console.log("somme tentatives", countAttempts);
  return Math.floor(((countChars - countAttempts) * 100) / countChars);
}

function getSpeed() {
  const countMinutes = minutes.value + seconds.value / 60
  return Math.floor(countWords.value / countMinutes)
}

function displayResult() {
  resultData.value.precision = getPrecision();
  resultData.value.speed = getSpeed();
  isResultVisible.value = true;
}

watch(startCounter, () => {
  timer();
});

onMounted(() => {
  getWorlds();
  document.addEventListener("keydown", getUserInput);
});
</script>

<template>
  <div v-if="isResultVisible">
    <ResultComponent :data="resultData" />
  </div>
  <div v-else>
    <p class="start-text-container">
      <span v-show="!startCounter">Commencez à taper</span>
    </p>
    <div class="container">
      <p>{{ userInput }}</p>
      <p class="text-container">
        <span v-for="(letter, index) in wordsArray" :key="index" :class="{
          spaceClass: letter.char === ' ',
          letterClass: true,
          letterRight: letter.isRight === 'vrai',
          letterWrong: letter.isRight === 'faux',
          letterRepeat: letter.isRight === 'repeat',
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
  font-family: "Playwrite";
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
  padding-left: 10px;
  width: 10px;
  /* border-bottom: 1px solid blue; */
}

.letterClass {
  padding-inline: 5px;
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
}
</style>