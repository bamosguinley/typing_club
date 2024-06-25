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

      words.value.split("").forEach(letter => {
        wordsArray.value.push({ char: letter, isRight: false })
      });

      console.log("wordsArray", wordsArray.value);

      // console.log("sentence => ", words.value);
      // console.log("words array => ", wordsArray.value);
    });
}

watch(() => {
  console.log("rien");
})

onMounted(() => {
  getWorld();
  document.addEventListener("keydown", (e) => {
    console.log(e.key === " ");
  })
});

</script>

<template>
  <div class="container">
    <p>{{ text }}</p>
    <p class="text-container">
      <span v-for="(letter, index) in wordsArray" :key="index"
        :class="{ spaceClass: letter.char === ' ', letterClass: true, letterRight: letter.isRight }">
        <!-- <span v-for=" (letter, i) in word" :key="i" > -->
        {{ letter.char }}
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
  padding-left: 10px;
  width: 10px;
  border-bottom: 1px solid blue;
}

.letterClass {
  padding-bottom: 0;
  margin-left: 2px;
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