import Vue from 'vue';
import VueRouter from 'vue-router';
import foo from './components/foo.vue'
import bar from './components/bar.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [

        {
            path: '/foo',
            component: foo
        },
        {
            path: '/bar',
            component: bar
        }

    ]
})