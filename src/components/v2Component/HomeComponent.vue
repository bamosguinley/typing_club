<script setup>
import { ref, watch, onBeforeMount, onMounted } from "vue";
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
let vitesse = ref(0);
let totalWrong = 0;
let precision = 0;
let nbrSecondActuel = ref(0);
const containerRef = ref(null);
let endBeforeTime = ref(false);
let startTyping = ref(false);
const minutes = ref(3);
let currentSecound = ref(0);
const secondes = ref("00");
let intervalId = null;

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

function Input(e) {
  if (!counting.value) {
    counting.value = true;
  }
  if (preventKey.includes(e.key)) {
    return;
  }
  startTyping.value = true;
  typingCount.value++;
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

  if (wordCounter.value === totalWordLength) {
    endBeforeTime.value = true;
    timeIsUp.value = true;
    clearInterval(intervalId)
  }
  watch(
  () => timeIsUp.value,
  () => {
   
    vitesse.value = getSpeed(wordCounter.value, currentSecound.value / 60);
    console.log(vitesse.value);
    const attempts = wordObject.value.map((el) => el.wrongPerWord);
    const totalCaract = wordObject.value
      .map((el) => el.mot.length)
      .reduce((acc, el) => el + acc, 0);
    totalWrong = attempts.reduce((acc, el) => el + acc, 0);
    precision = getPrecision(totalCaract, totalWrong);
    localStorage.clear();
  }
);
}



watch(
  () => startTyping.value,
  (newValue) => {
    if (newValue) {
      intervalId = setInterval(() => {
        secondes.value--;

        if (secondes.value == -1) {
          secondes.value = 59;
          minutes.value--;
        }

        if (secondes.value < 10) {
          secondes.value = "0" + secondes.value;
        }

        if (minutes.value == 0 && secondes.value == 0) {
          clearInterval(intervalId);
          timeIsUp.value = true;
        }
        currentSecound.value++;
        console.log(currentSecound.value);
      }, 1000);
    } else {
      clearInterval(intervalId);
      timeIsUp.value = true;
    }
  }
);

let totalWordLength = Object.keys(getWord(20)).length;
</script>

<template>
  <div class="global">
    <div class="loader" v-if="!start">
      <SpinnerComponent />
    </div>
    <div class="contenu" v-else>
      <div class="container" v-if="!timeIsUp">
        <div class="timer-container">
          <div class="timer" v-if="startTyping">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#df7132"
            >
              <path
                d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"
              />
            </svg>
            {{ "0" + minutes }} : {{ secondes }}
          </div>
        </div>
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
      <ResultComponent v-if="timeIsUp" :vitesseProps="vitesse" :precisionProps="precision" :duree="currentSecound"/>
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
