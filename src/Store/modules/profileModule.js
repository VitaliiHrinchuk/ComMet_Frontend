import axios from 'axios';
import router from '../../routes.js';

const API_ACCOUNTS_URL = `https://comeandmeet.herokuapp.com/accounts/`;

const state = {
  userData: {},
  profileLoader: true,
  isCurrentIsFollower: false
}

const getters = {
  getUserData(state){
    console.log('from store');
    return state.userData;
  },
  getProfileLoaderState(state){
    return state.profileLoader;
  },
  getIsFollowerState(state){
    return state.isCurrentIsFollower;
  }
}

const mutations = {
  setUserData(state, {item}){
    console.log(item);
    state['userData'] = item;
  },
  setProfileLoader(state, value){
    state['profileLoader'] = value;
  },
  setIsFollowerState(state, value){
    state['isCurrentIsFollower'] = value;
  }
}

const actions = {
  getUserDataAPI({state, commit, rootState},username){
    let userDataUrl =`${API_ACCOUNTS_URL}users/${username}`;
    commit('setProfileLoader', true);
    axios.get(userDataUrl).then((response)=>{

      axios.get(`${userDataUrl}/is_follower/`, {params: {'follower_username': rootState.currentUser}}).then(response=>{
        console.log('isFollower');
        console.log(response);

        if(response.data == 'follower'){
          commit('setIsFollowerState', true);
        } else if(response.data == 'not follower'){
          commit('setIsFollowerState', false);
        }

        commit('setProfileLoader', false);
      }, error=>{
        //error
        commit('setProfileLoader', false);
      });

      console.log('setProfileLoader');
      console.log(response);
      let result = response.data;
      commit('setUserData',{item:result});

    }, (error)=>{
      //error
      commit('setProfileLoader', false);

      switch (error.response.status) {
        case 401: router.replace('/login/signIn');
        case 404: router.replace('/404');
      }
    });
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
