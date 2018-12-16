import axios from 'axios';
import router from '../../routes.js';

const API_EVENTS_URL = `https://comeandmeet.herokuapp.com/events/`;



const state = {
  eventsList: [],
  eventData: {},
  eventScreenLoader: true
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
  }
}

const mutations = {
  setEventsState(state, {type, item}){
    state[type] = item;
  },
  setEventLoader(state, value){
    state['eventScreenLoader'] = value;
  }
}

const actions = {
  refreshEventsList({commit}){

    commit('setEventLoader', true);
    axios.get(API_EVENTS_URL).then((response)=>{
      console.log('refreshEventsList');
      console.log(response);

      commit('setEventLoader', false);
      let list = response.data.results;

      let resultList = list.map((item)=>{
        let resultItem = {};
        resultItem.id = item.id;
        resultItem.name = item.name;
        resultItem.membersCount = item.members.length;
        resultItem.tags = item.tags;
        resultItem.date = item.date_expire;
        resultItem.city = item.city;
        // resultItem.authorUserName = item.attributes.author.username;
        // resultItem.authorFirstName = item.attributes.author.first_name;
        // resultItem.authorPhoto = item.attributes.author.avatar;
        return resultItem;
      });
      console.log(resultList);
      commit('setEventsState', {type:'eventsList', item:resultList});
    }, (error)=>{

      commit('setEventLoader', false);
      console.log(error.response.status);
      switch (error.response.status) {
        case 401: router.replace('/login/signIn');

          break;
        default:

      }
    });
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
