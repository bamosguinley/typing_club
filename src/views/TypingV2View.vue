<script setup>
import HomeComponent from "@/components/v2Component/HomeComponent.vue";
import LandingComponent from "@/components/v2Component/LandingComponent.vue";
import TimerComponent from "@/components/v2Component/TimerComponent.vue";

import { ref } from "vue";
const showText = ref(false);
</script>
<template>
  <div>
   <router-view></router-view>
  </div>
</template>

<style scoped>


</style>
