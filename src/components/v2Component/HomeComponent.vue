<script setup>
    function compareUser(params) {
        
    }
</script>
<template>
     
     <div class="container">
          <div class="timer">00:30</div>
          <slot></slot>
     </div>
     <div class="restart">
               <RouterLink to="/version2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#df7132">
                         <path
                              d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
                    </svg>
               </RouterLink>
          </div>
</template>
<style scoped>
/* Style pour le contenu du texte */
.container {
  max-width: 1000px;
  width: 100%;
  height: 300px;
  margin: 2rem auto;
  background-color: transparent;
  padding: 2rem;
  overflow: clip;
}
.restart {
  text-align: center;
  color: rgb(223, 113, 50);
}
.timer {
     font-size: 3rem;
     color: #df7132;
}
</style>

