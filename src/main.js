import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router';


// vue material
// import { MdField, MdProgress, MdMenu, MdList, MdButton } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
//




// importing files


import './assets/css/style.scss';
import './assets/css/media-queries.css';



import store from './Store/store.js';
import router from './routes.js';

//Components
// import App from './Components/SignUp/App.vue';
// import FirstPage from './Components/First-page/First-page.vue';
// import SignUp from './Components/SignUp/SignUp.vue';
// import SignIn from './Components/SignUp/SignIn.vue';




Vue.prototype.$axios = axios;
Vue.use(Vuex);
Vue.use(VueRouter);

// Vue.use(MdField);
// Vue.use(MdProgress);
// Vue.use(MdMenu);
// Vue.use(MdList);
// Vue.use(MdButton);


// const routes = [
// 	{ path: '/login', component: App, children:[
// 		{
// 			path: 'signUp',
// 			component: SignUp
// 		},
// 		{
// 			path: 'signIn',
// 			component: SignIn
// 		}
// 	] },
// 	{ path: '/', component: FirstPage},
//
//
// ];

// const router = new VueRouter({
// 	routes,
// 	linkExactActiveClass: 'navigation__item-active'
// });




new Vue({
	el: '#app',
	store,
	router,
	computed: {
		isUserAuthorized(){
			return this.$store.getters.getIsAuthorized;
		},
		isAppLoad(){
			return this.$store.getters.getAppLoadState;
		},
		userCurrentLocation(){
			return this.$store.getters.getUserCurrentLocation;
		},
		currentUser(){
			return this.$store.getters.getCurrentUser;
		}
	},
	methods: {
		logOutUser(){
			this.$store.dispatch('logOutUser');
		}
	},

	mounted(){
		this.$store.dispatch('checkIsAuthorized');
		// this.$store.dispatch('getTagsListAPI');
		console.log(this.$router.options.routes);
		// this.$store.dispatch('checkUserCurrentLocation');
		// this.$axios.get('https://master.apis.dev.openstreetmap.org/#map=16/48.5370/31.1680').then((response)=>{
		// 	console.log(response);
		// }, (error)=>{
		//
		// })

	}
});
