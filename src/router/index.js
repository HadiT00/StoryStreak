import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/Login',
    name: 'LoginPage',
    component: () => import('../components/LoginPage.vue')
  },
  {
    path: '/Register',
    name: 'RegisterPage',
    component: () => import('../components/RegisterPage.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router