<template>
  <div class="container">
    <h1>Chargement...</h1>
    <div id="loading"></div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100);



h1 {
  font: 2em "Roboto", sans-serif;
  margin-bottom: 40px;
}
.container {
  /* margin: 0 auto; */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top: 300px; */
  /* align-content: center;
  justify-content: center; */
}

#loading {
  /* display: inline-block; */
  width: 50px;
  height: 50px;
  border: 12px solid green;
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
<script setup>
// recreating https://codepen.io/scottkellum/pen/tzjCK
// just to learn how he did it
</script>