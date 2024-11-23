<template>

  <TransitionRoot appear :show="storeModalUser.modal" as="template">
    <Dialog as="div" @close="storeModalUser.closeModal()" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
               class="text-lg font-bold leading-6 text-gray-900 justify-between flex"
              >
              {{ storeModalUser.isEdit ? 'Editar usuario' : 'Agregar usuario' }}
              <button @click="storeModalUser.closeModal()">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z" />
                  </svg>
                </button>
              </DialogTitle>
              <div class="mt-2">
                <form novalidate @submit.prevent="storeModalUser.isEdit ? handlerEditUser() : handlerNewUser()" action="POST">
                  <label for="name">Nombre:</label>
                  <input class="w-full bg-violet-50 rounded-md p-2" type="text" id="name" name="name"
                    v-model="addOrEditName">


                  <label class="" for="email">Correo:</label>
                  <input class="w-full inline-block bg-violet-50 rounded-md p-2" type="email" id="email"
                    name="email" v-model="addOrEditEmail">

                    <label for="categoria_id">Rol:</label>
                    <select class="w-full bg-violet-50 rounded-md p-2" name="admin" id="admin"
                    v-model="addOrEditRol">
                    <option :value="false">Usuario</option>
                    <option :value="true">Admin</option>
                  </select>

                  <div class="mt-4">
                    <button type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                     >
                     {{ storeModalUser.isEdit ? 'Actualizar Usuario' : 'Agregar Nuevo Usuario' }}
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

import { api } from '@/api/axios';
import { useModalUser } from '@/stores/userModal';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { computed, reactive } from 'vue';



const storeModalUser = useModalUser();
storeModalUser.rolCheck();

const addOrEditName = computed({
  get() {
    return storeModalUser.isEdit ? storeModalUser.rolUser.name : newUser.name;
  },
  set(value) {
    if (storeModalUser.isEdit) {
      storeModalUser.rolUser.name = value;
    } else {
      newUser.name = value;
    }
  }
});

const addOrEditEmail = computed({
  get() {
    return storeModalUser.isEdit ? storeModalUser.rolUser.email : newUser.email;
  },
  set(value) {
    if (storeModalUser.isEdit) {
      storeModalUser.rolUser.email = value;
    } else {
      newUser.email = value;
    }
  }
});

const addOrEditRol = computed({
  get() {
    return storeModalUser.isEdit ? storeModalUser.rolUser.admin : newUser.admin;
  },
  set(value) {
    if (storeModalUser.isEdit) {
      storeModalUser.rolUser.admin = value;
    } else {
      newUser.admin = value;
    }
  }
});

const newUser = reactive({
  name: '',
  email: '',
  admin: 'false',
})

async function handlerNewUser() {
  try {
    const res = await api.post('/newUser', newUser)
    storeModalUser.userList.push(res.data)
    newUser.name = ''
    newUser.email = ''
    newUser.admin = ''
    storeModalUser.closeModal()
    alert('usuario agregado exitosamente')
  } catch (error) {
    console.log(error);
  }
}

async function handlerEditUser() {
  try {
    const res = await api.put(`/getUser/${storeModalUser.rolUser.id}`, storeModalUser.rolUser);
    const index = storeModalUser.userList.findIndex(product => product.id === res.data.id);
    if (index !== -1) {
      storeModalUser.userList[index] = res.data;
    }
    storeModalUser.closeModal();
    alert('Usuario actualizado exitosamente');
  } catch (error) {
    console.log(error);
  }
}
</script>
