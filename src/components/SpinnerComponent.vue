<template>
  <div class="box"></div>
</template>

<style scoped>
body {
  background-color: #ffffff;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 3px solid;
  border-color: rgb(3, 3, 3) transparent;
  animation: spin 1s infinite ease-out;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>