<template>

  
        <div class="timer">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#df7132">
                <path
                    d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
            </svg>
            {{ minutes + ":" }}{{ secondes + "" }}
        </div>

</template>

<script setup>
import { ref } from "vue";


/*
Fonction permettant de décompter pendant 03min 00sec
*/
// Declaration des constantes
const minutes = ref(3);
const secondes = ref(0);

// stockage de la fonction setInterval dans une variable 
const intervalId = setInterval(() => {
    secondes.value--; // Décrémentation des secondes
    if (secondes.value == -1) { // si la valeur des secondes est égale à -1 , 
        secondes.value == 0; // on la ramène à 0;
        secondes.value = 60; // ensuite à 60;
        secondes.value--; // décrémentation des secondes
        minutes.value --; // décrémentation des minutes
    }

    if (secondes.value < 10 ) { // si le nombre de secondes est inférieur à 10 
        secondes.value = "0" + secondes.value; // le nombre de secondes sera précédé d'un 0
        // minutes.value="0"+minutes.value;
    }
    if(minutes.value<10){
        minutes.value=minutes.value
    }
  
    if (minutes.value == -1) {
        minutes.value = 0;
        secondes.value = "0" + 0;
    }

}, 1000);
</script>


<style scoped>
.timer {
    font-size: 2rem;
    color: #df7132;
    text-align: justify;
}
</style>