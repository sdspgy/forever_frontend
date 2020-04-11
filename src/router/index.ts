import Vue from 'vue'
import VueRouter from 'vue-router'
import {LoadingBar} from 'view-design'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/store',
        name: 'Store',
        component: () => import(/* webpackChunkName: "about" */ '../views/Store.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 配置加载进度条
LoadingBar.config({
    color: '#6495ED',
    failedColor: '#f0ad4e',
    height: 2
})

router.beforeEach((to, from, next) => {
    LoadingBar.start();
    next();
});

router.afterEach(route => {
    LoadingBar.finish();
});

export default router
