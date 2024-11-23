
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  linkActiveClass: 'text-violet-400',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        sidebar: () => import('@/components/sidebar/SidebarComponent.vue'),
        default: () => import('../views/HomeView.vue')
      },
      meta: { requiresAuth: true },  // Ruta protegida
    },
    {
      path: '/inventario',
      name: 'inventario',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/InventarioView.vue'),
        sidebar: () => import('@/components/sidebar/SidebarComponent.vue')
      },
      meta: { requiresAdmin: true },
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        login: () => import('../views/LoginView.vue'),
      }
    },
    {
      path: '/singup',
      name: 'singup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        singup: () => import('../views/SingupView.vue'),
      }
    },
    {
      path: '/panel',
      name: 'panel',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/PanelView.vue'),
        sidebar: () => import('@/components/sidebar/SidebarComponent.vue')
      },
      meta: { requiresAdmin: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('AUTH.TOKEN');
  const isAdmin = localStorage.getItem('userRole') === 'true';
  if (to.meta.requiresAuth && !token) {
    // Si la ruta requiere autenticación y no hay token, redirige al login
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'singup') && token) {
    // Si el usuario está autenticado e intenta ir al login o signup, redirige al home
    next({ name: 'home' });
  } else if (to.meta.requiresAdmin && !isAdmin) {
    // Si la ruta requiere ser admin y no lo es, redirige al home o muestra acceso denegado
    next({ name: 'home' });
  }  else {
    // Deja continuar normalmente
    next();
  }
});



export default router
