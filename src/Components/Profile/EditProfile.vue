<template lang="html">
  <div class="container">
    <div class="profileEdit radius-5px shadow">

      <div class="blockLoader" v-if='isLoader'>
        <div class="screenLoader">
          <div class="screenLoader screenLoader-inner"></div>
        </div>
      </div>

      <div class="profileEdit__header">
        <button class="profileEdit__backBtn"  type="button" name="button" @click="$emit('close-edit')"><i class="fas fa-chevron-left"></i></button>
        <div class="mainInfo__avatar">
          <div
            class="userPhotos__img"
            :style="{ 'backgroundImage': 'url(\'' + avatar + '\')' }" >
            <i class="fas fa-search-plus"></i>

          </div>
        </div>
        <button type="button" name="button" class="profileEdit__btn"><i class="fas fa-camera"></i> Change</button>
      </div>

      <div class="profileEdit__input">
        <h3 class="input__title">First name:</h3>
        <input class="input" type="text" name="" value="" v-model='newUserFirstName'>
      </div>
      <div class="profileEdit__input">
        <h3 class="input__title">Last name:</h3>
        <input class="input" type="text" name="" value="" v-model='newUserLastName'>
      </div>
      <div class="profileEdit__input">
        <h3 class="input__title">City:</h3>
        <input class="input" type="text" name="" value="" v-model='newUserCity'>
      </div>
      <div class="profileEdit__input">
        <h3 class="input__title">Country:</h3>
        <input class="input" type="text" name="" value="" v-model='newUserCountry'>
      </div>
      <div class="profileEdit__input">
        <h3 class="input__title">Birthday:</h3>
        <datepick
          class="profileEdit__datePick"
          v-model='newUserBirthday'
          :selectableYearRange='100'
          :mobileBreakpointWidth='800'
          ></datepick>
      </div>
      <div class="profileEdit__tags">
        <div class="modalWindow"  v-if='isOpenTagList'>
          <div class="tagList radius-5px shadow">
            <span class="tagList__close" @click='isOpenTagList = false'><i class="fas fa-times"></i></span>
            <h2 class="tagList__title">Tags</h2>
            <div class="creationSection__checkTag" v-for='tag in tagList'>
              <input class="" type="checkbox" name="" :id='tag.name' :value="tag.name" v-model='newUserTags'>
              <label :for="tag.name">{{tag.name}}</label>
            </div>

          </div>
        </div>

        <!-- <div class="tag tag-red">
          #{{tag}}
        </div> -->
        <h3 class="profileEdit__title">Your Favourite Tags</h3>
        <div class="tag tag-green" v-for='tag in newUserTags'>
          {{tag}}
          <span class="tag__remove" @click='removeTag(tag)'><i class="far fa-times-circle"></i></span>
        </div>
        <div class="addTagBtn" @click = 'openTagList()'>
          Add Tag
        </div>
      </div>
      <button class="bigButton profileEdit__btn-big" type="button" name="button" @click='updateUserData()'>Save</button>
    </div>
  </div>
</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  props:{
    userInfo: {required: true}
  },
  components:{
    'datepick': DatePick,
  },
  data(){
    return{
      newUserBirthday: this.userInfo.date_of_birth,
      newUserFirstName: this.userInfo.first_name,
      newUserLastName: this.userInfo.last_name,
      newUserCity: this.userInfo.city,
      newUserCountry: this.userInfo.country,
      newUserPhone: this.userInfo.phone_number,
      newUserTags: [],
      avatar: require('../../assets/images/avatar__temp.jpg'),

      isUpdateEnd: false,
      isUpdateTagsEnd: false,
      isOpenTagList: false,
    }
  },
  computed:{
    isLoader(){
      if(this.isUpdateEnd || this.isUpdateTagsEnd){
        return true;
      } else {
        return false;
      }
    },
    tagList(){
      return this.$store.getters.getTagsList;
    },
  },
  methods:{
    removeTag(tag){

      this.newUserTags = this.newUserTags.filter((item)=>{
        return item !== tag;
      })
    },
    updateUserData(){

      this.isUpdateEnd     = true;
      this.isUpdateTagsEnd = true;

      let updObj = {
        'first_name':     this.newUserFirstName,
        'last_name':      this.newUserLastName,
        'date_of_birth':  this.newUserBirthday,
        'city':           this.newUserCity,
        'country':        this.newUserCountry,

      };
      this.$axios.patch(`https://comeandmeet.herokuapp.com/accounts/users/${this.userInfo.username}/`, updObj).then(response=>{
        console.log(response);
        this.isUpdateEnd = false;
      }, error=>{
        //error
      });
      console.log(this.newUserTags);
      let newTagsArray = JSON.parse(JSON.stringify(this.newUserTags));
      this.$axios.patch(`https://comeandmeet.herokuapp.com/accounts/users/${this.userInfo.username}/update_tags/`, { 'tags': newTagsArray }).then(response=>{
        console.log(response);
        this.isUpdateTagsEnd = false;

      }, error=>{
        //error
      })
    },
    openTagList(){
      this.$store.dispatch('getTagsListAPI');
      this.isOpenTagList = true;
    }
  },
  created(){

    for ( let tag in this.userInfo.tags){
      this.newUserTags.push(this.userInfo.tags[tag].name);
    }
    window.scrollTo(0,0);

  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
.profileEdit{
  position: relative;
  width: 100%;
  margin-top: 30px;
  background: #fff;
  overflow: hidden;
  margin-bottom: 15px;
  &__header{
    padding: 15px 0;
    margin-bottom: 30px;
    background: $primary-color;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

  }
  &__title{
    font-weight: normal;
    margin: 10px 0;
    margin-left: 5px;
  }
  &__img{
    border-radius: 50%;
    cursor: auto;
    margin-bottom: 0;
    &:after {
      background: none;
    }
  }
  &__backBtn{
    align-self: flex-start;
    margin-left: 15px;
    background: transparent;
    border: none;
    color: #fff;
    display: block;
    font-size: 1.4em;
    cursor: pointer;
  }
  &__btn{
    color: #fff;
    border: none;
    background: transparent;
    align-self: center;
    cursor: pointer;
    font-size: .9em;
    margin-top: 5px;
    border-radius: 5px;
    padding: 4px 8px;

    &-big{
      height: auto;
      width: auto;
      font-weight: normal;
      font-size: 1em;
      padding: 5px 10px;
      margin: 0 auto;
      display: block;
      background-color: $green-color;
      margin-bottom: 10px;
    }
    &:hover{
      background: transparentize(#fff, .9);
    }
    &:focus{
      background: transparentize(#fff, .9);
    }
  }
  &__datePick{
    margin-left: auto;
  }
  &__input{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    margin-bottom: 15px;
    padding-left: 20px;
    .input{
      width: 300px;
      height: 25px;
      margin-left: auto;

    }

    .vdpComponent.vdpWithInput > input {
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,.2);
      width: 300px;
      height: 25px;
      margin-left: auto;
      padding: 5px 5px;
    }

  }
  &__tags{
    padding: 15px 15px;
    font-size: .9em;
    width: 50%;

    .tag:hover .tag__remove{
      display: block;
    }
  }
}




@media screen and (max-width: 1368px){

}
@media screen and (max-width: 1120px){

}
@media screen and (max-width: 960px){
  .profileEdit{
    font-size: .8em;
    &__input{
      width: 60%;
      padding-right: 20px;
      .input{
        width: 180px;
      }
      .vdpComponent.vdpWithInput > input{
        width: 180px;
      }
    }

    &__tags{
      width: 100%;
      font-size: 1.1em;
    }
  }
}

@media screen and (max-width: 768px){
  .profileEdit{
    &__input{
      width: 100%;

    }
  }
}
@media screen and (max-width: 560px){

}


@media screen and (max-width: 480px){

}
</style>
