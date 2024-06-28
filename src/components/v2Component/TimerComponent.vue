<template>
    <div>
        <!-- Affiche le contenu seulement si timeIsUp est false -->
        <div>
            <div class="timer">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#df7132">
                    <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
                </svg>
                {{ minutes }} : {{ secondes }}
            </div>
            <!-- Autres contenus à afficher -->
        </div>
       
        
    </div>
</template>

<script setup>
import { ref } from "vue";


const minutes = ref(3);
const secondes = ref("00");
 const timeIsUp = ref(' ');
 const emit = defineEmits(['sendTimeOver']);
//  Variable pour vérifier si le temps est écoulé

const intervalId = setInterval(() => {
    secondes.value--;

    if (secondes.value == -1) {
        secondes.value = 59;
        minutes.value--;
    }

    if (secondes.value < 10) {
        secondes.value =  secondes.value;
    }

    if (minutes.value == -1) {
        minutes.value = 0;
        secondes.value = "00";
        clearInterval(intervalId);
        timeIsUp.value = true;
        emit('sendTimeOver',timeIsUp.value )
        // Ici vous pourriez ajouter d'autres actions à effectuer après le temps écoulé
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
