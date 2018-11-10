import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
Vue.use(axios);

const API_ACCOUNTS_URL = `https://comeandmeet.herokuapp.com/accounts/`;

const store = new Vuex.Store({
  state: {
      isUniqLogin: true,
      isUniqMail: true,
      isSignUpEnd: false,
      loaders: {
  			mailLoader:false,
  			loginLoader: false,
  			signUpLoader: false
  		},
      verificationCode: '',
  },
  getters: {
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
    }
  },
  mutations: {
      setUniqState(state, {type, item}){
         state[type] = item;
      },
      setLoader(state, { key, value}){
         state['loaders'][key] = value;
      },
      setVerifCode(state, {value}){
        state['verificationCode'] = value;
      },
      setSignUpState(state, {value}){
        state['isSignUpEnd'] = value;
      }
  },

  actions: {
      checkUniqLogin({commit}, login){
          let checkLoginUrl = `${API_ACCOUNTS_URL}check_username/${login}`;
          commit('setLoader', {key: 'loginLoader', value: true});
          axios.get(checkLoginUrl).then((response)=>{

            commit('setLoader', {key: 'loginLoader', value: false});

            let result;

						if(response.data.data != "username is unique"){
								result = false;
						} else {
                result = true;
            }

            commit('setUniqState', {type: 'isUniqLogin', item: result});

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

            commit('setLoader', {key: 'mailLoader', value: false});

            let result;

						if(response.data.data != "email is unique"){
								result = false;
						} else {
                result = true;
            }

            commit('setUniqState', {type: 'isUniqMail', item: result});

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

            commit('setLoader', {key: 'signUpLoader', value: false });

            let verifCode = response.data.data["verification_code"];
            console.log(verifCode);
            commit('setVerifCode', {value: verifCode});

            commit('setSignUpState', {value: true});

        }, (error)=>{
          //error
          alert(error);
          commit('setLoader', {key: 'signUpLoader', value: false });
        })

      }
  }
});

export default store;
