<template>
  <h1>RESULT COMPONENT</h1>
  <p class="start-text-container">
    <span>Precision : {{ props.data.precision + " %" }}</span>
  </p>
</template>

<script setup>
const props = defineProps({
  data: Object,
});
</script>

<style scoped>
</style>