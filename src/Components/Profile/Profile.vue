<template lang="html">
  <div class="container">
    <div class="profile">
      <div class="mainInfo profile__block shadow radius-5px">
        <img class="mainInfo__avatar" src="../../assets/images/avatar__temp.jpg" alt="avatar">
        <h2 class="mainInfo__realname">John Doe</h2>
        <h3 class="mainInfo__username">@johny19</h3>

        <button class="mainInfo__subscribeBtn" type="button" name="button">Follow</button>

        <div class="mainInfo__follows">
          <div class="follows follows-left">
            <h4 class="follows__count">35</h4>
            <p class="follows__text">Followers</p>
          </div>

          <div class="follows follows-right">
            <h4 class="follows__count">19</h4>
            <p class="follows__text">Following</p>
          </div>
        </div>

        <div class="userRate">
          <h3 class="userRate__header userRate__header-profile">Rating</h3>
          <i class="far fa-star userRate__star userRate__star-fill"></i>
          <i class="far fa-star userRate__star userRate__star-fill"></i>
          <i class="far fa-star userRate__star userRate__star-fill"></i>
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
            <user-info   v-show="selectedTab == 1" name="info"></user-info>
            <user-events v-show="selectedTab == 2" ></user-events>
            <user-photos v-show="selectedTab == 3" ></user-photos>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInformation from './UserInformation.vue';
import UserEvents from './UserEvents.vue';
import UserPhotos from './UserPhotos.vue';
export default {
  data(){
    return{
      selectedTab: '1'
    }
  },
  components: {
    'user-info': UserInformation,
    'user-events': UserEvents,
    'user-photos': UserPhotos
  },
  methods: {
    selectTab(id){
      this.selectedTab = id;
    }
  },
  created(){
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

}
@media screen and (max-width: 1120px){

}
@media screen and (max-width: 960px){

}

@media screen and (max-width: 768px){

}
@media screen and (max-width: 560px){

}


@media screen and (max-width: 480px){
  .mainInfo{
    flex-basis: 100%;
    margin-right: 0;
    margin-bottom: 30px;

    &__subscribeBtn{
      width: 70%;
    }

  }
  .detailInfo{
    flex-basis: 100%;
  }
  .userTable{
    margin-right: 0;
  }
}

</style>
