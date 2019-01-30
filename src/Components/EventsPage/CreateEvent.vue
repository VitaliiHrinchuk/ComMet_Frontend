<template lang="html">
  <div class="" style=''>
    <div class="creationHeader">
      <h1 class="creationHeader__title">Create New Event</h1>
      <h2 class="creationHeader__title creationHeader__title-small">Do it in few steps</h2>
    </div>
    <div id="1step" class="creationSection" v-if='currentStep >= 1'>
      <h3 class="creationSection__title">Step 1 of 4</h3>
      <i class="creationSection__icon creationSection__icon-red fas fa-map-marked-alt"></i>
      <h4 class="creationSection__desc">Where your event will be?</h4>
      <div class="creationData">
        <div class="creationData__data">{{place}}</div>
        <!-- <span class="input__title">Search city</span> -->

        <button class="bigButton bigButton-small" type="button" name="button" @click='isMapOpen = true'>Change</button>
        <div class="modalWindow" v-if='isMapOpen'>
          <div class="modalWindow__content modalWindow__content-map">
            <div id="map" class="map">

              <l-map :zoom="zoom" :center="center" @click='changeMarker' :options="{zoomControl: false}">
                <l-control position="topleft" >
                  <!-- <input class="input" type="text" placeholder="Search..." v-model='place' @change="searchCity()"> -->
                  <div class="eventSearch__input shadow radius-5px bg-white">
                    <input class="input input-map" type="text" name="" placeholder="Search..." v-model='searchPlace' @click.stop='' @keyup.13='searchCity()'>
                    <i class="fas fa-search input__icon input__icon-map" @click.stop="searchCity()"></i>
                    <div class="searchDrop" v-if='searcResults.length > 0' @click.stop=''>
                      <ul class="searchDrop__list">
                        <li class="searchDrop__item" v-for='(result, index) in searcResults' :key='index' @click='toPlace(index)'>{{result.name}} , {{result.country}}</li>
                      </ul>
                    </div>
                  </div>
                </l-control>
                <l-tile-layer :url="url" :attribution="attribution" ></l-tile-layer>
                <l-marker :lat-lng="mapMarker" ></l-marker>
              </l-map>

            </div>
            <span class="modalWindow__close modalWindow__close-maxzindex" @click='closeMap()'><i class="fas fa-times"></i></span>
          </div>
        </div>

      </div>
      <button
          class="creationSection__nextBtn textButton"
          type="button"
          name="button"
          @click='nextStep(2)'
          v-if='currentStep == 1'
          >Next</button>
    </div>

    <div id="2step" class="creationSection" v-show='currentStep >= 2'>
      <h3 class="creationSection__title">Step 2 of 4</h3>
      <i class="creationSection__icon creationSection__icon-orange far fa-calendar-alt"></i>
      <h4 class="creationSection__desc">When it will be?</h4>
      <div class="creationData creationData-date">
        <div class="creationData__data">{{dateToString}}</div>
        <datepick
        v-model="selectedDate"
        :pickTime="true"
        :format="'HH:mm YYYY-MM-DD'"
        :inputAttributes="{readonly: true}"
        ></datepick>
      </div>

      <span v-if='wrongDate' class="errorMsg">You cannot pick a date earlier than today</span>
      <button
          class="creationSection__nextBtn textButton"
          type="button"
          name="button"
          @click='nextStep(3)'
          v-if='currentStep == 2'
          >Next</button>
    </div>

    <div id="3step" class="creationSection" v-show='currentStep >= 3'>
      <h3 class="creationSection__title">Step 3 of 4</h3>
      <i class="creationSection__icon creationSection__icon-yellow fas fa-tags"></i>
      <h4 class="creationSection__desc">What will your event be about?</h4>

      <div class="creationSection__container">

        <div class="creationSection__checkTag" v-for='tag in tagList'>
          <input class="checkTags" type="checkbox" :id='tag.name' :value="tag.name" v-model='selectedTags'>
          <label :for="tag.name">{{tag.name}}</label>
        </div>

      </div>

      <button
          class="creationSection__nextBtn textButton"
          type="button"
          name="button"
          @click='nextStep(4)'
          v-if='currentStep == 3'
          >Next</button>
    </div>

    <div id="4step" class="creationSection" v-show='currentStep >= 4'>
      <h3 class="creationSection__title">Step 4 of 4</h3>
      <i class="creationSection__icon creationSection__icon-green far fa-comments"></i>
      <h4 class="creationSection__desc">Name your event and describe it</h4>

      <div class="creationData">
        <span class="input__title">Event Name</span>
        <input class="input creationData__text" type="text" placeholder="Name"
          v-model='eventName'>
        <span class="input__title">Event Description</span>
        <textarea class="input creationData__text creationData__text-area" v-model='eventDesc'></textarea>
          <!-- <input id="image-file" type="file" name="" value=""> -->
      </div>

      <button class="bigButton bigButton-center creationSection__finishBtn " type="button" :disabled="!allDataIsOk" @click='postEventData()'>Finish</button>
    </div>


  </div>

</template>

<script>
import DatePick from 'vue-date-pick';
import { L, LMap, LTileLayer, LMarker, LControl } from 'vue2-leaflet';

export default {
  data(){
    return {
      date: '',
      wrongDate: false,
      currentStep:1,
      selectedTags: [],
      time: '',
      eventName: '',
      eventDesc: '',


      //location data Data
      place: 'Not selected',
      placeCountry: '',
      placeCity:'',
      zoom:8,
      center: L.latLng(48.6208, 22.287883),
      url:'https://{s}-tiles.locationiq.org/v2/obk-en/r/{z}/{x}/{y}.png?key=1e4a846d952064',
  		// url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'',
      marker: {lat: 48.6208, lon: 22.287883},
      isMapOpen: false,
      searchPlace: '',
      searcResults: [],



    }
  },
  components: {
    "datepick":DatePick,
    LMap,
    LTileLayer,
    LMarker,
    LControl
  },
  computed:{
    selectedDate: {
      set(newDate){
        if(Date.parse(newDate) < Date.now()){
          this.wrongDate = true;
          this.date = this.getCurrentDate();
        } else {
          this.wrongDate = false;
          this.date = newDate;
        }
        console.log(newDate);
      },
      get(){
        return this.date;
      }
    },
    dateToString(){
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const weekday = new Array(7);
          weekday[0] =  "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";

      let arrayOfDate = this.date.split(' ');
      let time = arrayOfDate[0];
      let date = arrayOfDate[1];

      let resultDate = new Date(date);

      return time + ', ' + weekday[resultDate.getDay()] + ' ' +monthNames[resultDate.getMonth()] + ' ' + resultDate.getDate() + ', '+ resultDate.getFullYear();
    },
    tagList(){
      console.log(this.$store.getters.getTagsList);
      return this.$store.getters.getTagsList;
    },
    mapMarker(){
      return L.latLng(this.marker.lat, this.marker.lon);
    },
    geo(){
      return { lat: this.marker.lat,
               lon: this.marker.lng}
    },

    allDataIsOk(){
      if(this.date                != '' &&
         this.placeCity           != '' &&
         this.placeCountry        != '' &&
         this.eventName           != '' &&
         this.eventDesc           != '' &&
         this.selectedTags.length != 0 )
         {

           return true;
         } else {
           console.log(false);
           return false;
         }
    }
  },
  methods: {
    getCurrentDate(){
      let currentDate = new Date();
      return currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
    },
    searchCity(){
      this.searcResults = [];
      let params = {
        key: '1e4a846d952064',
        q: this.searchPlace,
        limit: 8
      }

      let tempToken = this.$axios.defaults.headers.common['Authorization'];
      delete this.$axios.defaults.headers.common['Authorization'];

      this.$axios.get('https://api.locationiq.com/v1/autocomplete.php?', {params}).then((response)=>{
        console.log(response);
        response.data.forEach((item)=>{
          if(item.osm_type == 'relation'){
            this.searcResults.push({
              name: item.address.name,
              country: item.address.country,
              lat: item.lat,
              lon: item.lon
            });
          }
        });
      }, (error)=>{

      });

      this.$axios.defaults.headers.common['Authorization'] = tempToken;
    },
    toPlace(index){
      let lat = this.searcResults[index].lat;
      let lon = this.searcResults[index].lon;
      this.place = this.searcResults[index].name;
      this.marker.lat = lat;
      this.marker.lon = lon;
      this.center = L.latLng(lat, lon);
      this.searcResults = [];
      this.searchPlace = '';

    },
    changeMarker(e){
      this.marker.lat = e.latlng.lat;
      this.marker.lon = e.latlng.lng;

      let params = {
        key: '1e4a846d952064',
        lat: this.marker.lat,
        lon: this.marker.lon,
        format: 'json',
        "accept-language": 'en'
      }

      let tempToken = this.$axios.defaults.headers.common['Authorization'];
      delete this.$axios.defaults.headers.common['Authorization'];

      this.$axios.get('https://eu1.locationiq.com/v1/reverse.php?', {params}).then((response)=>{
        let address = response.data.address;
        console.log(address);
        this.place = (address.road ? address.road + " " + (address.house_number || '') + ", " :'') + (address.city || address.village || address.state) + ', ' + address.country;

        this.placeCity = address.city || address.village || address.state;
        this.placeCountry = address.country;

      }, (error)=>{
        console.log(error);
      });
      this.$axios.defaults.headers.common['Authorization'] = tempToken;
    },
    nextStep(step){
      this.currentStep = step;
      console.log(step + "step");
      let currentSection = document.getElementById(step + "step");
      setTimeout(()=>{
        window.scroll({
            top: currentSection.getBoundingClientRect().top + window.pageYOffset,
            behavior: "smooth"
        });
      }, 0);

    },
    closeMap(){
      this.isMapOpen = false;
      this.center = L.latLng(this.marker.lat, this.marker.lon);
    },
    postEventData(){

      let arrayOfDate = this.date.split(' ');
      let time = arrayOfDate[0];
      let date = arrayOfDate[1];


      let axiosConfig = {
          headers: {
              'Content-Type': 'multipart/form-data',
          }
      };
      let formData = new FormData();
      console.log(document.getElementById("image-file").files[0]);
      formData.append('avatar',document.getElementById("image-file").files[0]);
      formData.append('name', this.eventName);
      formData.append('description', this.eventDesc);
      formData.append('time_begins', time);

      formData.append('tags', JSON.stringify(this.selectedTags));
      formData.append('avatar', formData);
      formData.append('date_expire', date);
      formData.append('city', 'Uzhgorod');
      formData.append('country', 'Ukraine');
      formData.append('geo', this.geo.lat + ' ' + this.geo.lon);
      let params = {
        'name': this.eventName,
        'description': this.eventDesc,
        'time_begins': time,
        'members': [],
        'tags': this.selectedTags,
        'avatar': formData,
        'date_expire': date,
        'city': 'Uzhgorod',
        'country': 'Ukraine',
        'geo': this.geo.lat + ' ' + this.geo.lon
      }

      this.$axios.post('https://comeandmeet.herokuapp.com/events/', formData, axiosConfig).then(response=>{
        console.log(response);
      }, error=>{
        //error
        console.log(error.response);
      });

    }

  },
  created(){
    this.date ='00:00 ' + this.getCurrentDate();
    this.$store.dispatch('getTagsListAPI');
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
.creationHeader{
  background-color: $primary-color;
  padding: 50px;
  &__title{
    font-size: 1.7em;
    color: #fff;
    text-transform: capitalize;
    text-align: center;
    padding: 8px 0;
    &-small{
      font-size: 1.2em;
      font-weight: normal;
    }
  }
}
.creationSection{
  background-color: #fff;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  &__title{
    color: $primary-color;
    font-weight: 500;
    font-size: 1.1em;
    margin-bottom: 15px;
  }

  &__icon{
    font-size: 60px;
    margin-bottom: 20px;

    &-red{
      color: #ff7fd6;
    }
    &-orange{
      color: #febe89;
    }
    &-yellow{
      color: #ffee7f;
    }
    &-green{
      color: #73F3C8;
      font-weight: bold;
    }
  }
  &__desc{
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 20px;
  }
  &__checkTag{
    position: relative;
    text-align: center;
    display: inline-block;
    margin-bottom: 10px;
    margin-right: 5px;
    font-size: 14px;

    label{
      cursor: pointer;
      color: $primary-color;
      padding: 3px 6px;
      border: 1px solid $primary-color;
      border-radius: 3px;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.05em;
      -webkit-touch-callout: none; /* iOS Safari */
    		-webkit-user-select: none; /* Safari */
    		 -khtml-user-select: none; /* Konqueror HTML */
    			 -moz-user-select: none; /* Firefox */
    				-ms-user-select: none; /* Internet Explorer/Edge */
    						user-select: none;
      &:after{
        opacity: 0;
        content: '';
        position: absolute;
        width: 9px;
        height: 4px;
        background: transparent;
        top: 8px;
        left: 9px;
        border: 2px solid $primary-color;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
      // &:before{
      //   background: black;
      //   opacity: 1;
      //   content: '';
      //   position: absolute;
      //   top: 1px;
      //   right: 0;
      //   padding: 1px;
      //   border-radius: 2px;
      //   width: 15px;
      //   height: 15px;
      // }
    }
  }
  &__nextBtn{
    align-self: center;
  }
  &__container{
    width: 400px;
    margin: 0 auto;
  }
  &__finishBtn{
    width: 150px;

    &:disabled{
      opacity: .3;
    }
  }
}
.creationData{
  width: 300px;
  margin-bottom: 25px;
  &__data{
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 20px;
    font-family: "Roboto";
  }

  &__text{
    margin-top: 5px;
    margin-bottom: 10px;
    resize: none;
    &-area{
      height: 150px;
    }
  }
  &-date{
    .vdpComponent.vdpWithInput > input {
      border-radius: 3px;
      border: 1px solid rgba(0,0,0,.2);
      width: 300px;
      height: 35px;
      margin-left: auto;
      padding: 5px 5px;
    }
  }
}
.creationSection__checkTag input[type=checkbox] {
    display: none;
    padding: 0;
    margin: 0;
}
.creationSection__checkTag input[type=checkbox]:checked label:after {
    opacity: 1;
}
.creationSection__checkTag input[type=checkbox]:checked + label{
    background: $primary-color;
    border-color: $primary-color;
    color: #fff;
}




@media screen and (max-width: 1368px){

}
@media screen and (max-width: 1120px){

}
@media screen and (max-width: 960px){

}

@media screen and (max-width: 768px){
  .creationSection{
    font-size: .8em;
  }
}
@media screen and (max-width: 560px){

}


@media screen and (max-width: 480px){
    .creationSection{

      &__container{
        width: 90%;
      }
    }
}
</style>
