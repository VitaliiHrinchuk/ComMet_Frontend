import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import './assets/style.css';
import './assets/media-queries.css';


//Components
import App from './Components/App.vue';
import store from './Store/index.js';



Vue.prototype.$axios = axios;
Vue.use(Vuex);

new Vue({
	el: '#app',
	store,
	render: h => h(App)
});
