<script setup>
import { ref, onMounted, reactive } from 'vue';
// Icons
import IconCar from '@/components/icons/IconCar.vue'

const props = defineProps(['far', 'countletters'])

const roadRef = ref(null)
const carRef = ref(null)

const road = reactive({
  width: null,
  step: props.countletters
})

defineExpose({ roadWidth: road.width })
onMounted(() => {
  console.log("road", road);
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