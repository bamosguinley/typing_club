<script setup>
import TimerComponent from "../v2Component/TimerComponent.vue";
import { onMounted, ref } from "vue";
// Les variables
const counting = ref(false);
const countDownFinished= ref(false);
const refreshPage = () => {
  location.reload();
};
import getWord from "@/composable/utils";
let words = getWord(50);

// Fonction recuperation de la frappe au clavier et qui gère le declenchement du timer.
function Input(e) {
  if (!counting.value) {
    counting.value = true;
  }
  console.log(e.key);
}
onMounted(() => {
  document.addEventListener("keydown", Input);
});
</script>
<template>
  <div class="container" v-if="!countDownFinished">
    <TimerComponent v-if="counting" />
    <span class="text" v-for="(word, index) in words" :key="index">
      <span v-for="(letter, index) in word" :key="index">
        {{ letter }}
      </span>
    </span>
  </div>
  <div class="restart">
    <a href="#" @click="refreshPage">
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
  <div class="v-else">

  </div>
</template>
<style scoped>

</style>

