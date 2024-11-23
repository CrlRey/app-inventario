<template>
        <tr class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ articulos.id }}</td>
          <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ articulos.nombre }}</td>
          <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ articulos.categoria.nombre }}</td>
          <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ articulos.cantidad }}</td>
          <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ articulos.precio }}</td>
          <td>
            <div class="space-x-4">
              <button class="rounded-md font-bold text-white">Editar</button>
              <button @click="handlerdeleteItem(articulos.id)" class="rounded-md font-bold text-white">Eliminar</button>
            </div>
          </td>
        </tr>
</template>

<script setup>


defineProps({
  articulos: {
    type: Object,
    required: true
  }
})



</script>

<style lang="scss" scoped>

</style>
