<script setup>
</script>

<template>
  <div class="container">
    <div class="text-container">
      <p class="text">Tester votre vitesse de saisie au clavier</p>
      <button class="btn">Commencer</button>
    </div>
    <div class="img-conontainer">
      <img src="/imgcontainer.gif" alt="Home Image" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  padding: 3rem;
  align-items: center;
}
.text-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.btn {
  padding: 1rem;
  width: 12rem;
  text-align: center;
  border: none;
  border-radius: 1rem;
  background-color: #4cb7d8;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
}
.btn:hover {
  background-color: #2c81c7;
}
.text{
  font-size: 5rem;
  font-weight: bold;
  font-family:poppins, sans-serif;
}
@media screen and (max-width: 600px) {
    .img-conontainer{
        display: none;
    }
}
</style>
