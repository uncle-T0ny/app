import { createRouter, createWebHistory } from 'vue-router'
// import LandingPage from '@/views/LandingPage.vue'
import Dao from '@/views/Dao.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'landing-page',
    component: Dao
  },
  {
    path: '/daos',
    name: 'daos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/DaoList.vue')
  },
  {
    path: '/dao/:id',
    name: 'dao',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Dao.vue')
  },
  {
    path: '/create-dao',
    name: 'createDao',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/CreateNewDaoForm.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters['near/isSignedIn']){
        next()
      }else{
        store.commit('near/signIn')
        next(false) 
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router