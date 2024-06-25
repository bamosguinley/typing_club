<script setup>
import mots from "@/assets/data";
let url = "https://trouve-mot.fr/api/random/80"
async function getWorld() {
    
}
fetch("https://trouve-mot.fr/api/random/80")
    .then((response) => response.json())
    .then((words) => console.log(words))
</script>

<template>
  <div class="container">
    <p class="text-container">
      <span class="word" v-for="(mot, index) in mots" :key="index">
        {{ mot }}
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
.word{
    margin-right: 20px;
}
.text-container{
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
}
</style>