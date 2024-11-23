import { defineStore } from "pinia";
import { ref } from "vue";

export const useModal = defineStore('modal', () => {

  const modal = ref(false)
  const modalEdit = ref(false)
  const isEdit = ref(false)

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
    isEdit
  }
})
