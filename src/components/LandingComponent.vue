<template>
  <div>
    <main>
      <div class="container">
        <div class="text-container">
          <p class="p-container">Tester votre vitesse de saisie au clavier</p>
          <router-link class="btn-container" to="/start">Commencer</router-link>
        </div>
        <div class="img-Container">
          <img src="/imgcontainer.gif" alt="Home Image">
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding:2rem

}
.text-container{
  display: flex;
  justify-content: center;
  flex-direction:column;
}
.p-container {
  max-width: 700px;
  width: 100%;
  font-size: 5rem;
  font-weight: bold;
  font-family:poppins, sans-serif;
  text-align:center;
 
}
.btn-container {
  padding:1rem;
  width: 12rem;
  margin: auto;
  text-align: center;
  border:none;
  border-radius:1rem;
  background-color:#4cb7d8;
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
}
.btn-container:hover{
  background-color: #2c81c7;
}
</style>
