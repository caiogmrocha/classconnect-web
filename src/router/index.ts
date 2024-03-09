import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => null,
			beforeEnter: (to, from, next) => {
				next('/login')
			}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/perfis/LoginView/index.vue')
    },
    {
      path: '/cadastrar',
      name: 'cadastrar-perfil',
      component: () => import('../views/perfis/RegisterView/index.vue')
    },
    {
      path: '/salas',
      component: () => import('../components/layouts/BaseLayout.vue'),
      children: [
        {
          path: '/salas/cadastrar',
          name: 'cadastrar-sala',
          component: () => import('../views/salas/CadastrarView/index.vue'),
        },
        {
          path: '/salas',
          name: 'salas',
          component: () => import('../views/salas/ListagemView/index.vue'),
        },
      ]
    },
  ]
})

export default router
