<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";
import TimerComponent from "../v2Component/TimerComponent.vue";
import SpinnerComponent from "../v2Component/SpinnerComponent.vue";
import {
  getObject,
  getPrecision,
  getSpeed,
  getWord,
  setObject,
} from "@/composable/utils";
import ResultComponent from "./ResultComponent.vue";

const preventKey = ["Shift", "CapsLock", "Dead"];

const word = ref([]);
const start = ref(false);
const wordObject = ref([]);
const typingCount = ref(0);
const counting = ref(false);
const wordCounter = ref(0);
const letterCounter = ref(0);
const wrongCount = ref(0);
const timeIsUp = ref(false);
let vitesse = 0;
let totalWrong = 0;
let precision = 0;
let nbrSecondActuel = ref(0);
const containerRef = ref(null);
let endBeforeTime = ref(false);

onBeforeMount(() => {
  word.value = getWord(20);
  if (!localStorage.getItem(1)) {
    setObject(1, word.value);
  }
});

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
    start.value = true;
  }, 2000);
});

function refreshPage() {
  location.reload();
}
// const autoScrollIfNeeded = () => {
//   if (containerRef.value) {
//     const container = containerRef.value;
//     container.scrollTop = container.scrollHeight;
//   }
// };

function Input(e) {
  if (!counting.value) {
    counting.value = true;
  }
  if (preventKey.includes(e.key)) {
    return;
  }
  typingCount.value++;
  console.log(endBeforeTime.value);
  if (wordCounter.value < wordObject.value.length) {
    let currentWord = wordObject.value[wordCounter.value].mot;

    wordObject.value[wordCounter.value].isCurrent = true;

    if (letterCounter.value < currentWord.length) {
      let expectedLetter = currentWord.charAt(letterCounter.value);

      if (e.key === expectedLetter) {
        letterCounter.value++;

        if (letterCounter.value === currentWord.length) {
          if (wrongCount.value === 0) {
            wordObject.value[wordCounter.value].isFinding = "vrai";
          }
          wordCounter.value++;
          wordObject.value[wordCounter.value].isCurrent = true;
          letterCounter.value = 0;
          wrongCount.value = 0;
        }
      } else if (e.key === "Backspace" && letterCounter.value > 0) {
        wordObject.value[wordCounter.value].isFinding = "";
        letterCounter.value--;
        wrongCount.value--;
      } else {
        letterCounter.value++;
        wordObject.value[wordCounter.value].isFinding = "faux";
        wrongCount.value++;
        wordObject.value[wordCounter.value].wrongPerWord++;

        if (letterCounter.value === currentWord.length) {
          wordCounter.value++;
          wordObject.value[wordCounter.value].isCurrent = true;
          letterCounter.value = 0;
          wrongCount.value = 0;
        }
      }
    }
  }

  if (wordCounter.value === totalWordLength - 1) {
    console.log("fin fin fin fin fin");
    console.log( "gg");
    endBeforeTime.value = true;
    timeIsUp.value = true;
  }
}
console.log(wordCounter.value);
console.log(Object.keys(getWord(20)).length);
let totalWordLength = Object.keys(getWord(20)).length;
//Vérifier si le nombre de mot est égal a la longueur total des mots pour effectuer le calcul

watch(
  () => timeIsUp.value,
  () => {
    vitesse = getSpeed(
      wordCounter.value,
      Math.floor(nbrSecondActuel.value / 60)
    );
    const attempts = wordObject.value.map((el) => el.wrongPerWord);
    const totalCaract = wordObject.value
      .map((el) => el.mot.length)
      .reduce((acc, el) => el + acc, 0);
    totalWrong = attempts.reduce((acc, el) => el + acc, 0);
    precision = getPrecision(totalCaract, totalWrong);
    localStorage.clear();
  }
);

// watch(
//   () => wordCounter.value,
//   (newValue, oldValue) => {
//     if (newValue === 2) {
//       autoScrollIfNeeded();
//     }
//   }
// );
</script>



<template>
  <div class="global">
    <div class="loader" v-if="!start">
      <SpinnerComponent />
    </div>
    <div class="contenu" v-else>
      <div class="container" v-if="!timeIsUp" ref="containerRef">
        <TimerComponent
          v-if="counting"
          @sendTimeOver="(el) => (timeIsUp = el)"
          @getCurrentSec="(el) => (nbrSecondActuel = el)"
          :endBeforeTime="endBeforeTime"
        />
        <span
          class="text"
          v-for="(word, index) in wordObject"
          :key="index"
          :class="{
            writeWord: word.isFinding === 'vrai',
            wrongWord: word.isFinding === 'faux',
            currentW: word.isCurrent,
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
        v-if="timeIsUp"
        :vitesseProps="vitesse"
        :precisionProps="precision"
      />
      <div class="restart">
        <a href="" @click.prevent="refreshPage">
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
.green {
  color: rgb(90, 92, 90);
  background-color: #5b5e5b6c;
  border-bottom: 1px solid;
}

.container {
  max-width: 1000px;
  width: 100%;
  height: auto;
  margin: 2rem auto;
  background-color: transparent;
  padding: 3rem;
  margin-bottom: 2rem;
  overflow-x: hidden;
}

.restart {
  margin-top: 10rem;
  text-align: center;
  color: rgb(223, 113, 50);
  position: relative;
}

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
