import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Auth/Login'
import Trip from '@/components/Trip/AddPlaces'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/trip/:uuid/places',
      name: 'UpdateTrip',
      component: Trip
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
