<template>
  <div class="container">
    <div id="app">
      <label for="chrono">Voulez-vous un jeu chronométré ?</label><br />
      <select>
        <option value="oui">Oui</option>
        <option value="non">Non</option>
      </select>
    </div>
    <div id="level">
      <label for="difficulté">Choisissez la difficulté du jeu :</label><br />
      <select>
        <option value="facile">Facile</option>
        <option value="moyen">Moyen</option>
        <option value="difficile">Difficile</option>
      </select>
    </div>
    <div class="startclass">
      <router-link class="start" to="/starting">Commencer</router-link>
    </div>
  </div>
  <home-component v-if="display === false" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import HomeComponent from "./HomeComponent.vue";
let display = ref(true);
onMounted(() => {
  // Afficher l'interface de frappe trois secondes après le chargement de la vue
  setTimeout(() => {
    display.value = true;
  }, 3000);
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 25px;
  text-align: center;
  margin-top: 45px;
  padding: 25px 15px 25px 15px;
  font-size: 25px;
  border: 1px solid;
  border-radius: 45px;
  background-color: rgba(160, 235, 210, 0.34);
  box-shadow: 8px 8px 10px rgba(0, 247, 255, 0.436);
  animation-name: example;
  animation-duration: 4s;
}

@keyframes example {
  0%   {background-color: rgb(222, 177, 177);}
  25%  {background-color: rgb(241, 241, 84);}
  50%  {background-color: rgba(243, 173, 11, 0.761);}
  100% {background-color: rgb(21, 238, 21);}
}

@keyframes mymove {
  from {
    top: 0px;
  }
  to {
    top: 200px;
  }
}

.startclass {
  padding-top: 15px;
  margin-top: 40px;
  height: 50px;
  text-align: center;
}
.start {
  text-decoration: none;
  margin-top: 40px;
  font-size: 30px;
  color: rgb(21, 238, 21);
  font-family: serif;
}

select {
  width: 250px;
  height: 40px;
  font-size: 20px;
  color: blue;
  background-color: rgba(247, 246, 246, 0.333);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border: none;
  border-radius: 15px;
  box-shadow: 5px 5px 10px rgb(129, 127, 127);
}


</style>
