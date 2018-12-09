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

const store = new Vuex.Store({
  modules: {
    signModule,
    eventModule,
    profileModule
  },
  state: {
      // isUniqLogin: true,
      // isUniqMail: true,
      // isSignUpEnd: false,
      // loaders: {
  		// 	mailLoader:false,
  		// 	loginLoader: false,
  		// 	signUpLoader: false,
      //   signInLoader: false
  		// },
      // verificationCode: '',
      isAuthorized: false,
      appLoading: true
      // isWrongUserData: false,


  },
  getters: {
    // isUniqLogin(state){
    //   return state.isUniqLogin;
    // },
    // isUniqMail(state){
    //   return state.isUniqMail;
    // },
    // isLoader(state){
    //   return (key)=>{
    //     return state.loaders[key];
    //   }
    // },
    // getLocalVerificationCode(state){
    //   return state.verificationCode;
    // },
    // getSignUpState(state){
    //   return state.isSignUpEnd;
    // },
    // isWrongUserData(state){
    //   return state.isWrongUserData;
    // },
    getIsAuthorized(state){
      return state.isAuthorized;
    },
    getAppLoadState(state){
      return state.appLoading;
    }

  },
  mutations: {
      setState(state, {type, item}){
        console.log(item);
        state[type] = item;
      },
      setAppLoad(state, value){
        state['appLoading'] = value;
      }
      // setLoader(state, { key, value}){
      //    state['loaders'][key] = value;
      // },
  },

  actions: {
      // checkUniqLogin({commit}, login){
      //     let checkLoginUrl = `${API_ACCOUNTS_URL}check_username/${login}`;
      //     commit('setLoader', {key: 'loginLoader', value: true});
      //     axios.get(checkLoginUrl).then((response)=>{
      //
      //       commit('setLoader', {key: 'loginLoader', value: false});
      //
      //       let result;
      //
			// 			if(response.data.data != "username is unique"){
			// 					result = false;
			// 			} else {
      //           result = true;
      //       }
      //
      //       commit('setState', {type: 'isUniqLogin', item: result});
      //
			// 		},
			// 		(error)=>{
			// 			// error
      //       alert(error);
      //       commit('setLoader', {key: 'loginLoader', value: false});
			// 		});
      //
      // },
      // checkUniqMail({commit}, email){
      //     let checkMailUrl = `${API_ACCOUNTS_URL}check_email/${email}`;
      //     commit('setLoader', {key: 'mailLoader', value: true});
      //     axios.get(checkMailUrl).then((response)=>{
      //
      //       commit('setLoader', {key: 'mailLoader', value: false});
      //
      //       let result;
      //
			// 			if(response.data.data != "email is unique"){
			// 					result = false;
			// 			} else {
      //           result = true;
      //       }
      //
      //       commit('setState', {type: 'isUniqMail', item: result});
      //
			// 		},
			// 		(error)=>{
			// 			// error
      //       alert(error);
      //       commit('setLoader', {key: 'mailLoader', value: false});
			// 		});
      //
      // },
      //
      // getVerificationCode({commit}, email){
      //   let verifLink = `${API_ACCOUNTS_URL}verify_email/${email}/`;
      //
      //   commit('setLoader', {key: 'signUpLoader', value: true })
      //
      //   axios.get(verifLink).then((response)=>{
      //
      //       commit('setLoader', {key: 'signUpLoader', value: false });
      //
      //       let verifCode = response.data.data["verification_code"];
      //       console.log(verifCode);
      //       commit('setState', {type: 'verificationCode', item: verifCode});
      //
      //       commit('setState', {type: 'isSignUpEnd', item: true});
      //
      //
      //   }, (error)=>{
      //     //error
      //     // alert(error);
      //     commit('setLoader', {key: 'signUpLoader', value: false });
      //   })
      //
      // },
      //
      // userSignIn({commit}, payload){
      //   let signInLink = `${API_ACCOUNTS_URL}login/`;
      //
      //   let axiosConfig = {
    	// 		  headers: {
    	// 		      'Content-Type': 'application/json',
    	// 		  }
    	// 	};
      //
      //   let params = JSON.stringify({
  		// 		"username": payload.username,
      //     "password": payload.password
  		// 	});
      //   console.log(params);
      //   commit('setLoader', {key: 'signInLoader', value: true});
      //   axios.post(signInLink,params,axiosConfig).then((response)=>{
      //     console.log(response);
      //     let data = response.data.data;
      //     commit('setLoader', {key: 'signInLoader', value: false});
      //     if(data.error == 'user not found'){
      //       commit('setState', {type: 'isWrongUserData', item: true})
      //     } else {
      //       localStorage.setItem('token', data.token);
      //       commit('setState', {type:'isAuthorized', item: true});
      //       axios.defaults.headers.common['Authorization'] = 'Token '+localStorage.getItem('token');
      //       router.replace('/');
      //     }
      //
      //
      //   },
      //   (error)=>{
      //     //error
      //     commit('setLoader', {key: 'signInLoader', value: false});
      //   });
      // },
      // logOutUser({commit}){
      //   console.log('logout');
      //   axios.get(`${API_ACCOUNTS_URL}logout/`).then((response)=>{
      //     console.log(response);
      //     commit('setState', {type:'isAuthorized', item: false});
      //     localStorage.removeItem('token');
      //   }, (error)=>{
      //
      //   });
      // },
      checkIsAuthorized({commit}){
        let token = localStorage.getItem('token');
        let checkLink = `${API_ACCOUNTS_URL}user_state/${token}/`;

        commit('setAppLoad', true);
        axios.get(checkLink).then((response)=>{
          console.log(response);
          if(response.data.data == 'token not found'){
            commit('setState', {type:'isAuthorized', item: false});
          } else {
            commit('setState', {type:'isAuthorized', item: true});
            axios.defaults.headers.common['Authorization'] = 'Token '+localStorage.getItem('token');
          }
          commit('setAppLoad', false);

        }, (error)=>{
          //error
          commit('setAppLoad', false);
        });
      },

      // refreshEventsList({commit}){
      //
      //   let param = {
      //     page: 1,
      //     page_size: 6
      //   }
      //   // let axiosConfig = {
      //   //   headers: {
      //   //     Authorization: 'Token ' + '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'
      //   //   }
      //   // }
      //
      //   // console.log(axiosConfig);
      //   axios.get(API_EVENTS_URL,param).then((response)=>{
      //     console.log(response);
      //     let list = response.data.data;
      //
      //     let resultList = list.map((item)=>{
      //       let resultItem = {};
      //       resultItem.name = item.attributes.name;
      //       resultItem.membersCount = item.attributes.members.length;
      //       resultItem.tags = item.attributes.tags;
      //       resultItem.authorUserName = item.attributes.author.username;
      //       resultItem.authorFirstName = item.attributes.author.first_name;
      //       resultItem.authorPhoto = item.attributes.author.avatar;
      //       return resultItem;
      //     });
      //     console.log(resultList);
      //     commit('setState', {type:'eventsList', item:resultList});
      //   }, (error)=>{
      //     console.log(error.response);
      //   });
      // }

  }
});

export default store;
