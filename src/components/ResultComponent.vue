<script setup>
import { ref, onMounted } from "vue"


onMounted(async () => {

})


const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="result-container">
    <h4>Vos statistiques :</h4>
    <p><span>Vitesse</span> : {{ props.data.speed + " mots/min" }}</p>
    <p><span>Precision</span> : {{ props.data.precision + " %" }}</p>
    <p><span>Durée</span> : {{ props.data.time }}</p>
  </div>
  <div class="btn-container">
     <a class="btn" href="">Recommencer</a>
  </div>
</template>

<style scoped>
/* .result-container {
  padding: 80px;
  font-family: "Playwrite";
  font-size: 25px;
  margin: 50px auto;
  border-radius: 60%;
  box-shadow: 5px 5px 12px gray;
  background-color: #fff;
  animation: mymove 5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
} */

.result-container {
  padding: 80px;
  font-family: "Playwrite";
  font-size: 25px;
  margin: 50px auto;
  border-radius: 60%;
  box-shadow: 5px 5px 12px gray;
  background-color: #fff;
  animation: tiper 1s ease-in-out forwards;
  animation-iteration-count: 1;
}
.btn-container{
  text-align: center;
}
.btn {
  padding:1rem;
  width: 12rem;
  margin: auto;
  text-align: center;
  border:none;
  border-radius:1rem;
  background-color:#4cb7d8;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
}

@keyframes tiper {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(-100);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(0px);
  }
}


.result-container h4 {
  text-decoration: double;
}

.result-container span {
  color: rgb(31, 190, 31);
}
</style>