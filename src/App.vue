<script setup>
import { RouterView } from 'vue-router'
import ModalComponent from './components/modalNewItem/ModalComponent.vue'
import ModalUserComponent from './components/modalUser/ModalUserComponent.vue';



</script>

<template>

  <div class="bg-img min-h-screen">
    <div class="flex ">
      <RouterView name="sidebar"></RouterView>
      <RouterView></RouterView>
    </div>

    <div class="flex justify-center">
      <RouterView name="login"></RouterView>
      <RouterView name="singup"></RouterView>
    </div>
  </div>





  <ModalComponent />
  <ModalUserComponent />
</template>

<style scoped>
.bg-img {
  background-image: linear-gradient(rgba(22, 22, 22, 0.5), rgba(15, 15, 15, 0.5)), url('https://res.cloudinary.com/dcmcgucbu/image/upload/f_auto,q_auto/v1/bg-login/m2m9ndaqedf0wmc6vxrc');
  background-size: cover;
}
</style>
