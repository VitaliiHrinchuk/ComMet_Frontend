import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router';


// importing files
import './assets/css/style.css';
import './assets/css/media-queries.css';


import store from './Store/index.js';

//Components
import App from './Components/SignUp/App.vue';
import FirstPage from './Components/First-page/First-page.vue'




Vue.prototype.$axios = axios;
Vue.use(Vuex);
Vue.use(VueRouter);


const routes = [
	{ path: '/SignUp', component: App },
	{ path: '/', component: FirstPage}

];

const router = new VueRouter({
	routes,
	linkExactActiveClass: 'navigation__item-active'
});


new Vue({
	el: '#app',
	store,
	router
});
