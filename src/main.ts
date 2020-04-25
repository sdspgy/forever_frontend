import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

import {setStore, getStore, removeStore} from './store/storage';

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/img-error.png'),
    loading: require('./assets/loading2.gif'),
    attempt: 1
})

Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;

new Vue({
    router,
    store,
    render: h => h(App),
    data: {},
    mounted() {
    }
}).$mount('#app');
