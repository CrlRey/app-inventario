<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md backdrop-blur-lg bg-black bg-opacity-30 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Registro</h2>
      <form novalidate @submit.prevent="handlerSingup()" class="space-y-4">
        <ErrorsAuthComponent v-for="(error, index) in messagesInfoErrors" :key="index" >
          {{error}}
        </ErrorsAuthComponent>
        <div>
          <label for="name" class="text-white">Nombre</label>
          <input id="name" name="name" placeholder="ej. Carlos" type="text"
            class="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 w-full p-2 rounded-md" v-model="dataForm.name" />
        </div>
        <div>
          <label for="email" class="text-white">Correo electrónico</label>
          <input id="email" name="email" type="email" placeholder="tu@email.com"
            class="bg-white bg-opacity-20 border-0 text-white rounded-md placeholder-gray-300 w-full p-2" v-model="dataForm.email" />
        </div>
        <div>
          <label for="password" class="text-white">Contraseña</label>
          <input id="password" name="password" type="password" placeholder="••••••••"
            class="bg-white bg-opacity-20 border-0 text-white rounded-md placeholder-gray-300 w-full p-2" v-model="dataForm.password" />
        </div>
        <div>
          <label for="password_confirmation" class="text-white">Confirmar contraseña</label>
          <input id="password_confirmation" name="password_confirmation" type="password" placeholder="••••••••" v-model="dataForm.password_confirmation"

            class="bg-white bg-opacity-20 border-0 text-white placeholder-gray-300 w-full p-2 rounded-md"  />
        </div>
        <div>
          <RouterLink to="/login" class="text-white">¿Ya tienes cuenta? Inicia sesión</RouterLink>
        </div>
        <button type="submit" class="w-full p-4 rounded-md bg-gradient-to-r from-[#C3AED6] to-[#C9CEE8]  border-none  shadow-md text-white hover:transition-all font-bold uppercase mt-8">
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { api } from '@/api/axios';
import { reactive, ref } from 'vue';
import ErrorsAuthComponent from '../errorsAuth/ErrorsAuthComponent.vue';
import router from '@/router';



const dataForm = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const messagesInfoErrors = ref([])


const handlerSingup = async () => {

  try {
    const {data} = await api.post('/register', dataForm)
    localStorage.setItem('AUTH.TOKEN', data.token)
    messagesInfoErrors.value = []
    router.push({name: 'home'});
  } catch (error) {
    const errorData = Object.values(error.response.data.errors).flat();
    messagesInfoErrors.value = errorData

  }
}
</script>

<style lang="scss" scoped>

</style>
