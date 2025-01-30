import APIServices from "@/services/APIServices";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoria = defineStore('categoria', () => {

  const categoriesList = ref([])

  async function categories() {
    try {
      const {data} = await APIServices.getCategories()
      categoriesList.value = data
    } catch (error) {
      console.log(error);
    }
  }

  return {
categoriesList,
categories

  }
})
