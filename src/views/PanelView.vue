<script setup>
import AdministracionComponent from '@/components/panel/AdministracionComponent.vue';
import { useSidebar } from '@/stores/sidebar';
const storeSidebar = useSidebar();
</script>

<template>
   <button @click="storeSidebar.toggleSidebar()" class="md:hidden p-2 text-white w-full bg-black bg-opacity-30 shadow-lg fixed rounded z-10 pb-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 17.27v-1h16v1zm0-4.77v-1h16v1zm0-4.77v-1h16v1z"/></svg>
    </button>
  <div class="container mx-auto py-8 max-md:container max-md:mx-auto max-sm:container max-sm-container max-sm:px-4">
    <AdministracionComponent />
  </div>
</template>

<style>

</style>
