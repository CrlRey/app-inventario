<template>
  <TransitionRoot appear :show="store.modal" as="template">
    <Dialog as="div" @close="store.closeModal()" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-bold leading-6 text-gray-900 justify-between flex">

                {{ store.isEdit ? 'Editar producto' : 'Agregar producto' }}

                <button @click="store.closeModal()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
                  </svg>
                </button>
              </DialogTitle>
              <ErrorsAuthComponent v-for="(error, index) in messagesInfoErrors" :key="index" >
          {{error}}
        </ErrorsAuthComponent>
              <div class="mt-2">
                <form novalidate @submit.prevent="store.isEdit ? handlerEditItem() : handlerNewItem()" action="POST">
                  <label for="nombre">Nombre:</label>
                  <input class="w-full bg-violet-50 rounded-md p-2" type="text" id="nombre" name="nombre"
                    v-model="addOrEditName">

                  <label for="categoria_id">Categoría:</label>
                  <select class="w-full bg-violet-50 rounded-md p-2" name="categoria_id" id="categoria_id"
                    v-model="addOrEditCategoria">
                    <option v-for="option in storeCategorias.categoriesList" :key="option.id" :value="option.id">
                      {{ option.nombre }}
                    </option>
                  </select>


                  <label class="" for="cantidad">Cantidad:</label>
                  <input class="w-full inline-block bg-violet-50 rounded-md p-2" type="number" id="cantidad"
                    name="cantidad" v-model="addOrEditQuantity">

                  <label for="precio">Precio:</label>
                  <input class="w-full bg-violet-50 rounded-md p-2" type="number" id="precio" name="precio"
                    v-model="addOrEditPrice">
                  <div class="mt-4">
                    <button type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                     >
                     {{ store.isEdit ? 'Actualizar Artículo' : 'Agregar Nuevo Artículo' }}
                    </button>
                  </div>


                </form>
              </div>


            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


<script setup>
import { useModal } from '@/stores/modal';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useCategoria } from '@/stores/categoria';
import { computed, onMounted, reactive, ref } from 'vue';
import { api } from '@/api/axios';
import { useProductos } from '@/stores/productos';
import ErrorsAuthComponent from '../errorsAuth/ErrorsAuthComponent.vue';


const store = useModal()
const storeCategorias = useCategoria()
const storeProduct = useProductos()
const messagesInfoErrors = ref([])

const addOrEditName = computed({
  get() {
    return store.isEdit ? storeProduct.productDetails.nombre : newItem.nombre;
  },
  set(value) {
    if (store.isEdit) {
      storeProduct.productDetails.nombre = value;
    } else {
      newItem.nombre = value;
    }
  }
});

const addOrEditCategoria = computed({
  get() {
    return store.isEdit ? storeProduct.productDetails.categoria_id : newItem.categoria_id;
  },
  set(value) {
    if (store.isEdit) {
      storeProduct.productDetails.categoria_id = value;
    } else {
      newItem.categoria_id = value;
    }
  }
});

const addOrEditQuantity = computed({
  get() {
    return store.isEdit ? storeProduct.productDetails.cantidad : newItem.cantidad;
  },
  set(value) {
    if (store.isEdit) {
      storeProduct.productDetails.cantidad = value;
    } else {
      newItem.cantidad = value;
    }
  }
});

const addOrEditPrice = computed({
  get() {
    return store.isEdit ? storeProduct.productDetails.precio : newItem.precio;
  },
  set(value) {
    if (store.isEdit) {
      storeProduct.productDetails.precio = value;
    } else {
      newItem.precio = value;
    }
  }
});

const newItem = reactive({
  nombre: '',
  categoria_id: 1,
  cantidad: '',
  precio: '',
})



async function handlerNewItem() {
  try {
    const res = await api.post('/nuevoProducto', newItem)
    storeProduct.listProduct.push(res.data)
    newItem.nombre = ''
    newItem.cantidad = ''
    newItem.categoria_id = ''
    newItem.precio = ''
    store.closeModal()
    alert('Producto agregado exitosamente')
  } catch (error) {
    const errorData = Object.values(error.response.data.errors).flat();
    messagesInfoErrors.value = errorData
  }
}

async function handlerEditItem() {
  try {
    const res = await api.put(`/productos/${storeProduct.productDetails.id}`, storeProduct.productDetails);
    const index = storeProduct.listProduct.findIndex(product => product.id === res.data.id);
    if (index !== -1) {
      storeProduct.listProduct[index] = res.data; // Actualiza el producto en la lista
    }
    store.closeModal();
    alert('Producto actualizado exitosamente');
  } catch (error) {
    const errorData = Object.values(error.response.data.errors).flat();
    messagesInfoErrors.value = errorData
  }
}





onMounted(() => {
  storeCategorias.categories()
})

</script>
