import Vue from 'vue'
import App from './components/app.vue'
import router from './router'
import store from './store'

import 'font-awesome-webpack'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})