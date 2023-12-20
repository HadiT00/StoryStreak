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
  {
    path: '/RandomTopic',
    name: 'RandomTopic',
    component: () => import('../components/RandomTopic.vue')
  },
  {
    path: '/ListOfUsers',
    name: 'ListOfUsers',
    component: () => import('../components/ListOfUsers.vue')
  },
  {
    path: '/MyAccount',
    name: 'MyAccount',
    component: () => import('../components/MyAccount.vue')
  },
  {
    path: '/ContactPage',
    name: 'ContactPage',
    component: () => import('../components/ContactPage.vue')
  },
  {
    path: '/AboutPage',
    name: 'AboutPage',
    component: () => import('../components/AboutPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router