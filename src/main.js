// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from './auth'
import { map } from './services'
import { eventBus } from './utils'

Vue.config.productionTip = false

auth.init({
  storageType: 'cookie',
  oauthProviders: {
    google: {
      client_id: '1030053840594-6ugu7n22c0bhr1ndhumq7fvps6v0vekd.apps.googleusercontent.com'
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created () {
    eventBus.init()
    map.initialize(process.env.GOOGLE_API_KEY)
  }
})
