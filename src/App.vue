<script setup>
import { RouterView } from 'vue-router'
import ModalComponent from './components/modalNewItem/ModalComponent.vue'
import ModalUserComponent from './components/modalUser/ModalUserComponent.vue';



</script>

<template>

 <div class="flex bg-img min-h-screen">
  <RouterView name="sidebar"></RouterView>
  <RouterView></RouterView>
 </div>
<div class="bg-img">
   <RouterView name="login"></RouterView>
   <RouterView name="singup"></RouterView>
</div>
  <ModalComponent />
  <ModalUserComponent />
</template>

<style scoped>
  .bg-img{
    background-image: linear-gradient(rgba(22, 22, 22, 0.5), rgba(15, 15, 15, 0.5)), url('https://res.cloudinary.com/dcmcgucbu/image/upload/f_auto,q_auto/v1/bg-login/m2m9ndaqedf0wmc6vxrc');
    background-size: cover;
  }
</style>
