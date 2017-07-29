import Vue from 'vue';
import VueRouter from 'vue-router';
import OneThing from './components/onething.vue'
import All from './components/all.vue'
import Edit from './components/edit.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: OneThing
        },
        {
            path: '/all',
            component: All
        },
        {
            path: '/edit',
            component: Edit
        }
    ]
})