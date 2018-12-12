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



    axios.get(API_EVENTS_URL).then((response)=>{
      console.log(response);
      let list = response.data.data;

      let resultList = list.map((item)=>{
        let resultItem = {};
        resultItem.id = item.id;
        resultItem.name = item.attributes.name;
        resultItem.membersCount = item.relationships.members.data.length;
        resultItem.tags = item.relationships.tags.data;
        resultItem.date = item.attributes.date_expire;
        // resultItem.authorUserName = item.attributes.author.username;
        // resultItem.authorFirstName = item.attributes.author.first_name;
        // resultItem.authorPhoto = item.attributes.author.avatar;
        return resultItem;
      });
      console.log(resultList);
      commit('setEventsState', {type:'eventsList', item:resultList});
    }, (error)=>{
      console.log(error.response);
    });
  },

  getEventDataAPI({commit}, id){
    let eventUrl = `${API_EVENTS_URL}${id}/`;
    commit('setEventLoader', true);
    axios.get(eventUrl).then((response)=>{
      commit('setEventsState', {type: 'eventData', item:response.data.data});
      commit('setEventLoader', false);
      console.log(response.data.data);
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
