import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/CatalogView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
