<script setup>
import { onMounted, ref } from "vue";
let url = "https://trouve-mot.fr/api/random/80";
let words = ref("");
let userInput=ref('')
async function getWorld() {
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
      words.value.split("").forEach((letter) => {
        wordsArray.value.push({ char: letter, isRight: "", tentative: 0 });
      });
      console.log("last letter", wordsArray.value[wordsArray.value.length - 1]);
    });
}

function getUserInput(e) {
  userInput.value = e.key
}
onMounted(() => {
  getWorld(); 
  document.addEventListener('keydown',getUserInput)
});
console.log(userInput.value);
</script>

<template>
  <div class="container">
    <p class="text-container">
      <span :class="{ 'span-empty': word.trim() === '' }" v-for="(word, index) in words" :key="index">
        {{ word }}
      </span>
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
.span-empty {
  width: 5px;
}
.text-container {
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
  padding: 20px;
}
</style>