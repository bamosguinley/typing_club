<script setup>
import { onMounted, ref, watch } from "vue";
import IconeTime from "./icons/IconeTime.vue";

const words = ref("");
const wordsArray = ref([]);
const userInput = ref("");
const minutes = ref(0);
const seconds = ref(0);

let count = 0;
let startCounter = ref(0);

async function getWorld() {
  fetch("https://trouve-mot.fr/api/random/30")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element, i) => {
        if (i !== data.length - 1) {
          words.value += element.name + " ";
        } else {
          words.value += element.name;
        }
      });

      words.value.split("").forEach((letter) => {
        wordsArray.value.push({ char: letter, isRight: "", tentative: 0 });
      });

      // console.log("wordsArray", wordsArray.value);

      // console.log("sentence => ", words.value);
      // console.log("words array => ", wordsArray.value);
    });
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
  if (count < wordsArray.value.length) {
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
}

watch(startCounter, () => {
  console.log("watch timer");
  timer();
});

onMounted(() => {
  getWorld();
  document.addEventListener("keydown", getUserInput);
});
</script>
<template>
  <p class="start-text-container">
    <span v-show="!startCounter">Commencez à taper</span>
  </p>
  <div class="container">
    <p>{{ userInput }}</p>
    <p class="text-container">
      <span
        v-for="(letter, index) in wordsArray"
        :key="index"
        :class="{
          spaceClass: letter.char === ' ',
          letterClass: true,
          letterRight: letter.isRight === 'vrai',
          letterWrong: letter.isRight === 'faux',
          letterRepeat: letter.isRight === 'repeat',
        }"
      >
        {{ letter.char }}
      </span>
    </p>
  </div>
  <p class="start-text-container">
    <IconeTime /><br />
    <span>{{ formatTime(minutes) + " : " + formatTime(seconds) }}</span>
  </p>
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

.start-text-container svg {
}

.container {
  font-family: "Playwrite";
  font-size: 50px;
  width: 90%;
  margin: 0 auto;
  height: fit-content;
  box-shadow: 5px 5px 12px gray;
}
.spaceClass {
  content: " ";
  padding: 0;
  padding-left: 10px;
  width: 10px;
}
.letterClass {
  padding-inline: 8px;
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