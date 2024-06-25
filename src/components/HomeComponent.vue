<script setup>
import mots from "@/assets/data";
import { onMounted, ref, computed, watch } from "vue";
let url = "https://trouve-mot.fr/api/random/80";

const words = ref("");
const wordsArray = ref([]);
const userInput = ref("");

async function getWorld() {
  fetch("https://trouve-mot.fr/api/random/10")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        words.value += element.name + " ";
      });

      words.value.split("").forEach((letter) => {
        wordsArray.value.push({ char: letter, isRight: "", tentative: 0 });
      });

      console.log("wordsArray", wordsArray.value);

      console.log("sentence => ", words.value);
      console.log("words array => ", wordsArray.value);
    });
}

// watch(() => {
//   console.log("rien");
// })
let count = 0;
function getUserInput(e) {
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
onMounted(() => {
  getWorld();
  document.addEventListener("keydown", getUserInput);
});
</script>

<template>
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
</template>
<style scoped>
.container {
  font-size: 35px;
  width: 800px;
  height: 500px;
  border: 1px solid black;
}
.spaceClass {
  content: " ";
  padding: 0;
  padding-left: 10px;
  width: 10px;
}

.letterClass {
  padding-bottom: 0;
  margin-left: 2px;
}

.letterRight {
  background-color: greenyellow;
  border-bottom: 3px solid greenyellow;
}

.letterWrong {
  background-color: red;
  border-bottom: 3px solid red;
}

.letterRepeat{
  background-color: orange;
  border-bottom: 3px solid orange;
}
.text-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
</style>