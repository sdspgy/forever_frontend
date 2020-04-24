import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/modules/store'
import app from '@/store/modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        store,
        app
    }
})
