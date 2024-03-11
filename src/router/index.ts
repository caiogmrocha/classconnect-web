import { toast } from '@/components/ui/toast';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/cadastrar'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/perfis/LoginView/index.vue'),
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
        {
          path: '/salas/:idSala/publicacoes',
          children: [
            {
              path: '/salas/:idSala/publicacoes',
              name: 'publicacoes',
              component: () => import('../views/salas/publicacoes/ListagemView/index.vue'),
            },
            {
              path: '/salas/:idSala/publicacoes/publicar',
              name: 'publicar',
              component: () => import('../views/salas/publicacoes/PublicarView/index.vue'),
            },
            {
              path: '/salas/:idSala/publicacoes/:idPublicacao',
              name: 'visualizar-publicacao',
              component: () => import('../views/salas/publicacoes/VisualizarDetalhesView/index.vue'),
            },
          ]
        },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/cadastrar'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    toast({
      title: 'Acesso negado',
      description: 'Você precisa estar logado para acessar essa página',
      variant: 'destructive'
    })
    return next('/login');
  }

  next();
});

export default router
