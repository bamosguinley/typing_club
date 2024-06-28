<script setup >
// import HomeComponent from "@/components/HomeComponent.vue";
import PageDeBord from "../components/PageDeBord.vue"
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import { onMounted, ref } from "vue";
let isloadingTimeOut = ref(true);

onMounted(() => {
  // Afficher l'interface de frappe deux secondes après le chargement de la vue
  setTimeout(() => {
   isloadingTimeOut = true;
  }, 2000);
});
</script>

<template>
  <div class="container">
    <spinner-component v-if="isloadingTimeOut === false" class="spinner" />
    <PageDeBord v-if="isloadingTimeOut === true" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.spinner {
  margin-top: 20%;
}
</style>