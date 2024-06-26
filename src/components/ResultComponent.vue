<template>
  <div class="result-container">
    <h4>Vos statistiques :</h4>
    <p><span>Vitesse</span> : {{ props.data.speed + " Mots Par Minute" }}</p>
    <p><span>Precision</span> : {{ props.data.precision + " %" }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"


onMounted(async () => {

})


const props = defineProps({
  data: Object,
});
</script>

<style scoped>
.result-container {
  padding: 80px;
  font-family: "Playwrite";
  font-size: 25px;
  margin: 50px auto;
  border-radius: 60%;
  box-shadow: 5px 5px 12px gray;
  background-color: #fff;
}

.result-container h4 {
  text-decoration: double;
}

.result-container span{
  color: rgb(31, 190, 31);
}
</style>