import axios from 'axios';
import router from '../../routes.js';

const API_ACCOUNTS_URL = `https://comeandmeet.herokuapp.com/accounts/`;

const state = {
  userData: {},
  screenLoader: true,
}

const getters = {
  getUserData(state){
    return state.userData;
  },
  getLoaderState(state){
    return state.screenLoader;
  }
}

const mutations = {
  setUserData(state, {item}){
    console.log(item);
    state['userData'] = item;
  },
  setLoader(state, value){
    state['screenLoader'] = value;
  }
}

const actions = {
  getUserDataAPI({commit},username){
    let userDataUrl =`${API_ACCOUNTS_URL}user_detail/${username}`;
    commit('setLoader', true);
    axios.get(userDataUrl).then((response)=>{


      console.log(response);
      let result = response.data.data;

      commit('setUserData',{item:result});
      commit('setLoader', false);
    }, (error)=>{
      //error
      commit('setLoader', false);
    });
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
