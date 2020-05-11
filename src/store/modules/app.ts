const app = {
    state: {
        activeMenu: '',
        cachePage: [],
        menuRouters: []
    },
    mutations: {
        updateRouter(state: any, routes: any) {
            state.menuRouters.push(...routes);
        },
        setActiveMenu(state: any, activeMenu: any) {
            state.activeMenu = activeMenu;
        }
    }
};

export default app;

