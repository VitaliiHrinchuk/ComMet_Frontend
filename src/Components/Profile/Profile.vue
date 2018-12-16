<template lang="html">
  <div class="">
    <div class="loaderBg" v-if="isScreenLoader && !editingProfile">
      <div class="screenLoader">
        <div class="screenLoader screenLoader-inner"></div>
      </div>
    </div>

    <!-- <div class="modalWindow">
      <div class="modalWindow__content radius-5px">
        <h1 class="modalWindow__title">Followers</h1>
          <span class="note" v-if='userData.followers.length == 0'>User has not followers yet</span>
          <div class="user user-list" v-for='user in userData.followers'>
            <img class="user__avatar" src="../../assets/images/temp-avatar.jpg" alt="">
            <div class="user__nameBlock">
              <h3 class="fullName" @click='showUserProfile(user.username)'>{{user.first_name}}  {{user.last_name}}</h3>
              <span class="username">@{{user.username}}</span>
            </div>

          </div>
      </div>
    </div> -->
    <users-list
    v-if='usersListActive'
    :usersData='usersList'
    :title='usersListTitle'
    :note='usersListNote'
    @close-list= 'usersListActive = false'

    ></users-list>
    <div class="profile container" v-if="!isScreenLoader && !editingProfile">
      <div class="mainInfo profile__block shadow radius-5px">
        <div class="mainInfo__avatar">
          <div
            class="userPhotos__img"
            :style="{ 'backgroundImage': 'url(\'' + avatar + '\')' }" >
            <i class="fas fa-search-plus"></i>

          </div>
        </div>
        <h2 class="mainInfo__realname">{{userData.first_name}} {{userData.last_name}}</h2>
        <h3 class="mainInfo__username">@{{userData.username}}</h3>

        <button class="mainInfo__subscribeBtn" type="button" name="button" v-if='!isCurrent'>Follow</button>

        <div class="mainInfo__follows">
          <div class="follows follows-left" @click="openUsersList('followers')">
            <h4 class="follows__count">{{userData.followers.length}}</h4>
            <p class="follows__text">Followers</p>
          </div>

          <div class="follows follows-right" @click="openUsersList('following')">
            <h4 class="follows__count">{{userData.following.length}}</h4>
            <p class="follows__text">Following</p>
          </div>
        </div>

        <div class="userRate">
          <h3 class="userRate__header userRate__header-profile">Rating</h3>
          <i v-for='rate in Math.floor(userData.user_rate.rate)*1' class="far fa-star userRate__star userRate__star-fill"></i>
          <span class="note" v-if='Math.floor(userData.user_rate.rate)*1 == 0'>Unrated yet </span>
        </div>
      </div>
      <div class="detailInfo shadow radius-5px">

        <ul class="tabs">
          <li class="tabs__item"
              v-on:click='selectTab(1)'
              v-bind:class="{'tabs__item-active' : selectedTab == 1}">Information</li>
          <li class="tabs__item"
              v-on:click='selectTab(2)'
              v-bind:class="{'tabs__item-active' : selectedTab == 2}">Events</li>
          <li class="tabs__item"
              v-on:click='selectTab(3)'
              v-bind:class="{'tabs__item-active' : selectedTab == 3}">Photos</li>
        </ul>

        <div class="detailInfo__content">
            <user-info   v-show="selectedTab == 1" v-bind:userInfo="userDetailInfo" @edit-profile='editingProfile = true'></user-info>
            <user-events v-show="selectedTab == 2" v-bind:userEvents="{visited: userData.events_visited, created: userData.events_created}"></user-events>
            <user-photos v-show="selectedTab == 3" ></user-photos>
        </div>
      </div>

    </div>
    <edit-profile :userInfo='userDetailInfo' v-if='editingProfile' @close-edit='closingEditing()'></edit-profile>

  </div>
</template>

<script>
import UserInformation from './UserInformation.vue';
import UserEvents from './UserEvents.vue';
import UserPhotos from './UserPhotos.vue';
import EditProfile from './EditProfile.vue';
import ModalUsersList from '../ModalUsersList.vue';



export default {
  props:{
    username: {required: true}
  },
  data(){
    return{
      selectedTab: '1',
      editingProfile:false,
      avatar: require('../../assets/images/avatar__temp.jpg'),
      usersListActive: false,
      usersList: {},
      usersListTitle: '',
      usersListNote: ''
      // isCurrent: (this.$store.getters.getCurrentUser === this.userData.username ? true : false),
    }
  },

  components: {
    'user-info': UserInformation,
    'user-events': UserEvents,
    'user-photos': UserPhotos,
    'edit-profile':EditProfile,
    'users-list': ModalUsersList
  },
  computed: {
    userData(){
      return this.$store.getters.getUserData;
    },
    isCurrent(){
      return (this.$store.getters.getCurrentUser === this.userData.username ? true : false);
    },
    isScreenLoader(){
      return this.$store.getters.getProfileLoaderState;
    },
    userDetailInfo(){
      return {
        'avatar':       this.userData.avatar,
        'date_of_birth':this.userData.date_of_birth,
        'email':        this.userData.email,
        'first_name':   this.userData.first_name,
        'last_name':    this.userData.last_name,
        'city':         this.userData.city,
        'country':      this.userData.country,
        'phone_number': this.userData.phone_number,
        'username':     this.userData.username,
        'tags':         this.userData.tags.filter(item=>item.name),
        'isCurrent':    this.isCurrent
      }
    }

  },
  methods: {
    selectTab(id){
      this.selectedTab = id;
    },
    openUsersList(type){
      if(type === 'followers'){
        this.usersListActive = true;
        this.usersList = this.userData.followers;
        this.usersListTitle = 'Followers';
        this.usersListNote = 'User has not followers yet';
      } else if(type === 'following') {
        this.usersListActive = true;
        this.usersList = this.userData.following;
        this.usersListTitle = 'Following';
        this.usersListNote = 'User is not following anyone';
      }
    },
    closingEditing(){
      this.$store.dispatch('getUserDataAPI', this.userData.username);
      this.editingProfile = false;
    }
  },
  created(){
    this.$store.dispatch('getUserDataAPI', this.username);
    console.log(this.isCurrent);
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('getUserDataAPI', to.params.username);
    this.editingProfile = false;
    next();
  }
}
</script>

<style lang="scss">
$primary-color: #1ca9f0;
$green-color: #2DDAA5;
$red-color: #FF00AE;
$violet-color: #B34EE9;
$blue-color: #3AE2CE;

.profile{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 30px;
  padding-bottom: 30px;
  &__block{
    background: #fff;
    padding: 30px 15px;
  }
}
  .mainInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
    width: calc(19% - 30px);
    margin-right: 30px;

    &__avatar{
      width: 110px;
      height: 110px;
      border-radius: 50%;
      overflow: hidden;
    }
    &__realname{
      font-size: 1.1em;
      font-weight: normal;
      margin-bottom: 5px;
    }
    &__username{
      font-size: .8em;
      font-weight: normal;
      color: #b2b2b2;
      margin-bottom: 15px;
    }
    &__subscribeBtn{
      background: #00ffa9;
      border: none;
      color: #fff;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 15px;
      width: 100%;
      height: 23px;
      cursor: pointer;
      margin-bottom: 10px;
    }
    &__follows{
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }
  }

  .follows{
    cursor: pointer;
    &-left{
      margin-right: 15px;
    }
    &-right{
      margin-left: 15px;
    }
    &__count{
      text-align: center;
      font-size: 1.3em;
      font-weight: normal;
    }
    &__text{
      text-align: center;
      font-size: .5em;
      text-transform: uppercase;
    }
  }
  .detailInfo{
    background: #fff;
    width: 70%;

    &__content{
      padding: 15px 35px;
    }
  }
  .tabs{
    list-style: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #cecccc;
    display: flex;

    &__item{
      padding: 10px 10px;
      text-align: center;
      font-size: .8em;
      cursor: pointer;
      transition: all .3s ease;
      &-active{
        color: $primary-color;
        border-bottom: 1px solid $primary-color;
      }
      &:hover{
        color: $primary-color;
        border-bottom: 1px solid $primary-color;
      }
    }
  }



@media screen and (max-width: 1920px){

}

@media screen and (max-width: 1600px){


}

@media screen and (max-width: 1368px){
  .mainInfo{
    flex-basis: calc(20% - 30px);
  }
}
@media screen and (max-width: 1120px){
  .mainInfo{
    flex-basis: calc(30% - 30px);

    margin-bottom: 30px;

    &__subscribeBtn{
      width: 70%;
    }
  }
  .detailInfo{
    flex-basis: 70%;
  }
  .userTable{
    margin-right: 0;
  }
}
@media screen and (max-width: 960px){
  .mainInfo{
    flex-basis: 50%;
    margin-right: 0;
    margin-bottom: 30px;

    &__subscribeBtn{
      width: 70%;
    }
  }
  .detailInfo{
    flex-basis: 100%;
  }
}

@media screen and (max-width: 768px){
  .mainInfo{
    flex-basis: 80%;
    margin-right: 0;
    margin-bottom: 30px;

    &__subscribeBtn{
      width: 70%;
    }
  }

}
@media screen and (max-width: 560px){
  .mainInfo{
    flex-basis: 100%;
    margin-right: 0;
    margin-bottom: 30px;

    &__subscribeBtn{
      width: 70%;
    }

  }
  .userTable{
    margin-right: 0;
  }
}


@media screen and (max-width: 480px){

}

</style>
