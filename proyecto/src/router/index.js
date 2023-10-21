import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "area" */ '../views/AreaView.vue')
  },
  {
    path: '/area/:id',
    name: 'areaUpdate',
    component: () => import(/* webpackChunkName: "areaUpdate" */ '../views/AreaEditarView.vue')
  },
  {
    path: '/activo',
    name: 'activo',
    component: () => import(/* webpackChunkName: "activo" */ '../views/ActivosView.vue')
  },
  {
    path: '/activo/:id',
    name: 'activoUpdate',
    component: () => import(/* webpackChunkName: "activoUpdate" */ '../views/ActivosEditarView.vue')
  },
  {
    path: '/tipoactivo',
    name: 'tipoactivo',
    component: () => import(/* webpackChunkName: "activoUpdate" */ '../views/TipoActivosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
