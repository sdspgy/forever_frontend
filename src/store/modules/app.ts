import router from '@/router/index';

const app = {
    state: {
        routers: [],
        currentPath: [],
        cachePage: []
    },
    mutations: {
        updateRouter(state: any, routes: any) {
            state.routers.push(...routes);
            router.addRoutes(routes);
        },
        setCurrentPath(state: any, pathArr: any) {
            state.currentPath = pathArr;
        },
    }
};

export default app;

