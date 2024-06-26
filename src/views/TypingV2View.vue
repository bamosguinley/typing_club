<template>
     <HomeComponent>
          <div class="container">
               <TimerComponent/>
               <p class="text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora temporibus alias veniam
                    laboriosam quos
                    provident reprehenderit ducimus eveniet soluta sit nobis at maiores praesentium commodi mollitia,
                    nostrum
                    quaerat sunt vero consectetur deleniti libero numquam consequatur magnam accusamus? Voluptatem
                    accusantium et magnam blanditiis fuga neque omnis aperiam quia? Minima dolorum mollitia sunt
                    delectus
                    exercitationem reiciendis ut impedit at magnam perspiciatis labore repellendus doloribus ex, facilis
                    deserunt placeat eligendi aut iusto atque, laudantium omnis vitae illo quae. Rem non vitae
                    architecto
                    laudantium, explicabo id ipsum ea natus dicta labore quo modi. Labore maiores vero dolorem quidem, a
                    accusamus cum dicta nisi atque?
               </p>
          </div>
          
     </HomeComponent>

</template>

<script setup>
import TimerComponent from "@/components/v2Component/TimerComponent.vue";
import HomeComponent from '@/components/v2Component/HomeComponent.vue';
    // function compareUser(params) {
        
    // }
</script>
<style scoped>
/* style pour le text  */
.text {
     font-size: 2rem;
     font-family: Verdana, Geneva, Tahoma, sans-serif;
     line-height: 1.5;
     text-align: justify;
     opacity: 0.5;     
}
