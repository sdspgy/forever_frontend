import router from '@/router/index';

const app = {
    state: {
        currentPath: [],
        cachePage: [],
        menuRouters: []
    },
    mutations: {
        updateRouter(state: any, routes: any) {
            state.menuRouters.push(...routes);
            // router.addRoutes(routes);
        },
        setCurrentPath(state: any, pathArr: any) {
            state.currentPath = pathArr;
        }
    }
};

export default app;

