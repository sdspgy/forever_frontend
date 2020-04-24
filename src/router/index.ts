import Vue from 'vue'
import VueRouter from 'vue-router'
import {LoadingBar} from 'view-design'
import util from "@/common/utiles"
import loadView from "@/router/loadView"
/*view*/
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Manage from '../views/manage/Manage.vue'

Vue.use(VueRouter)

const defaultComponent = Manage;

export const otherRouterMap = initRouter(require('@/router/router.json'));

export const routes = [
    {
        path: '/',
        name: 'Welcome',
        component: Welcome
    },
    // {
    //     path: '/manage',
    //     name: 'Manage',
    //     component: Manage
    // },
    // {
    //     path: '/home',
    //     name: 'Home',
    //     component: Manage,
    // },
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

function initRouter(router: any) {
    for (let i = 0; i < router.length; i++) {
        let route = router[i];
        //设置一级路由的控件为全局定义的默认控件
        route.component = defaultComponent;
        initRouterChilder(route.children);
    }
    return router;
}

function initRouterChilder(routerChilder: any) {
    for (let i = 0; i < routerChilder.length; i++) {
        let routeChilder = routerChilder[i];
        routeChilder.component = loadView(routeChilder.name);
    }
}

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        ...routes,
        ...otherRouterMap
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
