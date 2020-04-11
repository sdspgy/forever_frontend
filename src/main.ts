import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import { setStore, getStore, removeStore } from './store/storage';

Vue.config.productionTip = false;

Vue.use(ViewUI);

Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;

new Vue({
	router,
	store,
	render: h => h(App),
	data: {},
	mounted() {}
}).$mount('#app');
