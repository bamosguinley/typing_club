<script setup>
// Récupération des données de la session de frappe par la props data
const props = defineProps({
  data: Object,
});
</script>

<template>
  <div class="result-container">
    <h4>Vos statistiques :</h4>
    <p><span>Vitesse</span> : {{ props.data.speed + " mots/min" }}</p>
    <p><span>Precision</span> : {{ props.data.precision + " %" }}</p>
    <p><span>Precision</span> : {{ props.data.time }}</p>
  </div>
</template>

<style scoped>
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