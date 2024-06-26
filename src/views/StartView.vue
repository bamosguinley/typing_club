<script setup >
import HomeComponent from '@/components/HomeComponent.vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { onMounted, ref } from 'vue';
let loadingTime=ref(false)

onMounted(()=>{
  setTimeout(()=>{
 loadingTime.value=true;
},2000)
})
</script>
<template>
    <div class="container">
        <spinner-component v-if="loadingTime===false" class="spinner" />
        <HomeComponent v-if="loadingTime===true" />
    </div>
</template>
<style scoped>
 .container{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 }
 .spinner{
    margin-top: 20%;
 }
</style>