<template lang="html">
  <div class="container">
    <div class="profileEdit radius-5px shadow">
      <div class="profileEdit__header">
        <img class="mainInfo__avatar" src="../../assets/images/avatar__temp.jpg" alt="avatar">
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
        <datepick class="profileEdit__datePick"
          v-model='newUserBirthday'
          :selectableYearRange='100'
          ></datepick>
      </div>
      <div class="profileEdit__input">
        <h3 class="input__title">Phone:</h3>
        <input class="input" type="text" name="" value="" v-model='newUserPhone'>
      </div>
      <div class="profileEdit__tags">
        <!-- <div class="tag tag-red">
          #{{tag}}
        </div> -->
        <div class="tag tag-green">
          #Talking
          <span class="tag__remove" @click='removeTag()'><i class="far fa-times-circle"></i></span>
        </div>
        <div class="tag tag-violet">
          #Walk
        </div>
        <div class="tag tag-green">
          #Talking
        </div>

      </div>
      <button class="bigButton profileEdit__btn-big" type="button" name="button" >Save</button>
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
      newUserTags: this.userInfo.tags
    }
  },
  methods:{
    removeTag(tag){

      this.newUserTags.filter((item)=>{
        return item !== tag;
      })
    }
  }
}
</script>

<style lang="scss">
$primary-color:#1ca9f0;
.profileEdit{
  width: 100%;
  margin-top: 30px;
  background: #fff;
  overflow: hidden;
  &__header{
    padding: 15px 0;
    margin-bottom: 30px;
    background: $primary-color;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

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
      background-color: #2DDAA5;
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
  }
}
</style>
