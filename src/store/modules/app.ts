const app = {
    state: {
        cachePage: [],
        cachePageName: [],
        menuRouters: []
    },
    mutations: {
        updateRouter(state: any, routes: any) {
            state.menuRouters.push(...routes);
        },
        setCachePage(state: any, cachePage: any) {
            state.cachePage.push(cachePage);
        },
        delCachePage(state: any, index: number) {
            state.cachePage.splice(index, 1);
        },
        delAllCachePage(state: any) {
            state.cachePage = [];
        },
        setCachePageName(state: any, cachePageName: any) {
            state.cachePageName.push(cachePageName);
        },
        delCachePageName(state: any, index: number) {
            state.cachePageName.splice(index, 1);
        },
        delAllCachePageName(state: any) {
            state.cachePageName = [];
        }
    }
};

export default app;

