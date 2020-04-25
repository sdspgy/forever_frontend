import router from '@/router/index';

const app = {
    state: {
        currentPath: [],
        cachePage: [],
        menuRouters: [{
            "path": "/home",
            "title": "系统管理",
            "children": [
                {
                    "path": "home",
                    "name": "Home",
                    "title": "用户管理"
                }
            ]
        }]
    },
    mutations: {
        updateRouter(state: any, routes: any) {
            state.menuRouters.push(...routes);
            router.addRoutes(routes);
        },
        setCurrentPath(state: any, pathArr: any) {
            state.currentPath = pathArr;
        }
    }
};

export default app;

