import { createRouter, createWebHistory } from 'vue-router'

// Importy widoków
import TrainerView from '../views/TrainerView.vue'
import ClientView from '../views/ClientView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/trainer',
    name: 'trainer',
    component: TrainerView
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router