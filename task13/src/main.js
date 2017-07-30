import Vue from 'vue'
import App from './components/app.vue'
import router from './router'
import store from './store'
import VueTouch from 'vue-touch'
import 'font-awesome-webpack'

Vue.use(VueTouch, {
    name: 'v-touch'
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})