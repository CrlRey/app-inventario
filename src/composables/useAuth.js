import { api } from "@/api/axios";
import router from "@/router";
import useSWRV from 'swrv'
import { watch } from "vue";

export function useAuth({middleware, url}){

  const token = localStorage.getItem('AUTH.TOKEN')

  const { data: user, error, mutate } = useSWRV('/user', () =>
    api('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.data)
    .catch(() => null)
  )

  const login = async (dataForm, messagesInfoErrors) => {
    try {
      const {data} = await api.post('/login', dataForm)
     localStorage.setItem('AUTH.TOKEN', data.token);
     messagesInfoErrors.value = []
    await mutate()
    } catch (error) {
      const errorData = Object.values(error.response.data.errors).flat();
      messagesInfoErrors.value = errorData

    }
  }

  const registro = () => {

  }

  const logout = () => {

  }
  console.log(user);
  console.log(error);

  watch([user, error], () => {
    if(middleware === 'guest' && url && user){
      router.push(url)
    }
    if(middleware === 'auth' && error){
      router.push('/login')
    }
  })

  return {
login,
registro,
logout,
user,
error
  }
}
