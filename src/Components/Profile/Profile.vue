<template lang="html">
  <div class="">
    <div class="loaderBg" v-if="isScreenLoader && !editingProfile">
      <div class="screenLoader">
        <div class="screenLoader screenLoader-inner"></div>
      </div>
    </div>

    <modal
      v-if='isModalQuestion'
      :question='modalQuestion'
      @decline='isModalQuestion = false'
      @accept='unsubcribe()'
      @close-list='isModalQuestion = false'
    ></modal>
    <users-list
      v-if='usersListActive'
      :usersData='usersList'
      :title='usersListTitle'
      :note='usersListNote'
      :isLoader='isLocalLoader'
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

        <button
            class="mainInfo__subscribeBtn"
            type="button"
            name="button"
            v-if='!isCurrent && !isCurrentUserFollower'
            @click='subscribe()'
            :disabled='isSubscribeLoader'
            :class="{'disabledBtn':isSubscribeLoader}"
            >Follow</button>
        <div
            class="mainInfo__subscribedUser"
            v-if='isCurrentUserFollower'
            >subscribed
          <button
            @click='isModalQuestion = true'
            class="mainInfo__unsubscribeBtn"
            type="button"
            name="button"
            ><i class="fas fa-times"></i></button>
        </div>
        <div class="mainInfo__follows">
          <div class="follows follows-left" @click="getUserFollowers()">
            <h4 class="follows__count">{{userData.followers}}</h4>
            <p class="follows__text">Followers</p>
          </div>

          <div class="follows follows-right" @click="getUserFollowing()">
            <h4 class="follows__count">{{userData.following}}</h4>
            <p class="follows__text">Following</p>
          </div>
        </div>

        <div class="userRate">
          <h3 class="userRate__header userRate__header-profile">Rating</h3>
          <i v-for='rate in Math.floor(userData.user_rate)*1' class="far fa-star userRate__star userRate__star-fill"></i>
          <span class="note" v-if='Math.floor(userData.user_rate)*1 == 0'>Unrated yet </span>
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
import ModalQuestion from '../ModalQuestion.vue';


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
      usersListNote: '',
      isLocalLoader: false,
      isSubscribeLoader: false,
      isModalQuestion: false,


    }
  },

  components: {
    'user-info': UserInformation,
    'user-events': UserEvents,
    'user-photos': UserPhotos,
    'edit-profile':EditProfile,
    'users-list': ModalUsersList,
    'modal': ModalQuestion
  },
  computed: {
    userData(){
      return this.$store.getters.getUserData;
    },
    isCurrent(){
      return (this.$store.getters.getCurrentUser === this.userData.username ? true : false);
    },
    isCurrentUserFollower(){
      return this.$store.getters.getIsFollowerState;
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
    },
    modalQuestion(){
      return `You sure that you want unsubcribe ${this.userData.username}?`;
    }

  },
  methods: {
    selectTab(id){
      this.selectedTab = id;
    },
    openUsersList(type){
      if(type === 'followers'){
        this.usersListActive = true;
        this.usersListTitle = 'Followers';
        this.usersListNote = 'User has not followers yet';
      } else if(type === 'following') {
        this.usersListActive = true;
        this.usersListTitle = 'Following';
        this.usersListNote = 'User is not following anyone';
      }
    },
    closingEditing(){
      this.$store.dispatch('getUserDataAPI', this.userData.username);
      this.editingProfile = false;
    },
    getUserFollowers(){
      this.isLocalLoader = true;
      this.openUsersList('followers');
      this.$axios.get(`https://comeandmeet.herokuapp.com/accounts/users/${this.userData.username}/get_followers/`).then(response=>{
        console.log(response);
        this.usersList = response.data;

        this.isLocalLoader = false;
      }, error=>{
        this.isLocalLoader = false;
      });
    },
    getUserFollowing(){
      this.isLocalLoader = true;
      this.openUsersList('following');
      this.$axios.get(`https://comeandmeet.herokuapp.com/accounts/users/${this.userData.username}/get_following/`).then(response=>{
        console.log(response);
        this.usersList = response.data;

        this.isLocalLoader = false;
      }, error=>{
        this.isLocalLoader = false;
      });
    },
    subscribe(){
      this.isSubscribeLoader = true;
      let currentUser = this.$store.getters.getCurrentUser;
      let followingUser = {
        'following_username': this.userData.username
      };
      this.$axios.patch(`https://comeandmeet.herokuapp.com/accounts/users/${currentUser}/add_following/`, followingUser).then(response=>{
        console.log(response);
        this.isSubscribeLoader = false;
        if(response.data.status == 'ok'){
          this.$store.commit('setIsFollowerState', true);
        }
      }, error=>{
        //error
        this.isSubscribeLoader = false;
      });
    },
    unsubcribe(){

      this.isModalQuestion = false;

      let currentUser = this.$store.getters.getCurrentUser;
      let followingUser = {
        'following_username': this.userData.username
      };
      this.$axios.patch(`https://comeandmeet.herokuapp.com/accounts/users/${currentUser}/remove_following/`, followingUser).then(response=>{
        console.log(response);
        if(response.data.status == 'ok'){
          this.$store.commit('setIsFollowerState', false);
        }
      }, error=>{
        //error
        console.log(error.response);
      });
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
@import '../../assets/css/colors.scss';

.profile{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 30px;
  padding-bottom: 30px;
  max-height: 700px;
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
      position: relative;
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
    &__subscribedUser{
      position: relative;
      background: transparent;
      border-radius: 15px;
      border: 1px solid $primary-color;
      text-align: center;
      text-transform: uppercase;
      color: $primary-color;
      font-size: .8em;
      padding: 2px 10px;
      width: 100%;
      cursor: default;
      margin-bottom: 10px;
    }
    &__unsubscribeBtn{
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      color: $primary-color;
      cursor: pointer;
      overflow: hidden;
      border: none;
      border-left: 1px solid $primary-color;
      background: transparent
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
    overflow: auto;
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
    &__subscribedUser{
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
  }


}
@media screen and (max-width: 560px){
  .mainInfo{
    flex-basis: 100%;


    &__avatar{
      .userPhotos__img{
          margin-right: 0;
          width: 100%;
          height: 100%;
      }
    }
  }
  .userTable{
    font-size: .7em;
    margin-right: 0;
    &__col{
      padding-bottom: 5px;
    }
  }
}


@media screen and (max-width: 480px){

}

</style>
