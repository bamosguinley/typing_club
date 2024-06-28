<script setup>
// Récupération des données de la session de frappe par la props data
// const props = defineProps({
//   data: Object,
// });
</script>

<template>

  <div class="result box shadow">
    <div>
      <h1>RESULTATS</h1>
    </div>
    <div class="nbr-mot">
      <h2>Nombre de mot</h2>
      (par minutes)
    </div>
    <div class="flex">
      <div><span>Precision</span> :</div>
      <div>00</div>
    </div>
    <div class="flex">
      <div><span>Durée</span> :</div>
      <div> 00</div>
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

.flex div>span {
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
  background: conic-gradient(from 90deg at 40% -25%, #ffd700, #f79d03, #ee6907, #e6390a, #de0d0d, #d61039, #cf1261, #c71585, #cf1261, #d61039, #de0d0d, #ee6907, #f79d03, #ffd700, #ffd700, #ffd700);
  filter: blur(10px);
  clip-path: polygon(-100vmax -100vmax, 100vmax -100vmax, 100vmax 100vmax, -100vmax 100vmax, -100vmax -100vmax, 0 0, 0 100%, 100% 100%, 100% 0, 0 0);
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