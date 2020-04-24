export interface StoreString {
    name: string;
}

const state: StoreString = {
    name: 'store'
}

const getters = {};

const mutations = {};

const actions: any = {
    changeName(context: { state: StoreString }) {
        state.name = 'changeStore';
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
