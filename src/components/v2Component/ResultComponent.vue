<script setup>
import { ref, watch } from "vue";

const timeIsUp = ref(1);
let time =ref()
const emits = defineEmits("response", timeIsUp);
const props = defineProps({
  vitesseProps: Number,
  precisionProps: Number,
  duree: Number
});
/**
 * Formater la durée en mm:ss
 * @param seconds 
 */
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const vitesseValue = ref( props.vitesseProps); // Variable pour stocker la vitesse
const precisionValue = ref(props.precisionProps);

 // Watcher pour la propriété vitesse
    watch(() => props.vitesseProps, (newValue) => 
      vitesseValue.value = newValue // Mettre à jour la variable vitesse
    );

     // Watcher pour la propriété precision
    watch(() => props.precisionProps, (newValue) => 
    {
      precisionValue.value = newValue
     time.value= formatTime(props.duree)
    
    }// Mettre à jour la variable precisionValue

    );

</script>

<template>
  <div class="result box shadow">
    <div>
      <h1>RESULTATS</h1>
    </div>
    <div class="nbr-mot">
      <h2>{{vitesseValue}} mots</h2>
      (par minutes)
    </div>
    <div class="flex">
      <div><span>Precision</span> :</div>
      <div>{{ precisionProps}} %</div>
    </div>
    <div class="flex">
      <div><span>Durée</span> :</div>
      <div>{{time}}</div>
    </div>
    <div class="restart">
        <a href="">
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
  </div>
</template>

<style scoped>
.result {
  max-width: 300px;
  padding: 2rem;
  margin: 5rem auto;
  border: 1px solid;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  animation: tiper 1s ease-in-out forwards;
  animation-iteration-count: 1;
}
.nbr-mot {
  color: #ee6907;
}
.flex {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 1.2rem;
  border-bottom: 1px solid #7572726e;
  padding: 0.5rem;
}

.flex div > span {
  text-align: left;
}

h4 {
  font-weight: bold;
  font-family: "Playwrite";
  font-size: 30px;
  margin-bottom: 50px;
}

.box {
  position: relative;
  transform: translate(0);
  transform-style: preserve-3d;
}

.shadow:before {
  content: "";
  position: absolute;
  inset: 0;
  transform: translate3d(0, 0, -1px);
  background: conic-gradient(
    from 90deg at 40% -25%,
    #ffd700,
    #f79d03,
    #ee6907,
    #e6390a,
    #de0d0d,
    #d61039,
    #cf1261,
    #c71585,
    #cf1261,
    #d61039,
    #de0d0d,
    #ee6907,
    #f79d03,
    #ffd700,
    #ffd700,
    #ffd700
  );
  filter: blur(10px);
  clip-path: polygon(
    -100vmax -100vmax,
    100vmax -100vmax,
    100vmax 100vmax,
    -100vmax 100vmax,
    -100vmax -100vmax,
    0 0,
    0 100%,
    100% 100%,
    100% 0,
    0 0
  );
}

p span {
  line-height: 50px;
  font-weight: bold;
  font-family: "Playwrite";
  font-size: 20px;
  color: rgb(136, 168, 88);
}

/* .btn-reload{
  display: flex;
  margin: 0 auto;
  margin-top: 50px;
  justify-content: center;
  font-size: 25px;
  border: 1px solid;
  background-color: cornflowerblue;
  border-radius: 25px;
  max-width: 200px;
} */

a {
  font-weight: bold;
  color: #fff;
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

.result h4 {
  text-decoration: double;
}

.result span {
  color: rgb(31, 190, 31);
}
</style>