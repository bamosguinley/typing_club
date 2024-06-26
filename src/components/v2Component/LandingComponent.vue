<template>
  <div class="home">
      <img src="/typing.gif" alt="">
    <h1>Bienvenue sur notre site de typing</h1>
    <slot>

    </slot>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  justify-content: center;
  height: 90vh;
  background-color: #f0f0f0; /* Couleur de fond */
  font-family: Arial, Helvetica, sans-serif; /* Police de caractères */
  overflow-y: hidden;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}


button:hover {
  background-color: #0056b3; /* Changement de couleur au survol */
}
</style>
