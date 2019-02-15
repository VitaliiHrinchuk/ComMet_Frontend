<template lang="html">
  <div class="ConfigHelper container">
    <div class="blockLoader" v-if="isDataSending">
      <div class="screenLoader">
        <div class="screenLoader screenLoader-inner"></div>
      </div>
    </div>
    <h1 class="ConfigHelper__title">Lets us help you to configure your ComMet account</h1>
    <transition name="slideConfig"  tag="div" mode="out-in">
    <div class="configSlide" v-if="currentSlide == 1" v-bind:key="1" >
      <h2 class="configSlide__title">Where do you live?</h2>
      <div class="configSlide__setting">
        <button class="placeSet__btn bigButton bigButton-small" type="button" name="button"
          @click="autoCheckPlace()"
          :disabled="autoSearchLoader"
          >Auto Check
          <span class="loader loader-buttonOut" v-if="autoSearchLoader"></span>
        </button>
        <span class="choice">OR</span>
        <div class="placeSet__search">
          <span class="loader loader-search" v-if="searchLoader"></span>
          <input id="placeInput" class="input " type="text" placeholder="City Name"
          v-model="searchCityPlace"
          @keyup.13="searchCity"
        >
          <i class="fas fa-search input__icon input__icon-map" @click="searchCity()" v-if="!searchLoader"></i>
          <div class="searchDrop" v-if="isSearchDrop">
            <ul id="dropList" class="searchDrop__list">
              <li class="searchDrop__item searchDrop__item-w100" v-if="searchCityResult.length == 0 && !searchLoader">No results</li>
              <li class="searchDrop__item searchDrop__item-w100" v-for='(result, index) in searchCityResult' :key='index' @click="selectCity(index)">{{result.name}} , {{result.country}}</li>
            </ul>
          </div>
        </div>
        <h2 class="placeSet__result" v-if="selectedCity != null">{{selectedCity.name}}, {{selectedCity.country}} </h2>
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
            class="roundImage"
            :style="{ 'backgroundImage': 'url(\'' + newAvatar + '\')' }"
            ref="avatarDemo" >
        </div>
        <input class="profileEdit__fileInput" type="file" accept="image/*" ref="imageInput" name="avatarInput" id="avatarInput" @change="uploadImage" >
        <label class="textButton textButton-avatarchange" for="avatarInput"><i class="fas fa-camera"></i> Change</label>
      </div>
    </div>
    <div class="configSlide" v-if="currentSlide == 4" v-bind:key="4" >
      <div class="configSlide__end">
        <h1>Good! </h1>
        <!-- <i class="fas fa-check"></i> -->
      </div>
      <h2 class="configSlide__title">Now you can use ComMet to the fullest!</h2>
      <div class="configSlide__setting configSlide__setting-links">

        <router-link class="bigButton bigButton-small" :to="{ name: 'Events'}" replace>Events</router-link>
        <router-link class="bigButton bigButton-small" :to="{ name: 'user', params: {username: currentUser}}" replace>Profile</router-link>

      </div>
    </div>
    </transition>
    <button
      class="bigButton bigButton-small ConfigHelper__next"
      type="button"
      name="next"
      v-if="currentSlide != 3 && currentSlide != 4"
      @click="nextSlide"
      :style="searchCityResult.length>0 && isSearchDrop ? {'zIndex': -1}: {'zIndex': 1} "
      :disabled="accessNext"
      >Next <i class="fas fa-arrow-right"></i></button>
    <button
      class="bigButton bigButton-small ConfigHelper__next"
      type="button"
      name="finish"
      v-if="currentSlide == 3"
      :disabled="!newAvatar"
      @click="finishConfig()"
      >Finish <i class="fas fa-check"></i></button>
      <modal
        v-if='isModalQuestion'
        :question='modalQuestion'
        @decline='isModalQuestion = false'
        @accept="skipConfigure()"
        @close-list='isModalQuestion = false'
      ></modal>
    <button class="textButton ConfigHelper__skip" type="button" name="skip" @click="isModalQuestion = true">Skip</button>
  </div>
</template>

<script>
import ModalQuestion from '../ModalQuestion.vue';
export default {
  components:{
    'modal': ModalQuestion
  },
  data(){
    return{
      currentSlide: 1,

      autoSearchLoader: false,
      searchLoader: false,
      isDataSending: false,

      searchCityResult: [],
      searchCityPlace: '',

      isSearchDrop: false,

      // avatar:require('../../assets/images/avatar__temp.jpg'),

      isModalQuestion: false,
      modalQuestion: "Are you sure you want to skip account setup? \n (You can always change your data in your profile)",


      selectedCity: null,
      selectedTags: [],
      newAvatar: null,
      currentUser: this.$store.getters.getCurrentUser
    }
  },
  computed:{
    tagList(){
      return this.$store.getters.getTagsList;
    },
    accessNext(){
      switch (this.currentSlide) {
        case 1: return this.selectedCity != null ? false : true;
        case 2: return this.selectedTags.length != 0 ? false : true;
        default: return true;
      }
    },
    userCurrentLocation(){

    }
  },
  methods:{
    nextSlide(){
      this.currentSlide++;
    },
    searchCity(){
      this.isSearchDrop = true;
      this.searchCityResult = [];
      let params = {
        key: '1e4a846d952064',
        q: this.searchCityPlace,
        limit: 10
      }

      let tempToken = this.$axios.defaults.headers.common['Authorization'];
      delete this.$axios.defaults.headers.common['Authorization'];

      this.searchLoader = true;
      this.$axios.get('https://api.locationiq.com/v1/autocomplete.php?', {params}).then((response)=>{
        console.log(response);
        this.searchLoader = false;
        response.data.forEach((item)=>{
          if(item.osm_type == 'relation'){
            this.searchCityResult.push({
              name: item.address.name,
              country: item.address.country,
              lat: item.lat,
              lon: item.lon
            });
          }
        });
      }, (error)=>{
        this.searchLoader = false;
      });

      this.$axios.defaults.headers.common['Authorization'] = tempToken;
    },
    selectCity(index){
      this.isSearchDrop = false;
      this.searchCityPlace = '';
      console.log("select");
      this.selectedCity = this.searchCityResult[index];
    },
    autoCheckPlace(){
      console.log("start");
      this.autoSearchLoader = true;
      this.$store.dispatch('checkUserCurrentLocation').then(response => {
        this.autoSearchLoader = false;
        this.selectedCity = {};
        this.selectedCity.name = response.city;
        this.selectedCity.country = response.country;
        console.log(response);
      }, error => {
        //error
      }) ;
    },
    finishConfig(){
        this.isDataSending = true;

        // let updObj = {
        //   'city':    this.selectedCity.name,
        //   'country': this.selectedCity.contry,
        //
        // };
        const USERS_URL = this.$store.state.API_USERS_URL;
        let newTagsArray = JSON.parse(JSON.stringify(this.selectedTags));
        let formData = new FormData();
        formData.append("city", this.selectedCity.name);
        formData.append("country", this.selectedCity.country);
        // formData.append("tags", newTagsArray);
        formData.append("avatar", this.newAvatar);
        // console.log(newTagsArray);
        this.$axios.patch(`${USERS_URL}${this.currentUser}/`, formData).then(response=>{

          console.log(response);
          this.$axios.patch(`${USERS_URL}${this.currentUser}/update_tags/`, { 'tags': newTagsArray }).then(response=>{
             this.isDataSending = false;
             this.currentSlide = 4;
           }, error=>{
                 //tags error
           });
        }, error=>{
          //error
        });
        // this.$axios.patch(`https://comeandmeet.herokuapp.com/accounts/users/${this.currentUser}/`, updObj).then(response=>{
        //   console.log(response);
        //   this.isDataSending = false;
        //
        //   console.log(this.selectedTags);
        //   let newTagsArray = JSON.parse(JSON.stringify(this.selectedTags));
        //   this.$axios.patch(`https://comeandmeet.herokuapp.com/accounts/users/${this.currentUser}/update_tags/`, { 'tags': newTagsArray }).then(response=>{
        //     console.log(response);
        //     this.isTagsSending = false;
        //     this.currentSlide = 4;
        //   }, error=>{
        //         //tags error
        //   });
        // }, error=>{
        //       //data error
        // });


    },
    uploadImage(){
      this.newAvatar = this.$refs.imageInput.files[0];
      let reader = new FileReader();
      reader.onload = e =>{
        console.log(e);
        this.$refs.avatarDemo.style.backgroundImage = "url(" + e.target.result + ")";
      }
      reader.readAsDataURL(this.newAvatar);
    },
    skipConfigure(){
      this.$router.push(`/Events`);
    },

    hideSearchDrop(e){
      let target = e.target;
      if(target !== document.getElementById('placeInput') &&
         target !== document.getElementById('searchDrop')){
           this.isSearchDrop = false;
         }
    }
  },

  created(){
    this.$store.dispatch('getTagsListAPI');
  },
  mounted(){
    document.addEventListener('click', this.hideSearchDrop);
  },
  destroyed(){
    document.removeEventListener('click', this.hideSearchDrop);
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
  overflow: hidden;
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
  &__setting{

    &-links{
      display: flex;
      justify-content: center;
      a{
        margin: 0 5px;
      }
    }
  }
  &__end{
    color: $green-color;
    font-size: 1.5em;
    text-align: center;
  }
}
.placeSet{
  &__search{
    width: 50%;
    margin: 0 auto;
    position: relative;
  }
  &__result{
    margin: 0 auto;
    text-align: center;
    font-weight: 400;
    margin-top: 20px;
    color: #565656;
  }
  &__btn{
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
@media screen and (max-width: 1920px){

}

@media screen and (max-width: 1600px){


}

@media screen and (max-width: 1368px){

}
@media screen and (max-width: 1120px){

}
@media screen and (max-width: 960px){
  .ConfigHelper{
    &__title{
      font-size: 1.2em;
    }
  }
  .configSlide{
    width: 100%;
    &__title{
      font-size: 1.1em;
    }

  }
  .placeSet{
    &__buttonm{
      font-size: 1em;
    }
    &__search{
      width: 50%;
    }
    &__result{
      font-size: 1.1em;
    }
  }
}

@media screen and (max-width: 768px){
  .placeSet{
    &__search{
      width: 50%;
    }
  }
}
@media screen and (max-width: 560px){
  .placeSet{
    &__search{
      width: 80%;
    }
  }
}


@media screen and (max-width: 480px){

}
</style>
