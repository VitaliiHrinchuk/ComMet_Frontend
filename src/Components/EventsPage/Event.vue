<template lang="html">
  <div class=" tempClass">
    <div class="loaderBg" v-if="isScreenLoader || eventMembersLoader">
      <div class="screenLoader">
        <div class="screenLoader screenLoader-inner"></div>
      </div>
    </div>
    <div v-if="!isScreenLoader">
      <users-list
      v-if='usersListActive'
      :usersData='eventMembers'
      :title='$lang.events.event_members_title'
      :note='$lang.events.event_members_note'
      @close-list= 'usersListActive = false'

      ></users-list>
      <div id="sticky" class="sticky" >
        <h1 class="sticky__title">{{eventData.name}}</h1>
        <button class="bigButton bigButton-header bigButton-capitalize shadow" type="button" name="button"
          v-if="eventData.author.username != currentUser && !eventData.is_current_member && !isEventOver"
          @click="joinEvent()"
          :disabled="joiningLoader">
          {{$lang.events.event_join_btn}}
          <span class="loader loader-buttonOutLeft" v-show="joiningLoader"></span></button>
          <button type="button"
            class="bigButton bigButton-leaveEvent"
            @click="leaveEvent"
            v-if="(eventData.is_current_member && !isEventOver)"
            >{{$lang.events.event_leave_btn}}
            <i class="fas fa-sign-out-alt"></i>
            <span class="loader loader-buttonOutLeft" v-show="joiningLoader"></span></button>
          </button>
        <span class="sticky__date">{{dateToString(eventData.date_expire)}}, {{eventData.time_begins}}</span>
      </div>
      <div class="eventHeader" id="eventHeader" ref="eventHeader" >
        <div class="eventHeader__title" v-if="!isScreenLoader">
          <h1 >{{eventData.name}} </h1>
          <div class="tag" v-for='tag in eventData.tags' >
            {{tag}}
          </div>
        </div>
        <button class="eventHeader__btn bigButton bigButton-capitalize shadow" type="button" name="button"
          v-if="eventData.author.username != currentUser && !eventData.is_current_member && !isEventOver"
          @click="joinEvent()"
          :disabled="joiningLoader">
          {{$lang.events.event_join_btn}}
          <span class="loader loader-buttonOutLeft" v-show="joiningLoader"></span>
        </button>
        <button type="button"
          class="eventHeader__btn bigButton bigButton-leaveEvent"
          @click="leaveEvent"
          v-if="(eventData.is_current_member && !isEventOver)"
          >{{$lang.events.event_leave_btn}}
          <i class="fas fa-sign-out-alt"></i>
          <span class="loader loader-buttonOutLeft" v-show="joiningLoader"></span></button>
        </button>
      </div>
      <div class="container eventContainer" v-if="!isScreenLoader">
        <div class="eventBox eventBox-place">
            <h2 class="eventBox__title">{{$lang.events.event_place}}</h2>
            <div class="eventBox__content">
              <p>{{eventData.city}}, {{eventData.country}}</p>
            </div>
            <button
              class="textButton"
              type="button"
              name="button"
              @click='openMap'
              >{{$lang.events.event_place_map}}</button>
        </div>

        <div class="modalWindow" v-if='isMapOpen'>
          <div class="modalWindow__content modalWindow__content-map">
            <div id="map" class="map">
              <l-map :zoom="zoom" :center="getGeoCoords" >
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="getGeoCoords" ></l-marker>
              </l-map>
            </div>
            <span class="modalWindow__close modalWindow__close-map" @click='isMapOpen = false'><i class="fas fa-times"></i></span>
          </div>
        </div>

        <div class="eventBox eventBox-date">
            <h2 class="eventBox__title"> {{$lang.events.events_date}}</h2>
            <span class="note note-event" v-if="isEventOver"><i class="fas fa-ban"></i> {{$lang.events.event_date_note}}</span>
            <div class="eventBox__content eventBox__content-date">
              <p>{{dateToString(eventData.date_expire)}}, {{eventData.time_begins}}</p>
            </div>

        </div>

        <div class="eventBox eventBox-author">
            <h2 class="eventBox__title">{{$lang.events.event_author}}</h2>
            <div class="eventBox__content">
              <div class="user">
                <div
                  class="roundImage roundImage-event"
                  :style="{ 'backgroundImage': 'url(\'' + getAvatarImage(eventData.author.avatar) + '\')' }" @click="showUserProfile(eventData.author.username)">
                </div>
                <div class="userRate">
                  <h3 class="fullName fullName-author" @click='showUserProfile(eventData.author.username)'>{{eventData.author.first_name}} {{eventData.author.last_name}}</h3>
                  <i v-for='rate in Math.floor(eventData.author.user_rate)*1' class="far fa-star userRate__star userRate__star-fill"></i>
                  <span class="note" v-if='Math.floor(eventData.author.user_rate)*1 == 0'>{{$lang.profile.rating_note}} </span>
                </div>
              </div>
            </div>
            <!-- <button class="textButton" type="button" name="button">Profile</button> -->
        </div>
        <div class="helpContainer">
          <div class="eventBox eventBox-desc">
              <h2 class="eventBox__title">{{$lang.events.event_description}}</h2>
              <div class="eventBox__content">
                <p>{{eventData.description}}</p>
                <span class="note" v-if='eventData.description == ""'> {{$lang.events.event_description_note}}</span>
              </div>
              <!-- <button class="textButton" type="button" name="button">More</button> -->
          </div>

          <!-- <div class="eventBox eventBox-plan">
              <h2 class="eventBox__title">Plan</h2>
              <div class="eventBox__content">
                <div class="arrowContainer">
                  <i class="arrowContainer__arrow arrowContainer__arrow-left fas fa-angle-left"></i>
                  <i class="arrowContainer__arrow arrowContainer__arrow-right fas fa-angle-right"></i>
                </div>
                <div class="planContainer">

                  <div class="plan plan-green shadow">
                    <h3 class="plan__time">8:00</h3>
                    <p class="plan__desc">Meeting</p>
                  </div>
                  <div class="plan plan-red shadow">
                    <h3 class="plan__time">10:00</h3>
                    <p class="plan__desc">Coffee</p>
                  </div>
                  <div class="plan plan-violet shadow">
                    <h3 class="plan__time">12:00</h3>
                    <p class="plan__desc">Go to the cinema</p>
                  </div>

                </div>
              </div>
          </div> -->
        </div>


        <div class="eventBox eventBox-members" v-if="1">
            <h2 class="eventBox__title">{{$lang.events.event_members}}</h2>
            <div class="eventBox__content">
              <div class="user user-list" v-for='member in randomMembers'>
                <div
                  class="roundImage roundImage-members"
                  :style="{ 'backgroundImage': 'url(\'' + getAvatarImage(member.avatar) + '\')' }" @click="showUserProfile(member.username)">
                </div>
                <h3 class="fullName" @click='showUserProfile(member.username)'>{{member.first_name}} {{member.last_name}}</h3>
              </div>

            </div>
            <div class="eventBox__members">
              <span>{{eventMembers.length}} {{eventData.members_count == 1 ? $lang.events.event_member : $lang.events.event_members}} {{$lang.global.of}} {{eventData.max_members}}</span>
              <button class="textButton" type="button" name="button" @click='openUsersList()'>{{$lang.global.more}}</button>
            </div>
            <router-link class="bigButton bigButton-members bigButton-capitalize bigButton-capitalize-small shadow" :to="{ name: 'chatRoom', params: {id: id} }">{{$lang.events.event_chat}}</router-link>
        </div>



      </div>
    </div>

  </div>

</template>

<script>

import ModalUsersList from '../ModalUsersList.vue';
import { L, LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  props:{
    id: {required: true}
  },
  components:{
    'users-list': ModalUsersList,
     LMap,
     LTileLayer,
     LMarker
  },
  data(){
    return {
      currentUser: this.$store.getters.getCurrentUser,

      eventMembers: [],
      eventMembersLoader: false,

      headerCoord: 0,
      usersListActive: false,
      zoom:8,
      url:'https://{s}-tiles.locationiq.org/v2/obk-en/r/{z}/{x}/{y}.png?key=1e4a846d952064',
  		// url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'',
      isMapOpen: false,

      joiningLoader: false,
      isAlreadyJoined: false
    }
  },
  computed:{
    topCoordinate(){
      return this.$el.getBoundingClientRect().top;
    },
    isScreenLoader(){
      return  this.$store.getters.getEventLoaderState;
    },
    eventData(){
      return this.$store.getters.getEventData;
    },
    randomMembers(){
      if(this.eventData.members_count > 6){
        return this.eventMembers[Math.floor(Math.random()*this.eventData.members_count)];
      } else {
        return this.eventMembers;
      }
    },

    getGeoCoords(){
      let coords = this.eventData.geo.split(' ');
      let lat = coords[0];
      let lon = coords[1];
      return L.latLng(lat, lon)
    },
    isEventOver(){
      let currentDate = Date.now();
      let eventDate = new Date(this.eventData.date_expire);
      eventDate.setHours(eventDate.getHours() + 24);
      return currentDate > eventDate;
    }
  },
  methods:{
    stickyHeader(){

      let stickyBlock = document.getElementById('sticky');
      let header = this.$refs.eventHeader;


      let sticky = 50 + header.offsetHeight;

      if(window.pageYOffset >= sticky){
        stickyBlock.classList.add('sticky-on');
      } else {
        stickyBlock.classList.remove('sticky-on');
      }
    },
    randomTagColor(){
      let rand = Math.floor(Math.random() * 100)%3;

      switch (rand) {
        case 0: return 'tag-red';
        case 1: return 'tag-green';
        case 2: return 'tag-violet';
        default: return '';
      }
    },
    dateToString(date){
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      let resultDate = new Date(date);

      return monthNames[resultDate.getMonth()] + ' ' +resultDate.getDate() ;
    },
    showUserProfile(username){
      this.$router.push(`/Profile/${username}`);
    },
    openUsersList(){
      this.usersListActive = true;
    },
    openMap(){
      this.isMapOpen = true;
    },
    refreshEventMebmers(id){
      this.$store.dispatch('getEventMembers', id).then(response=>{
        console.log("edge hello");
        this.eventmembersLoader = false;
        this.eventMembers = response;

      }, error=>{
        //error
      });
    },
    joinEvent(){
      console.log('joined');
      let url = `${this.$store.state.eventsUrl}${this.id}/add_follower/`;
      let params = {
        username: this.$store.getters.getCurrentUser
      }
      this.joiningLoader = true;
      this.$axios.patch(url,params).then(response=>{
        this.joiningLoader = false;
        this.eventData.is_current_member = true;
        console.log(response);
        this.refreshEventMebmers(this.id);
      }, error => {
        //error
        this.joiningLoader = false;
      });
    },
    leaveEvent(){
      let url = `${this.$store.state.eventsUrl}${this.id}/remove_follower/`;
      let params = {
        username: this.$store.getters.getCurrentUser
      }
      this.joiningLoader = true;
      this.$axios.patch(url,params).then(response=>{
        this.joiningLoader = false;
        this.eventData.is_current_member = false;
        console.log(response);
        this.refreshEventMebmers(this.id);
      }, error => {
        //error
        this.joiningLoader = false;
      });
    },
    getAvatarImage(url){
      return this.$store.state.imagesUrl + url;
    }
  },
  mounted(){

    this.$nextTick(()=>{
      window.addEventListener('scroll', this.stickyHeader);
    });

  },

  destroyed(){
    window.removeEventListener('scroll',this.stickyHeader);
  },

  created(){
    this.$store.dispatch('getEventDataAPI',this.id);
    this.eventmembersLoader = true;
    this.refreshEventMebmers(this.id);
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('getEventDataAPI',to.params.id);
    this.eventmembersLoader = true;
    this.refreshEventMebmers(to.params.id);
    // this.$store.dispatch('getEventMembers', to.params.id).then(response=>{
    //   this.eventmembersLoader = false;
    //   this.eventMembers = response;
    // }, error=>{
    //   //error
    // });
    next();
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
  .sticky{
    display: none;
    position: fixed;
    flex-wrap: wrap;
    top: 50px;
    margin-top: 0;
    width: 100%;
    background: #fff;
    z-index: 4;
    padding: 10px 10px;
    animation-name: sticky-out;
    animation-duration: .4s;
    &__title{
      font-weight: normal;

      font-size: 1.5em;
    }
    &__date{
      font-size: .8em;
      flex-basis: 100%;
      color: rgba(0,0,0,.6);
    }
    &-on{
      display: flex;
    }
  }
  @keyframes sticky-out{
      from{
        top: 0;
      } to {
        top: 50px
      }
  }

  .eventHeader{

    background: #fff;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 15px 15px;
    z-index: 1;
    &__title{

      h1{
        font-weight: normal;
        margin-bottom: 10px;
      }
    }


  }
  .helpContainer{
    width: 55%;
    order: 4;
  }
  .eventContainer{

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
  }
  .eventBox{
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    margin-top: 30px;
    padding: 16px 16px;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.2);
    &__title{
      // color: $primary-color;
      margin-bottom: 8px;
      font-size: .8em;
      text-transform: uppercase;
    }
    &__content{
      padding: 5px 0;
      margin-top: auto;
      margin-bottom: auto;
      overflow: hidden;
      position: relative;
      &-date{
        text-align: center;
      }
    }

    &__members{
      font-size: .85em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
    }
    &-place{
      width: calc(35% - 30px);
      order: 1;
    }
    &-date{
      width: calc(20% - 30px);
      order: 2;
    }
    &-author{
      width:  calc(30% - 30px);
      order: 3;
    }
    &-desc{
      // width: calc(60% - 30px);
      align-self: flex-start;

    }
    &-members{
      width:  calc(30% - 30px);
      align-self: flex-start;
      order: 5;
    }
    &-plan{
      // width: calc(60% - 30px);
      order: 6;
    }
  }


  .arrowContainer{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
    &__arrow{
      cursor: pointer;
      font-size: 2em;
      color: $primary-color;
      &-left{
        margin-right: auto;
      }
      &-right{
        margin-left: auto;
        right: 0;
      }
    }
  }
  .planContainer{
    display: flex;
    justify-content: flex-start;
    padding: 0 30px;
    width: 1000px;
    align-items: center;
    overflow: hidden;
    z-index: 999;
    &__arrow{
      font-size: 2em;
      color: $primary-color;
      cursor: pointer;
      &-left{
        margin-right: auto;
      }
      &-right{
        margin-left: auto;
      }
    }
  }

  .plan{
    min-width: 130px;
    margin-right: 15px;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    color: #fff;
    font-size: .9em;
    padding: 10px 10px;
    cursor: pointer;
    &-green{
      background: $green-color;
    }
    &-red{
      background: $red-color;
    }
    &-violet{
      background: $violet-color;
    }
    &-blue{
      background: $blue-color;
    }
    &__time{
      padding: 0;
      margin: 0;
    }
    &__desc{
      padding: 0;
      margin: 0;
    }
  }


  @media screen and (max-width: 1920px){

  }

  @media screen and (max-width: 1600px){


  }

  @media screen and (max-width: 1368px){

  }
  @media screen and (max-width: 1120px){
    .eventBox{
      font-size: .9em;
    }
  }
  @media screen and (max-width: 960px){
    .eventHeader{
      position: relative;
    }

    .userRate{
      font-size: .9em;

    }
    .bigButton{
      font-size: .9em;
    }
    .eventBox{
      font-size: .9em;
      &-place{
        width: calc(40% - 30px);
      }
      &-date{
        width: calc(30% - 30px);
      }
      &-author{
        width: calc(30% - 30px);

        .user{
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          &__avatar{
            margin-right: 0;
            float: none;
          }

        }
      }
      &-members{
        width: calc(40% - 30px);
      }
      &-desc{
        width: 100%;
      }
      &-plan{
        width: 100%;
      }
    }
    .helpContainer{
      width: calc(60% - 30px);
      margin-right: 30px;
    }
  }

  @media screen and (max-width: 768px){
    .eventHeader{
      position: relative;
      // margin-top: 30px;

      &__btn{
        width: 100%;
        margin-top: 10px;
        padding: 5px 0;
      }
    }
    .sticky{
      &-on{
        display: none;
      }
    }
    .eventBox{

      &-place{
        width: 100%;
        margin-right: 0;
      }
      &-date{
        width: 100%;
        margin-right: 0;
      }
      &-author{
        width: 100%;
        margin-right: 0;
      }
      &-members{
        width: 100%;
        margin-right: 0;
      }
      &-desc{
        width: 100%;
      }
      &-plan{
        width: 100%;
      }
    }
    .helpContainer{
      width: 100%;
      margin-right: 0;
    }
  }
  @media screen and (max-width: 560px){

  }


  @media screen and (max-width: 480px){

  }
</style>
