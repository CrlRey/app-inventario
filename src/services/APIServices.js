import { api } from "@/api/axios"

export default{
  getProducts(){
    return api.get('/productos')
  },

  getCategories(){
    return api.get('/categorias')
  },

  getIdProduct(id){
    return api.get(`/productos/${id}`)
  },
  getAllUsers(){
    return api.get(`/getUsersList`)
  },
  getIdUser(id){
    return api.get(`/getUser/${id}`)
  }
}
