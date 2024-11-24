
  <template>
  <div class="h-screen flex items-center justify-center justify-items-center p-4">
    <div class="w-full max-w-md backdrop-blur-lg bg-black bg-opacity-30 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Inicia Sesión</h2>
      <form novalidate @submit.prevent="handlerLogin()" class="space-y-4">
        <ErrorsAuthComponent v-for="(error, index) in messagesInfoErrors" :key="index" >
          {{error}}
        </ErrorsAuthComponent>
        <div>
          <label for="email" class="text-white">Correo electrónico</label>
          <input id="email" name="email" type="email" placeholder="tu@email.com"
            class="bg-white bg-opacity-20 border-0 text-white rounded-md placeholder-gray-300 w-full p-2" v-model="dataForm.email"  />
        </div>
        <div>
          <label for="password" class="text-white">Contraseña</label>
          <input id="password" name="password" type="password" placeholder="••••••••"
            class="bg-white bg-opacity-20 border-0 text-white rounded-md placeholder-gray-300 w-full p-2" v-model="dataForm.password"  />
        </div>
        <div>
          <RouterLink to="/singup" class="text-white">¿Aun No tienes una cuenta?</RouterLink>
        </div>
        <button type="submit" class="w-full p-4 rounded-md bg-gradient-to-r from-[#C3AED6] to-[#C9CEE8]  border-none shadow-md text-white hover:transition-all font-bold uppercase mt-8">
          INICIAR SESION
        </button>
      </form>
    </div>
  </div>
</template>



<script setup>

import { reactive, ref } from 'vue';
import { RouterLink } from 'vue-router'
import ErrorsAuthComponent from '../errorsAuth/ErrorsAuthComponent.vue';
import { api } from '@/api/axios';
import router from '@/router';

const dataForm = reactive({
  email: '',
  password: '',
})

const messagesInfoErrors = ref([])


const handlerLogin = async () => {
  try {
      const {data} = await api.post('/login', dataForm)
     localStorage.setItem('AUTH.TOKEN', data.token);
     localStorage.setItem('userRole', data.user.admin);
     localStorage.setItem('userID', data.user.id);
     messagesInfoErrors.value = []

// Redirigir dependiendo del rol (admin o no)
if (data.user.admin) {
  // Si el usuario es admin, redirigir a la página de administración
  router.push({ name: 'home' });
} else {
  // Si es un usuario normal, redirigir a la página principal
  router.push({ name: 'home' });
}

    } catch (error) {
      const errorData = Object.values(error.response.data.errors).flat();
      messagesInfoErrors.value = errorData

    }
}
</script>

<style lang="scss" scoped>

</style>
