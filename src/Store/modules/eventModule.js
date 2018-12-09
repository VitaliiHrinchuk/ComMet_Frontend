import axios from 'axios';
import router from '../../routes.js';

const API_EVENTS_URL = `https://comeandmeet.herokuapp.com/events/`;



const state = {
  eventsList: [],
  eventData: {},
  screenLoader: true
}

const getters = {
  getEventsList(state){
    return state.eventsList;
  },
  getEventData(state){
    return state.eventData;
  },
  getLoaderState(state){
    return state.screenLoader;
  }
}

const mutations = {
  setState(state, {type, item}){
    state[type] = item;
  },
  setLoader(state, value){
    state['screenLoader'] = value;
  }
}

const actions = {
  refreshEventsList({commit}){

    let param = {
      page: 1,
      page_size: 6
    }

    axios.get(API_EVENTS_URL,param).then((response)=>{
      console.log(response);
      let list = response.data.data;

      let resultList = list.map((item)=>{
        let resultItem = {};
        resultItem.name = item.attributes.name;
        resultItem.membersCount = item.attributes.members.length;
        resultItem.tags = item.attributes.tags;
        resultItem.authorUserName = item.attributes.author.username;
        resultItem.authorFirstName = item.attributes.author.first_name;
        resultItem.authorPhoto = item.attributes.author.avatar;
        return resultItem;
      });
      console.log(resultList);
      commit('setState', {type:'eventsList', item:resultList});
    }, (error)=>{
      console.log(error.response);
    });
  },

  getEventDataAPI({commit}, id){
    let eventUrl = `${API_EVENTS_URL}${id}/`;
    commit('setLoader', true);
    axios.get(eventUrl).then((response)=>{
      commit('setState', {type: 'eventData', item:response.data.data});
      commit('setLoader', false);

    }, (error)=>{
      //error
      commit('setLoader', false);
    })
  }
}


export default {
  state,
  getters,
  mutations,
  actions
}
