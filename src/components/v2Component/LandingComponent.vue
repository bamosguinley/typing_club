<template>
  <div class="home">
    <img src="/typing.gif" alt="" />
    <h1>Bienvenue sur notre site de typing</h1>
    <router-link to="/version2/start">Commencer</router-link>
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
a {
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  background-color: #007bff; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  text-decoration: none;
}
</style>
