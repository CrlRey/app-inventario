import APIServices from "@/services/APIServices";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalUser = defineStore('modalUser', () => {

  const modal = ref(false)
  const modalEdit = ref(false)
  const isEdit = ref(false)

  const rolUser = ref({})
  const userList = ref([]);

  async function rolCheck() {
    try {
      const {data} = await APIServices.getAllUsers()
      rolUser.value = data.data
    } catch (error) {
      console.log(error);
    }
  }

  async function selectUser(id) {
    try {
     const {data} = await APIServices.getIdUser(id)
     rolUser.value = data.data
     openModalEdit()
     console.log(rolUser.value);
    } catch (error) {
     console.log(error);
    }
  }

  async function getUsers() {
    try {
      const { data } = await APIServices.getAllUsers();
      userList.value = data.data
    } catch (error) {
      console.log(error);
    }
  }

  function openModalAdd() {
    isEdit.value = false
    modal.value = true

  }

  function openModalEdit() {
    isEdit.value = true
    modal.value = true

  }

  function closeModal() {
    modal.value = false
  }

  return {
    openModalAdd,
    openModalEdit,
    closeModal,
    modal,
    modalEdit,
    isEdit,
    rolCheck,
    rolUser,
    selectUser,
    userList,
    getUsers
  }
})
