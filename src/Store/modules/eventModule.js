import axios from 'axios';
import router from '../../routes.js';

const API_EVENTS_URL = `https://comeandmeet.herokuapp.com/events/`;



const state = {
  eventsList: [],
  loadEventsUrl: `${API_EVENTS_URL}get_not_expired/?limit=3&offset=0`,
  eventListLoader: false,
  eventData: {},
  eventScreenLoader: true,


  eventFilterProperties:{
    
  }
}

const getters = {
  getEventsList(state){
    return state.eventsList;
  },
  getEventData(state){
    return state.eventData;
  },
  getEventLoaderState(state){
    return state.eventScreenLoader;
  },
  getEventListLoaderState(state){
    return state.eventListLoader;
  }
}

const mutations = {

  setEventData(state, value){
    state['eventData'] = value;
  },
  setMembersData(state, value){
    state['eventData'].members = value;
  },
  setEventLoader(state, value){
    state['eventScreenLoader'] = value;
  },
  pushEventList(state, data){
    state['eventsList'] = state['eventsList'].concat(data);
  },
  clearEventList(state){
    state['eventsList'] = [];
  },
  updateEventsUrl(state, newUrl){
    state['loadEventsUrl'] = newUrl;
  },
  setEventListLoader(state, value){
    state['eventListLoader'] = value;
  }
}

const actions = {

  refreshEventsList({state, commit}){

    commit('setEventListLoader', true);
    if(state.loadEventsUrl){


      axios.get(state.loadEventsUrl).then((response)=>{
        console.log('refreshEventsList');
        console.log(response);

        let list = response.data.results;

        let resultList = list.map((item)=>{
          let resultItem = {};
          resultItem.id = item.id;
          resultItem.name = item.name;
          resultItem.membersCount = item.members_count;
          resultItem.tags = item.tags;
          resultItem.date = item.date_expire;
          resultItem.city = item.city;
          resultItem.avatar = item.avatar;
          return resultItem;
        });

        commit('setEventLoader', false);
        commit('setEventListLoader', false);
        commit('pushEventList', resultList);
        commit('updateEventsUrl', response.data.next);
      }, (error)=>{

        commit('setEventListLoader', false);
        commit('setEventLoader', false);
        console.log(error.response.status);
        switch (error.response.status) {
          case 401: router.replace('/login/signIn');
        }
      });
    } else {
      commit('setEventListLoader', false);
    }
  },

  getEventDataAPI({commit}, id){
    let eventUrl = `${API_EVENTS_URL}${id}/`;
    commit('setEventLoader', true);
    axios.get(eventUrl).then((response)=>{
      console.log('getEventDataAPI');
      console.log(response.data);
      commit('setEventData', response.data);


      axios.get(`${eventUrl}get_members`).then((response)=>{
        console.log(response);
        commit('setEventLoader', false);
        commit('setMembersData', response.data);
      }, (error)=>{
        // error
      });

    }, (error)=>{
      //error
      commit('setEventLoader', false);
      console.log(error);
      switch (error.response.status) {
        case 401: router.replace('/login/signIn');
        case 404: router.replace('/404');
      }
    })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
