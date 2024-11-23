import { ref } from "vue";

import { defineStore } from "pinia";

export const useSidebar = defineStore('sidebar', () => {

  const isSidebarOpen = ref(false);


  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  };


  return{
isSidebarOpen,
toggleSidebar
  }
})
