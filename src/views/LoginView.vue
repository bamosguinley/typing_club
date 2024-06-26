

<script setup>
import { ref } from 'vue'
</script>


<template>
 
  <div class="container">
     <div>
         <label for="email">Email address</label><br>
         <input type="email" name="email" id="email" placeholder="Enter email">
     </div>
      <div>
         <p>We'll never share your email with anyone else.</p><br>
      </div>
      <div>
         <label for="password">Password</label><br>
         <input type="password" name="password" id="password" placeholder="Password">
      </div><br>

      <span class="myspan">
         <input type="checkbox">
         <span>Stay logged in</span><br>
      </span><br>

      <div>
         <button class="submitdiv">Submit</button>
      </div>
  </div>
  
   
</template>



<style scoped>
* {
   font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.container {
   margin: 25px auto;
   width: 500px;
    padding: 15px 0px 25px 20px;
    box-shadow: 5px 5px 10px rgba(129, 127, 127, 0.872);
    color: black
}
div > input {
   width: 400px;
   height: 35px;
}
button {
   width: 100px;
   height: 35px;
   background-color: rgba(35, 73, 244, 0.778);
   color: white;
   border-radius: 8px;
}
p {
   font-size: 10px;
}
</style>