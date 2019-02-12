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
const API_EVENTS_URL = `https://comeandmeet.herokuapp.com/events/`;
const MAP_API_TOKEN = '1e4a846d952064';
const IMAGE_CLOUD_URL = 'https://res.cloudinary.com/son313/';

const store = new Vuex.Store({
  modules: {
    signModule,
    eventModule,
    profileModule
  },
  state: {
      API_USERS_URL: "https://comeandmeet.herokuapp.com/accounts/users/",
      API_EVENT_URL: API_EVENTS_URL,
      isAuthorized: false,
      currentUser: '',
      appLoading: true,
      userCurrentLocation: '',
      eventsUrl: API_EVENTS_URL,
      imagesUrl: IMAGE_CLOUD_URL,
      tagsList: []
  },
  getters: {

    getIsAuthorized(state){
      return state.isAuthorized;
    },
    getAppLoadState(state){
      return state.appLoading;
    },
    getUserCurrentLocation(state){
      console.log("get");
      return state.userCurrentLocation;
    },
    getCurrentUser(state){
      return state.currentUser;
    },

    getTagsList(state){
      return state.tagsList
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
          if(response.data == 'token not found'){
            commit('setGlobalState', {type:'isAuthorized', item: false});
          } else {
            commit('setGlobalState', {type:'isAuthorized', item: true});
            axios.defaults.headers.common['Authorization'] = 'Token '+localStorage.getItem('token');
            commit('setGlobalState', {type:'currentUser', item: response.data});
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
          router.replace('/');
        }, (error)=>{

        });
      },
      checkUserCurrentLocation({commit}){

        if ("geolocation" in navigator) {
          /* геолокация доступна */

          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function(position){
              let tempToken = axios.defaults.headers.common['Authorization'];
              delete axios.defaults.headers.common['Authorization'];

              let lat = position.coords.latitude;
              let lon = position.coords.longitude;
              let params = {
                key: MAP_API_TOKEN,
                lat: lat,
                lon: lon,
                format: 'json',
                'accept-language': 'en'
              }

              axios.get('https://eu1.locationiq.com/v1/reverse.php?', {params}).then((response)=>{
                commit('setGlobalState', {type:'userCurrentLocation', item: response.data.address});
                resolve(response.data.address);
              }, (error)=>{
                //error
                reject(error);
              });
              axios.defaults.headers.common['Authorization'] = tempToken;
            });
          })


        } else {

        }
      },

      getTagsListAPI({state, commit}){
        console.log('tag');
        // if(state.tagsList.length == 0){

          axios.get(`${API_EVENTS_URL}tags/`).then((response)=>{

            commit('setGlobalState', {type:'tagsList', item:response.data.results});
            console.log(response);
          }, (error)=>{
            //error
            console.log(error);
          });
        // }
      },

      





  }
});

export default store;
