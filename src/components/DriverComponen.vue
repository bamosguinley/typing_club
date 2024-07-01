<script setup>
import { ref, onMounted, reactive } from 'vue';
// Icons
import IconCar from '@/components/icons/IconCar.vue'

const props = defineProps(['far', 'countLetters'])
const emit = defineEmits(["emitStep"])

const roadRef = ref(null)
const carRef = ref(null)
const step = ref(0)

// defineExpose({ step: step.value })

onMounted(() => {
  // console.log("roadRef", roadRef.value.clientWidth);
  // console.log("far", props.far);
  // console.log("countLetters", props.countLetters);
  step.value = (roadRef.value.clientWidth - 50)/ props.countLetters
  console.log("clientWidth", roadRef.value.clientWidth);
  console.log("step", step.value);
  console.log("countLetters", props.countLetters);
  console.log("countLetters * step", props.countLetters * step.value) ;
  emit("emitStep", step.value)
})

</script>

<template>
  <div class="road" ref="roadRef">
    <IconCar ref="carRef" class="car" :style="{ marginLeft: `${props.far}px` }" />
  </div>
</template>


<style scoped>
.road {
  position: relative;
  height: 70px;
  width: 100%;
  margin: 0;
  padding: 0;
  border-bottom: 10px solid black;
  border-radius: 8px
    /* border: 1px solid red; */
}

.car {
  position: absolute;
  left: 0;
  bottom: 0;
  margin: 0;
}
</style>