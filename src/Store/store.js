import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../routes.js';

//Modules
import signModule from './modules/signUpModule.js'
import eventModule from './modules/eventModule.js'
import profileModule from './modules/profileModule.js'

Vue.use(Vuex);
Vue.use(axios);

const API_ACCOUNTS_URL = `https://comeandmeet.herokuapp.com/accounts/`;
const MAP_API_TOKEN = '1e4a846d952064';

const store = new Vuex.Store({
  modules: {
    signModule,
    eventModule,
    profileModule
  },
  state: {
      isAuthorized: false,
      currentUser: '',
      appLoading: true,
      userCurrentLocation: 'Unknown'
  },
  getters: {

    getIsAuthorized(state){
      return state.isAuthorized;
    },
    getAppLoadState(state){
      return state.appLoading;
    },
    getUserCurrentLocation(state){
      return state.userCurrentLocation;
    },
    getCurrentUser(state){
      return state.currentUser;
    }

  },
  mutations: {
      setGlobalState(state, {type, item}){
        state[type] = item;
      },
      setAppLoad(state, value){
        state['appLoading'] = value;
      }

  },

  actions: {

      checkIsAuthorized({commit}){
        let token = localStorage.getItem('token');
        let checkLink = `${API_ACCOUNTS_URL}user_state/${token}/`;

        commit('setAppLoad', true);
        axios.get(checkLink).then((response)=>{
          console.log('auth');
          console.log(response);
          if(response.data.data == 'token not found'){
            commit('setGlobalState', {type:'isAuthorized', item: false});
          } else {
            commit('setGlobalState', {type:'isAuthorized', item: true});
            axios.defaults.headers.common['Authorization'] = 'Token '+localStorage.getItem('token');
            commit('setGlobalState', {type:'currentUser', item: response.data.data});
          }
          commit('setAppLoad', false);

        }, (error)=>{
          //error
          commit('setAppLoad', false);
        });
      },
      logOutUser({commit}){
        console.log('logout');
        axios.get(`${API_ACCOUNTS_URL}logout/`).then((response)=>{
          console.log(response);
          commit('setGlobalState', {type:'isAuthorized', item: false});
          localStorage.removeItem('token');
          axios.defaults.headers.common['Authorization'] = '';
        }, (error)=>{

        });
      },
      checkUserCurrentLocation({commit}){

        let self = this;
        if ("geolocation" in navigator) {
          /* геолокация доступна */
          navigator.geolocation.getCurrentPosition(function(position){
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=${MAP_API_TOKEN}&lat=${lat}&lon=${lon}&format=json`).then((response)=>{
              let city = response.data.address.city;
              let country = response.data.address.country;
              console.log("yepy");
              commit('setGlobalState', {type:'userCurrentLocation', item: city +', '+country});
            }, (error)=>{

            });
          });
        } else {
          /* геолокация НЕдоступна */
        }


      }



  }
});

export default store;
