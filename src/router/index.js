import Vue from 'vue'
import Router from 'vue-router'
import Plan from '@/components/Plan/Index'
import Login from '@/components/Auth/Login'
import CreatePlan from '@/components/Plan/Create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/plan',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/plan/create',
      name: 'CreatePlan',
      component: CreatePlan
    }
  ]
})
