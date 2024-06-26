<template>

    <div class="container">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        height="40px"
        viewBox="0 -960 960 960"
        width="40px"
        fill="#000"
        >
        <path
          d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z"
        />
        </svg>
        <div id="minutes">{{ minutes + ":" }}</div>
        <div id="secondes">{{ secondes + ""}}</div>

    </div>
</template>

<script setup>
import { ref } from "vue";

        const minutes = ref("0" + 2);
const secondes = ref(59);

const intervalId = setInterval(() => {
    secondes.value--;

    if (secondes.value < 10) {
        secondes.value = "0" + secondes.value;
    }
    // if (minutes.value < 10) {
    //     // minutes.value = "0" + minutes.value;
    // }
    if (secondes.value == 0) {
        minutes.value = "0" + minutes.value
        minutes.value--;
        // secondes.value = ; 
    }

    if (minutes.value == 0 && secondes.value == "00") {
        clearInterval(intervalId);
     }
}, 1000);

            
            
                // minutes.value == 0;
                // secondes.value == 0;
                // clearInterval(intervalId);
            
            // if (secondes.value == 0) {
            //     clearInterval(intervalId)
            // }
            // if (minutes.value == 0) {
            //     clearInterval(intervalId)
            // }
        // }, 1000)

</script>

<style scoped>
    .container {
        display: flex;
    }
</style>