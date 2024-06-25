<script setup>
import mots from "@/assets/data";
import { onMounted, ref } from "vue";
let url = "https://trouve-mot.fr/api/random/80";
let words = ref("");
let userInput=ref('')
async function getWorld() {
  fetch("https://trouve-mot.fr/api/random/80")
    .then((response) => response.json())
    .then((data) => {
      //   words.value = data;
      data.forEach((element) => {
        words.value += element.name + " ";
      });
      console.log(words.value);
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
.container {
  width: 800px;
  height: 500px;
  border: 1px solid black;
}
.word {
  margin-left: 5px;
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