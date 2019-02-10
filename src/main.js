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
	data:{
		globalSearchResult: [],
		globalSearchQuery: '',
		globalSearchLoader: false
	},
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
		},
		globalSearch(){
			this.globalSearchResult = [];
			if(this.globalSearchQuery.indexOf('@') == 0){
				console.log(this.globalSearchQuery.slice(1));
				if(this.globalSearchQuery.length > 1){
					console.log("user");
					let params = {
						'limit': 5,
						'offset': 0,
						'search': this.globalSearchQuery.slice(1),
					}
					this.$axios.get(`${this.$store.state.API_USERS_URL}`, {params}).then(response=>{
						console.log(response);
						this.globalSearchResult = response.data.results;
					}, error => {
						//error
					});
				}

			} else {
				console.log("not user");
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

	},
	created(){
		let currentDate = new Date();
		let dateString = currentDate.getFullYear() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + ("0" + currentDate.getDate()).slice(-2);
		this.$store.commit('setEventsFilterProperty', {prop:'date_start', value:dateString});
	}

});
