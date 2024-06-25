<script setup>
import mots from "@/assets/data";
import { onMounted, ref } from "vue";
let url = "https://trouve-mot.fr/api/random/80";
let words = ref("");
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
onMounted((param) => {
  getWorld();
});
</script>

<template>
  <div class="container">
    <p class="text-container">
      <span :class="{}" v-for="(word, index) in words" :key="index">
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
.text-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
</style>