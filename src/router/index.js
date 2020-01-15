import Vue from 'vue'
import VueRouter from 'vue-router'
import TheMenu from '@/views/TheMenu.vue'
import SelectionCategory from '@/views/SelectionCategory.vue'
import SelectionCount from '@/views/SelectionCount.vue'
import TheTraining from '@/views/TheTraining.vue'
import TheSettings from '@/views/TheSettings.vue'
import TheNotFound from '@/views/TheNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'menu',
    component: TheMenu,
    meta: {
      forward: [
        'settings',
        'category',
        'shop'
      ]
    }
  },
  {
    path: '/category/:destination',
    name: 'category',
    component: SelectionCategory,
    meta: {
      forward: [
        'selection',
        'training'
      ]
    }
  },
  {
    path: '/selection',
    name: 'selection',
    component: SelectionCount,
    meta: {
      forward: []
    }
  },
  {
    path: '/training',
    name: 'training',
    component: TheTraining,
    meta: {
      forward: []
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: TheSettings,
    meta: {
      forward: []
    }
  },
  {
    path: '*',
    name: 'notFound',
    component: TheNotFound,
    meta: {
      forward: [
        'menu'
      ]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
