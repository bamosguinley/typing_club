<script setup>
import mots from "@/assets/data";
import { onMounted, ref, computed, watch } from "vue";
let url = "https://trouve-mot.fr/api/random/80";

const words = ref("");
const wordsArray = ref([]);
const text = ref("")


const letterRightClass = ref("letterRight")
const letterWrongClass = ref("letterWrong")
const letterClass = ref("letter")


async function getWorld() {
  fetch("https://trouve-mot.fr/api/random/80")
    .then((response) => response.json())
    .then((data) => {
      //   words.value = data;
      data.forEach((element) => {
        words.value += element.name + " ";
      });
      wordsArray.value = words.value.split(" ");
      console.log("sentence => ", words.value);
      console.log("words array => ", wordsArray.value);
    });
}

watch(() => {
  console.log("rien");
})

onMounted(() => {
  getWorld();
});

</script>

<template>
  <div class="container">
    <p>{{ text }}</p>
    <p class="text-container">
      <span v-for="(word, index) in words" :key="index"
        :class="{ spaceClass: word === ' ', letter: true, letterRight: true }">
        <!-- <span v-for=" (letter, i) in word" :key="i" > -->
        {{ word }}
        <!-- </span> -->
      </span>
    </p>
  </div>


  <div>
    <input type="text" v-model="text">
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
  padding-left: 5px;
  width: 10px;
  /* border-bottom: 1px solid red; */
}

.letter {
  padding-bottom: 0;
  margin-left: 3px;
}

.letterRight {
  /* content: " ";
  padding: 0;
  padding-left: 5px;
  width: 10px; */
  border-bottom: 3px solid greenyellow;
}

.letterWrong {
  /* content: " ";
  padding: 0;
  padding-left: 5px;
  width: 10px; */
  border-bottom: 3px solid red;
}

.text-container {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}
</style>