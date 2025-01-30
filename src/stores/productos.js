import APIServices from "@/services/APIServices"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useModal } from "./modal";


export const useProductos = defineStore('productos', () => {

  const listProduct = ref([]);
  const productDetails = ref({});
  const storeModal = useModal()
  const totalItems = ref(0)

  async function products() {
    try {
      const {data} = await APIServices.getProducts()
      listProduct.value = data
      totalItems.value = listProduct.value.length;
    } catch (error) {
      throw Error(error)
    }
  }


 async function selectProduct(id) {
   try {
    const {data} = await APIServices.getIdProduct(id)
    productDetails.value = data
    storeModal.openModalEdit()
   } catch (error) {
    console.log(error);
   }


 }


  return {
    products,
    listProduct,
    productDetails,
    selectProduct,
    totalItems
  }
})
