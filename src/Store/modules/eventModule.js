import axios from 'axios';
import router from '../../routes.js';

const API_EVENTS_URL = `https://comeandmeet.herokuapp.com/events/`;



const state = {
  eventsList: [],
  loadEventsUrl: `${API_EVENTS_URL}?limit=3&offset=0`,
  eventListLoader: false,
  eventData: {},
  eventScreenLoader: true,

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
  setEventsState(state, {type, item}){
    state[type] = item;
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
        commit('setEventLoader', false);
        commit('setEventListLoader', false);
        let list = response.data.results;

        let resultList = list.map((item)=>{
          let resultItem = {};
          resultItem.id = item.id;
          resultItem.name = item.name;
          resultItem.membersCount = item.members.length;
          resultItem.tags = item.tags;
          resultItem.date = item.date_expire;
          resultItem.city = item.city;
          return resultItem;
        });
        commit('pushEventList', resultList);
        commit('updateEventsUrl', response.data.next);
      }, (error)=>{
        console.log(error);
        commit('setEventListLoader', false);
        commit('setEventLoader', false);
        console.log(error.response.status);
        switch (error.response.status) {
          case 401: router.replace('/login/signIn');

            break;
          default:

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
      commit('setEventsState', {type: 'eventData', item:response.data});
      commit('setEventLoader', false);

    }, (error)=>{
      //error
      commit('setEventLoader', false);
    })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
