import Vue from 'vue'
import Router from 'vue-router'
import Trip from '@/components/Trip/AddPlaces'
import Login from '@/components/Auth/Login'
import CreateTrip from '@/components/Trip/Create'

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
      path: '/trip/create',
      name: 'CreateTrip',
      component: CreateTrip
    }
  ]
})
