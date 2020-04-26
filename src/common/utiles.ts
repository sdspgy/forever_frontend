import {queryMenuRouter} from '@/axios/api'
import loadView from "@/router/loadView";
import router from '@/router/index';
import Manage from '../views/manage/Manage.vue'

let util: any = {};

util.title = (title: any) => {
    title = '数据平台' + title;
    window.document.title = title;
};

util.initRouter = (vm: any) => {
    queryMenuRouter(null).then(res => {
        if (res.code === 200) {
            let otherRouterMap: any = initRouters(res.sysMenus);
            router.addRoutes(otherRouterMap);
            vm.$store.commit('updateRouter', res.sysMenus)
        }
    })
};

function initRouters(router: any) {
    debugger
    for (let i = 0; i < router.length; i++) {
        let route = router[i];
        //设置一级路由的控件为全局定义的默认控件
        route.component = Manage;
        initRouterChilder(route.children);
    }
    return router;
}

function initRouterChilder(routerChilder: any) {
    for (let i = 0; i < routerChilder.length; i++) {
        let routeChilder = routerChilder[i];
        routeChilder.component = loadView(routeChilder.path);
    }
}

export default util;