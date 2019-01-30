<template lang="html">
  <div class="ConfigHelper container">
    <h1 class="ConfigHelper__title">Lets us help you to configure your ComMet account</h1>
    <transition name="slideConfig" tag="div" mode="out-in">
    <div class="configSlide" v-if="currentSlide == 1" v-bind:key="1" >
      <h2 class="configSlide__title">Where do you live?</h2>
      <div class="configSlide__setting">
        <button class="placeSet__btn bigButton bigButton-small" type="button" name="button">Auto Check</button>
        <span class="choice">OR</span>
        <div class="placeSet__search">
          <input class="input " type="text" placeholder="City Name">
          <i class="fas fa-search input__icon " ></i>
          <div class="searchDrop" >
            <ul class="searchDrop__list">
              <li class="searchDrop__item searchDrop__item-w100" v-for='(result, index) in searcResults' :key='index' @click='toPlace(index)'>{{result.name}} , {{result.country}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="configSlide" v-if="currentSlide == 2" v-bind:key="2" >
      <h2 class="configSlide__title">What do you like?</h2>
      <div class="configSlide__setting">
        <div class="creationSection__container">
          <div class="creationSection__checkTag" v-for='tag in tagList'>
            <input class="checkTags" type="checkbox" :id='tag.name' :value="tag.name" v-model='selectedTags'>
            <label :for="tag.name">{{tag.name}}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="configSlide" v-if="currentSlide == 3" v-bind:key="3" >
      <h2 class="configSlide__title">How do you look like?</h2>
      <div class="configSlide__setting">
          <div
            class="configAvatar"
            :style="{ 'backgroundImage': 'url(\'' + avatar + '\')' }" >
          </div>
          <button class="bigButton bigButton-small" type="button" name="button">Change</button>
      </div>
    </div>
    </transition>
    <button
      class="bigButton bigButton-small ConfigHelper__next"
      type="button"
      name="next"
      v-if="currentSlide != 3"
      @click="nextSlide"
      >Next</button>
    <button
      class="bigButton bigButton-small ConfigHelper__next"
      type="button"
      name="finish"
      v-if="currentSlide == 3"
      @click="finishConfig()"
      >Finish</button>
    <button class="textButton ConfigHelper__skip" type="button" name="skip">Skip</button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      currentSlide: 1,


      avatar:require('../../assets/images/avatar__temp.jpg'),
      selectedTags: [],
    }
  },
  computed:{
    tagList(){
      return this.$store.getters.getTagsList;
    },
  },
  methods:{
    nextSlide(){
      this.currentSlide++;
    },
    finishConfig(){

    }
  },
  created(){
    this.$store.dispatch('getTagsListAPI');
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';

.ConfigHelper{
  background: #fff;
  padding-top: 30px;
  padding-bottom: 30px;
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  &__title{
    color: #565656;
    text-align: center;
    margin-bottom: 20px;
  }
  &__next{
    background: $accept-color;

  }
}
.configSlide{

  height: 300px;
  width: 60%;
  margin: 0 auto;
  &__title{
    text-align: center;
    color:$primary-color;
    font-weight: 400;
    margin-bottom: 30px;
  }
}
.placeSet{
  &__search{
    width: 50%;
    margin: 0 auto;
    position: relative;
  }
}
.choice{
  text-align: center;
  color: #565656;
  display: block;
  margin: 20px 0;
}
.configAvatar{
  position: relative;
  background-position: center center;
  background-color: gray;
  background-size: cover;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 20px auto;
  overflow: hidden;
}
</style>
