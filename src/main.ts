import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

import util from '@/common/utiles'
import {setStore, getStore, removeStore} from '@/store/storage';
import global from "@/common/gloabalComponent";
import jurisdic from "@/common/jurisdiction";

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(VueLazyload, {
    preLoad: 1.0,
    error: require('@/assets/img-error.png'),
    loading: require('@/assets/loading2.gif'),
    attempt: 1
})

Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;

new Vue({
    router,
    store,
    global,
    jurisdic,
    render: h => h(App),
    data: {},
    mounted() {
        util.initRouter(this);
    }
}).$mount('#app');
