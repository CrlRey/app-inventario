<script setup>
import { api } from '@/api/axios';
import router from '@/router';
import { useSidebar } from '@/stores/sidebar';

import { RouterLink } from 'vue-router'

const storeSidebar = useSidebar()

async function logout() {
  try {
    const token = localStorage.getItem('AUTH.TOKEN')
    await api.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    localStorage.removeItem('AUTH.TOKEN')
    localStorage.removeItem('userRole')
    router.push({name: 'login'})
  } catch (error) {
    //throw Error(error)
    console.log(error);
  }
}

const isAdmin = localStorage.getItem('userRole') === 'true';

</script>


<template>
  <div>
    <aside :class="['fixed inset-0 z-40 transition-transform transform md:relative md:translate-x-0', { '-translate-x-full': !storeSidebar.isSidebarOpen }]">
      <div class="w-64 h-screen backdrop-blur-2xl bg-black p-2 bg-opacity-30 shadow-lg flex flex-col">
        <div class="flex-grow">
          <button @click="storeSidebar.toggleSidebar()" class="md:hidden text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
    </button>
          <h1 class="font-bold text-3xl text-center p-5 text-white">Inventario</h1>
          <nav class="flex flex-col text-white px-2 font-bold text-xl space-y-4">
            <RouterLink activeClass="text-violet-400" to="/" @click="storeSidebar.toggleSidebar()">Dashboard</RouterLink>
            <RouterLink v-if="isAdmin" activeClass="text-violet-400" to="/inventario" @click="storeSidebar.toggleSidebar()">Inventario</RouterLink>
            <RouterLink v-if="isAdmin" activeClass="text-violet-400" to="/panel" @click="storeSidebar.toggleSidebar()">Panel</RouterLink>
          </nav>
        </div>
        <button @click="logout()" class="bg-white text-violet-400 p-2 m-2 rounded-md font-bold">Cerrar sesión</button>
      </div>
    </aside>

    <!-- Fondo oscuro cuando el sidebar está abierto -->
    <div v-if="storeSidebar.isSidebarOpen" @click="storeSidebar.toggleSidebar()" class="fixed inset-0 bg-black bg-opacity-30 shadow-lg z-30 md:hidden"></div>
  </div>
</template>

