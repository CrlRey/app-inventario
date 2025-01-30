<script setup>

import formatPrice from '@/helpers/formatMoney';
import { useModal } from '@/stores/modal';
import { useProductos } from '@/stores/productos';
import { onMounted } from 'vue'
import { api } from '@/api/axios';
import { useQuery } from '@tanstack/vue-query'
import APIServices from '@/services/APIServices';

const store = useModal()
const storeProduct = useProductos()

async function prGet() {
  const res = await api.get('/productos')
  return res.data
}


storeProduct.products()
  const {isPending, isFetching, isError, data, error } = useQuery({
  queryFn: prGet,
    queryKey: ['productos'],
    gcTime: 1000 * 60 * 5,
});

onMounted(() => {


})

async function handlerdeleteItem(id) {
  api.delete(`/productos/${id}`).then(response => {
    storeProduct.listProduct = storeProduct.listProduct.filter(product => product.id !== id)
    alert(response.data.message)
    .catch(error => {
      console.log(error);
      alert('Error')
    })
  })
}

const isAdmin = localStorage.getItem('userRole') === 'true';

</script>


<template>
  <div class="mt-8">
    <div class="flex items-center justify-between">
      <h4 class="text-2xl font-semibold text-white">Lista de productos</h4>
      <button v-if="isAdmin" @click="store.openModalAdd()"
        class="bg-white px-4 py-2 rounded-md shadow-lg font-bold text-[#8675A9] flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round"
          class="lucide lucide-plus text-[#8675A9]">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>Agregar articulo</button>
    </div>
  </div>
  <div class="mt-4">
    <div class="w-full backdrop-blur-lg bg-black bg-opacity-30 p-5 rounded-md shadow-lg">
      <div :class="$attrs.class">
        <!-- Contenedor de la tabla con desplazamiento en pantallas pequeñas -->
        <div class="overflow-x-auto">
          <table class="min-w-full text-base text-white table-auto">
            <thead>
              <tr class="text-left">
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Categoría</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cantidad</th>
                <th class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Precio</th>
                <th v-if="isAdmin" class="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="producto in storeProduct.listProduct" :key="producto.id" class="border-b transition-colors hover:bg-muted/50">
                <td class="p-4 align-middle">{{ producto.id }}</td>
                <td class="p-4 align-middle">{{ producto.nombre }}</td>
                <td class="p-4 align-middle">{{ producto.categoria.nombre }}</td>
                <td class="p-4 align-middle">{{ producto.cantidad }}</td>
                <td class="p-4 align-middle">{{ formatPrice(producto.precio) }}</td>
                <td v-if="isAdmin" class="p-4">
                  <div class="space-x-4">
                    <button @click="storeProduct.selectProduct(producto.id)" class="rounded-md font-bold text-white">Editar</button>
                    <button @click="handlerdeleteItem(producto.id)" class="rounded-md font-bold text-white">Eliminar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
