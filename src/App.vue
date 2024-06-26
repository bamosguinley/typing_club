<template>
  <!-- Header start -->
  <header class="header">
    <div>
      <router-link class="logo" to="/">Win'styping</router-link
      ><span class="dot">.</span>
    </div>
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
      <router-link to="/login">Se connecter</router-link>
    </nav>
  </header>
  <!-- Header end -->
  <router-view />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 5px 5px 5px #b8b6b6c5;
}
.logo {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-weight: bold;
  color: #4cb7d8;
  font-size: 2rem;
}
.dot {
  font-size: 2rem;
  color: #f99046;
}
.navbar {
  margin: auto 0;
}
a {
  text-decoration: none;
  margin-left: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  color: #000;
  text-align: center;
}
a:hover {
  color: #f99046;
}
</style>
