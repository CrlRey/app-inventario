<script setup>
import ListadoComponent from '@/components/listadoComponent/ListadoComponent.vue';
import { useProductos } from '@/stores/productos';
const storeProduct = useProductos();

</script>

<template>
  <main class="container max-sm:px-4 mx-auto py-8">
    <h1 class="text-4xl font-bold text-white">Dashboard</h1>
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="w-full backdrop-blur-lg bg-black bg-opacity-30 shadow-lg rounded-lg px-6 py-8">
        <div class="">
          <h2 class="text-sm font-medium text-white">Total de artículos</h2>
        </div>
        <div>
          <strong class="font-bold text-3xl text-white">{{ storeProduct.totalItems }}</strong>
        </div>
        <div>
          <p class="text-xs text-muted-foreground text-white">+10.5% este mes</p>
        </div>
      </div>
      <div class="w-full backdrop-blur-lg bg-black bg-opacity-30 shadow-lg rounded-lg px-6 py-8">
        <div class="">
          <h2 class="text-sm font-medium text-white">Bajos Stock</h2>
        </div>
        <div>
          <strong class="font-bold text-3xl text-white">23</strong>
        </div>
        <div>
          <p class="text-xs text-muted-foreground text-white">Artículos debajo del umbral</p>
        </div>
      </div>
      <div class="w-full backdrop-blur-lg bg-black bg-opacity-30 shadow-lg rounded-lg px-6 py-8">
        <div class="">
          <h2 class="text-sm font-medium text-white">Sin stock</h2>
        </div>
        <div>
          <strong class="font-bold text-3xl text-white">5</strong>
        </div>
        <div>
          <p class="text-xs text-muted-foreground text-white">Artículos agotados</p>
        </div>
      </div>
    </div>
    <ListadoComponent class="max-h-[480px] overflow-auto mt-8" />
  </main>
</template>






