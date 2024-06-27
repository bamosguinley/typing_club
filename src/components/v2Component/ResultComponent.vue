<script setup>
// Récupération des données de la session de frappe par la props data
const props = defineProps({
  data: Object,
});
</script>

<template>
 <main class="container-result">  
   <div class="result-container">
      <div class="result">
        <h4>Vos statistiques : </h4>
        <p><span>Vitesse</span> : {{ props.data.speed + " mots/min" }}</p>
        <p><span>Precision</span> : {{ props.data.precision + " %" }}</p>
        <p><span>Durée</span> : {{ props.data.time }}</p>
      </div>
      <div class="btn-reload">
       <a class="btn" href="">Recommencer</a>
    </div>
   </div>
 </main>
</template>

<style scoped>
.result{
  padding: 80px;
  margin: 50px auto;
  border-radius: 50px;
  border: 1px solid;
  background-color: #fff;
  text-align: center;
  box-shadow: 5px 5px 12px 12px gray;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  animation: tiper 1s ease-in-out forwards;
  animation-iteration-count: 1;

}
h4{
  font-weight: bold;
  font-family: "Playwrite";
  font-size: 30px;
  margin-bottom: 50px;
}


  p span{
    line-height: 50px;
  font-weight: bold;
  font-family: "Playwrite";
  font-size: 20px;
  color: rgb(136, 168, 88);
}


.btn-reload{
  display: flex;
  margin: 0 auto;
  margin-top: 50px;
  justify-content: center;
  font-size: 25px;
  border: 1px solid;
  background-color: cornflowerblue;
  border-radius: 25px;
  max-width: 200px;
}

a{
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