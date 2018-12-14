import axios from 'axios';
import router from '../../routes.js';

const API_ACCOUNTS_URL = `https://comeandmeet.herokuapp.com/accounts/`;

const state = {
  userData: {},
  profileLoader: true,
}

const getters = {
  getUserData(state){
    return state.userData;
  },
  getProfileLoaderState(state){
    return state.profileLoader;
  }
}

const mutations = {
  setUserData(state, {item}){
    console.log(item);
    state['userData'] = item;
  },
  setProfileLoader(state, value){
    state['profileLoader'] = value;
  }
}

const actions = {
  getUserDataAPI({commit},username){
    let userDataUrl =`${API_ACCOUNTS_URL}user_detail/${username}`;
    commit('setProfileLoader', true);
    axios.get(userDataUrl).then((response)=>{

      console.log('setProfileLoader');
      console.log(response);
      let result = response.data;

      commit('setUserData',{item:result});
      commit('setProfileLoader', false);
    }, (error)=>{
      //error
      commit('setProfileLoader', false);
    });
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
