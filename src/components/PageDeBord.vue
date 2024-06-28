<template>
  <div class="container">
    <div id="app">
      <label for="chrono">Voulez-vous un jeu chronométré ?</label><br />
      <select v-model="selected">
        <option disabled value="">Choisissez</option>
        <!-- <option value="Oui">Oui</option>
        <option value="Non">Non</option> -->
        <option id="option" v-for="option in options" :key="option.id">{{ option.value }}</option>
        
      </select>
      <span>{{ selected }}</span>
    </div>
    <div id="level">
      <label for="difficulté">Choisissez la difficulté du jeu :</label><br />
      <select>
        <!-- <option v-for="(option) in options" :key="option.index">{{ option.text }}</option> -->
        <option value="facile">Facile</option>
        <option value="moyen">Moyen</option>
        <option value="difficile">Difficile</option>
      </select>
    </div>
    <div class="startclass">
      <router-link class="start" to="/starting/$route.params.id" @click="Display"
        >Commencer</router-link
      >
    </div>
  </div>
  <!-- <home-component v-if="display === false" /> -->
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router'
const selected = ""
function data() {
    return {
      selected: ''  // Initialisez la propriété à une valeur par défaut si nécessaire
    };
  }
// onMounted(() => {
//   const id = $route.params.id;
// })

const choix=ref()
if(selected == "oui"){
  choix.value = 1
}else {
  choix.value = 0;
}
console.log(selected);
// import HomeComponent from "./HomeComponent.vue";
let display = ref(true);
onMounted(() => {
  // Afficher l'interface de frappe trois secondes après le chargement de la vue
  setTimeout(() => {
    display.value = true;
  }, 3000);
});
function Display() {
  return console.log(selected);
}
const options = [{ value: "Oui" }, { value: "Non" }];

// const emit = defineEmits(['array']);
// emit ('array', options)
// const button = document.querySelector("start");
// watch(button, () => {
//   if (options.value === "Oui") {
//     Time();
//   } else {
//     timer();
//   }
// });
// const selected = 

// button.addEventListener('click', );

// Declaration des constantes

const count = ref(0);

/*
fonction permettant de compter de façon indéfinie
*/

function timer() {
  const intervalId = setInterval(() => {
    if (seconds.value === 60) {
      minutes.value++;
      seconds.value = 0;
    } else if (seconds.value < 60) {
      seconds.value++;
    }
    if (count === wordsArray.value.length - 1) clearInterval(intervalId);
  }, 1000);
}

/**
 * fonction permettant de chronométrer pendant 03 minutes
 */
function Time() {
  const intervalId = setInterval(() => {
    if (seconds.value === 60) {
      minutes.value++;
      seconds.value = 0;
    } else if (seconds.value < 60) {
      seconds.value++;
    }
    if (minutes.value === 3) clearInterval(intervalId);
  }, 1000);
}

//      const intervalId = setInterval(() => {

// const minutes = ref(3);
// const secondes = ref("0" + 0);

//       secondes.value--; // Décrémentation des secondes
//     if (secondes.value == -1) { // si la valeur des secondes est égale à -1 ,
//         secondes.value == 0; // on la ramène à 0;
//         secondes.value = 59; // ensuite à 60;
//         // secondes.value--; // décrémentation des secondes
//         minutes.value --; // décrémentation des minutes
//     }

//     if (secondes.value < 10) { // si le nombre de secondes est inférieur à 10
//         secondes.value = "0" + secondes.value; // le nombre de secondes sera précédé d'un 0
//     }

//     if (minutes.value == -1) {
//         minutes.value = 0;
//         secondes.value = "0" + 0;
//     }
//  }
//   , 1000);

//   console.log(intervalId);

/*
fonction permettant de décompter le temps en 05 minutes
*/
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
  animation-duration: 2s;
}

@keyframes example {
  0% {
    background-color: rgb(222, 177, 177);
  }
  25% {
    background-color: rgb(241, 241, 84);
  }
  50% {
    background-color: rgba(243, 173, 11, 0.761);
  }
  100% {
    background-color: rgb(21, 238, 21);
  }
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
