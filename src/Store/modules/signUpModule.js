const API_ACCOUNTS_URL = `https://comeandmeet.herokuapp.com/accounts/`;

// import Profile from '../../Components/Profile/Profile.vue'

import axios from 'axios';
import router from '../../routes.js';



const state = {
  isUniqLogin: true,
  isUniqMail: true,
  isSignUpEnd: false,
  loaders: {
    mailLoader:false,
    loginLoader: false,
    signUpLoader: false,
    signInLoader: false
  },
  verificationCode: '',
  isWrongUserData: false,
}



const getters = {
  isUniqLogin(state){
    return state.isUniqLogin;
  },
  isUniqMail(state){
    return state.isUniqMail;
  },
  isLoader(state){
    return (key)=>{
      return state.loaders[key];
    }
  },
  getLocalVerificationCode(state){
    return state.verificationCode;
  },
  getSignUpState(state){
    return state.isSignUpEnd;
  },
  isWrongUserData(state){
    return state.isWrongUserData;
  },
}



const mutations = {
  setLoader(state, { key, value}){
     state['loaders'][key] = value;
  },
  setSignState(state, {type, item}){
    state[type] = item;
  }
}



const actions = {
  checkUniqLogin({commit}, login){
      let checkLoginUrl = `${API_ACCOUNTS_URL}check_username/${login}`;
      commit('setLoader', {key: 'loginLoader', value: true});
      axios.get(checkLoginUrl).then((response)=>{
        console.log('checkUniqLogin');
        console.log(response);
        commit('setLoader', {key: 'loginLoader', value: false});

        let result;

        if(response.data != "username is unique"){
            result = false;
        } else {
            result = true;
        }

        commit('setSignState', {type: 'isUniqLogin', item: result});

      },
      (error)=>{
        // error
        alert(error);
        commit('setLoader', {key: 'loginLoader', value: false});
      });

  },
  checkUniqMail({commit}, email){
      let checkMailUrl = `${API_ACCOUNTS_URL}check_email/${email}`;
      commit('setLoader', {key: 'mailLoader', value: true});
      axios.get(checkMailUrl).then((response)=>{
        console.log('checkUniqMail');
        console.log(response);
        commit('setLoader', {key: 'mailLoader', value: false});

        let result;

        if(response.data != "email is unique"){
            result = false;
        } else {
            result = true;
        }

        commit('setSignState', {type: 'isUniqMail', item: result});

      },
      (error)=>{
        // error
        alert(error);
        commit('setLoader', {key: 'mailLoader', value: false});
      });

  },

  getVerificationCode({commit}, email){
    let verifLink = `${API_ACCOUNTS_URL}verify_email/${email}/`;

    commit('setLoader', {key: 'signUpLoader', value: true })

    axios.get(verifLink).then((response)=>{
        console.log('getVerificationCode');
        console.log(response);
        commit('setLoader', {key: 'signUpLoader', value: false });

        let verifCode = response.data["verification_code"];
        console.log(verifCode);
        commit('setSignState', {type: 'verificationCode', item: verifCode});

        commit('setSignState', {type: 'isSignUpEnd', item: true});


    }, (error)=>{
      //error
      // alert(error);
      commit('setLoader', {key: 'signUpLoader', value: false });
    })

  },

  userSignIn({commit}, payload){
    let signInLink = `${API_ACCOUNTS_URL}login/`;

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    let params = JSON.stringify({
      "username": payload.username,
      "password": payload.password
    });
    let username =  payload.username;
    commit('setLoader', {key: 'signInLoader', value: true});
    axios.post(signInLink,params,axiosConfig).then((response)=>{
      console.log('userSignIn');
      console.log(response);
      let data = response.data;
      commit('setLoader', {key: 'signInLoader', value: false});
      if(data.error == 'user not found'){
        commit('setSignState', {type: 'isWrongUserData', item: true})
      } else {
        localStorage.setItem('token', data.token);
        commit('setGlobalState', {type:'isAuthorized', item: true});
        axios.defaults.headers.common['Authorization'] = 'Token '+localStorage.getItem('token');
        commit('setGlobalState', {type:'currentUser', item: username});
        router.replace('/');
      }

      // router.addRoutes([{ name:'user', path: '/Profile/:username', component: Profile, props: true}]);

    },
    (error)=>{
      //error
      commit('setLoader', {key: 'signInLoader', value: false});
    });
  },

}


export default {
  state,
  getters,
  mutations,
  actions
}
