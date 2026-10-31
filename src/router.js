// 路由配置
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
  { path: '/words/:category', name: 'WordList', component: () => import('./views/WordList.vue') },
  { path: '/phrases/:scene', name: 'PhraseList', component: () => import('./views/PhraseList.vue') },
  { path: '/phonetics', name: 'Phonetics', component: () => import('./views/Phonetics.vue') },
  { path: '/phonetics/:index', name: 'PhoneticDetail', component: () => import('./views/PhoneticDetail.vue') },
  { path: '/grammar', name: 'Grammar', component: () => import('./views/Grammar.vue') },
  { path: '/practice', name: 'Practice', component: () => import('./views/Practice.vue'), meta: { hideTab: true } },
  { path: '/wrong', name: 'WrongBook', component: () => import('./views/WrongBook.vue') },
  { path: '/custom', name: 'Custom', component: () => import('./views/Custom.vue') },
  { path: '/settings', name: 'Settings', component: () => import('./views/Settings.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
