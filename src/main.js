import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import  smoothscroll  from 'smoothscroll-polyfill';
smoothscroll.polyfill();

// import 'leaflet/dist/leaflet.css'


// importing files


import './assets/css/style.scss';
import './assets/css/media-queries.css';
import 'vue-date-pick/dist/vueDatePick.css';


import store from './Store/store.js';
import router from './routes.js';



Vue.prototype.$axios = axios;
Vue.use(Vuex);
Vue.use(VueRouter);



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
		// changeMarker(event){
		// 	this.marker = L.latLng(event.latlng.lat, event.latlng.lng);
		// },
		logOutUser(){
			this.$store.dispatch('logOutUser');
		},
		openMenu(){
			let navigation = document.querySelector('#navigation');
			console.log('toggle');
			console.log(navigation);
			navigation.classList.toggle('navigation-toggle');
		},
		closeMenu(event){
			let navigation = document.querySelector('#navigation');
			if(event.target.nodeName == 'A'){
				navigation.classList.remove('navigation-toggle');
			}
		}
	},

	mounted(){
		this.$store.dispatch('checkIsAuthorized');
		// this.$store.dispatch('getTagsListAPI');
		console.log(this.$router.options.routes);

		router.beforeEach((to, from, next) => {
			// document.title = "ComMet" + to.meta.title;
		  if (to.matched.some(record => record.meta.requiresAuth)) {
		    // этот путь требует авторизации, проверяем залогинен ли
		    // пользователь, и если нет, перенаправляем на страницу логина
		    if (!this.$store.getters.getIsAuthorized) {
					console.log("you cant");
		      next({
		        path: '/login/signIn'
		      })
		    } else {
		      next()
		    }
		  } else {
		    next() // всегда так или иначе нужно вызвать next()!
		  }
		})

		// this.$store.dispatch('checkUserCurrentLocation');
		// this.$axios.get('https://master.apis.dev.openstreetmap.org/#map=16/48.5370/31.1680').then((response)=>{
		// 	console.log(response);
		// }, (error)=>{
		//
		// })

	}

});
