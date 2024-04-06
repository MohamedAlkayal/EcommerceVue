import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'main',
      path: '/',
      component: MainLayout,
      children: [
        {
          name: 'home',
          path: '/',
          component: HomeView,
          meta: {
            title: 'Market'
          }
        },
        {
          name: 'about',
          path: '/about',
          component: () => import('@/views/AboutView.vue'),
          meta: {
            title: 'About - Market'
          }
        },
        {
          name: 'contact',
          path: '/contact',
          component: () => import('@/views/ContactView.vue'),
          meta: {
            title: 'Contact Us - Market'
          }
        },
        {
          name: 'products',
          path: '/products/:category?/:page?',
          component: () => import('@/views/ProductsView.vue'),
          meta: {
            title: 'Products - Market'
          }
        },
        {
          name: 'product',
          path: '/product/:id?',
          component: () => import('@/views/ProductView.vue'),
          meta: {
            title: 'Product - Market'
          }
        },
        {
          name: 'cart',
          path: '/cart',
          component: () => import('@/views/CartView.vue'),
          meta: {
            title: 'Cart - Market'
          }
        }
      ]
    },

    {
      name: 'login',
      path: '/login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login - Market',
        requiresGuest: true
      }
    },
    {
      name: 'signup',
      path: '/signup',
      component: () => import('../views/SignupView.vue'),
      meta: {
        title: 'Sign up - Market',
        requiresGuest: true
      }
    },
    {
      name: 'notFound',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      document.title = 'Market'
      next({ name: 'home' })
    } else {
      document.title = to.meta.title
      next()
    }
  } else {
    document.title = to.meta.title
    next()
  }
})

export default router
