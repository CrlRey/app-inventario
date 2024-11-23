<script setup>
import { api } from '@/api/axios';
import { useModalUser} from '@/stores/userModal';
import { onMounted} from 'vue';


const storeModalUser = useModalUser()

async function hanlderDeleteUser(id) {
  const currentUserId = localStorage.getItem('userID');

  if (id === currentUserId) {
    const confirmDelete = confirm('Al eliminar tu cuenta, te darás de baja de la aplicación. ¿Estás seguro de que deseas continuar?');
    if (!confirmDelete) {
      return; // Salir de la función si el usuario cancela
    }
  }

  if (storeModalUser.userList.length === 1) {
    alert('No se puede eliminar el único usuario en la lista.');
    return;
  }

  api.delete(`/getUser/${id}`).then(response => {
    storeModalUser.userList = storeModalUser.userList.filter(user => user.id !== id)
    alert(response.data.message)
    .catch(error => {
      console.log(error);
      alert('Error')
    })
  })
}

onMounted(() => {
  storeModalUser.getUsers()
})
</script>


<template>

  <div class="mt-8">
    <div class="flex items-center justify-between">
      <h4 class="text-2xl font-semibold text-white">Usuarios registrados</h4>
    </div>
    <p class="text-white font-medium text-lg">En este apartado un administrador puede cambiar el tipo de rol de otro usuario previamente registrado en la aplicación</p>
  </div>
  <div class="mt-4 ">
    <div class="w-full backdrop-blur-lg bg-black bg-opacity-30 p-5 rounded-md shadow-lg">
      <div class="max-h-screen overflow-auto">
        <table class="w-full text-base text-white table-auto">
          <thead>
            <tr class="text-left">
              <th
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                ID</th>
              <th
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Nombre</th>
              <th
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Correo</th>
              <th
                class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                Acción</th>
            </tr>
          </thead>
          <tbody class="[&_tr:last-child]:border-0">
            <tr v-for="user in storeModalUser.userList" :key="user.id"
              class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ user.id }}</td>
              <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ user.name }}</td>
              <td class="p-4 align-middle [&:has([role=checkbox])]:pr-0">{{ user.email }}</td>
              <td>
                <div class="space-x-4">
                  <button @click="storeModalUser.selectUser(user.id)" class="rounded-md font-bold text-white">Editar</button>
                  <button @click="hanlderDeleteUser(user.id)"
                    class="rounded-md font-bold text-white">Eliminar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
