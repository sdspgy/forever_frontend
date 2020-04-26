import Vue from 'vue'
import VueRouter from 'vue-router'
import {LoadingBar} from 'view-design'
import util from "@/common/utiles"
import loadView from "@/router/loadView"
/*view*/
import Welcome from '../views/Welcome.vue'
import Manage from '../views/manage/Manage.vue'

Vue.use(VueRouter)

const defaultComponent = Manage;

// export const otherRouterMap = initRouter(require('@/router/router.json'));

export const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
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
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        ...routes
    ]
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
    util.title(route.name)
    LoadingBar.finish();
});

export default router
