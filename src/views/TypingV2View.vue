<script setup>

let min = 0;
let sec = 0;

function timing() {
    const intervalId = setInterval(() => {
        if(sec < 10){
            sec = "0" + sec;
            }
      if(sec === 60){
            min++;
            sec = 0;
        } 
    },1000)
    // console.log(intervalId);
}
</script>

<template>
    <div id="">
        
    </div>
</template>
<style scoped>

</style>