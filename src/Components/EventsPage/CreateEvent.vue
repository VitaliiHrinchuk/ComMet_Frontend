<template lang="html">
  <div class="" style=''>
    <div class="loaderBg loaderBg-transparent" v-if="isDataUploading">
      <div class="screenLoader">
        <div class="screenLoader screenLoader-inner"></div>
      </div>
    </div>
    <div class="creationHeader">
      <h1 class="creationHeader__title">{{$lang.events.create_title}}</h1>
      <h2 class="creationHeader__title creationHeader__title-small">{{$lang.events.create_title_2}}</h2>
    </div>
    <div id="1step" class="creationSection" v-if='currentStep >= 1'>
      <h3 class="creationSection__title">{{$lang.events.create_step}} 1 {{$lang.global.of}} 5</h3>
      <i class="creationSection__icon creationSection__icon-red fas fa-map-marked-alt"></i>
      <h4 class="creationSection__desc">{{$lang.events.create_subtitle_place}}</h4>
      <div class="creationData">
        <div class="creationData__data creationData__data-place">{{isPlaceLoading ? '' : place}}
          <div class="dotLoader dotLoader-center" v-if="isPlaceLoading">
            <div class="dot dot1"></div>
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
            <div class="dot dot4"></div>
          </div>
        </div>
        <!-- <span class="input__title">Search city</span> -->

        <button class="bigButton bigButton-small" type="button" name="button" @click='isMapOpen = true'>Change</button>
        <div class="modalWindow" v-if='isMapOpen'>
          <div class="modalWindow__content modalWindow__content-map">
            <div id="map" class="map">

              <l-map :zoom="zoom" :center="center" @click='changeMarker' :options="{zoomControl: false}">
                <l-control position="topleft" >
                  <!-- <input class="input" type="text" placeholder="Search..." v-model='place' @change="searchCity()"> -->
                  <div class="eventSearch__input shadow radius-5px bg-white">
                    <input class="input input-map" type="text" name="" :placeholder="$lang.global.search" v-model='searchPlace' @click.stop='' @keyup.13='searchCity()'>
                    <span class="loader loader-search" v-if="isSearchLoading"></span>
                    <i class="fas fa-search input__icon input__icon-map" @click.stop="searchCity()" v-if="!isSearchLoading"></i>
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
            <span class="modalWindow__close  modalWindow__close-map" @click='closeMap()'><i class="fas fa-times"></i></span>
          </div>
        </div>

      </div>
      <button
          class="creationSection__nextBtn textButton"
          type="button"
          name="button"
          @click='nextStep(2)'
          v-if='currentStep == 1'
          >{{$lang.global.next}}</button>
    </div>

    <div id="2step" class="creationSection" v-show='currentStep >= 2'>
      <h3 class="creationSection__title">{{$lang.events.create_step}} 2 {{$lang.global.of}} 5</h3>
      <i class="creationSection__icon creationSection__icon-orange far fa-calendar-alt"></i>
      <h4 class="creationSection__desc">{{$lang.events.create_subtitle_date}}</h4>
      <div class="creationData creationData-date">
        <div class="creationData__data">{{dateToString}}</div>
        <datepick
        v-model="selectedDate"
        :pickTime="true"
        :format="'HH:mm YYYY-MM-DD'"
        :inputAttributes="{readonly: true}"
        ></datepick>
      </div>

      <span v-if='wrongDate' class="errorMsg">{{$lang.events.create_date_error}}</span>
      <button
          class="creationSection__nextBtn textButton"
          type="button"
          name="button"
          @click='nextStep(3)'
          v-if='currentStep == 2'
          >{{$lang.global.next}}</button>
    </div>

    <div id="3step" class="creationSection" v-show='currentStep >= 3'>
      <h3 class="creationSection__title">{{$lang.events.create_step}} 3 {{$lang.global.of}} 5</h3>
      <i class="creationSection__icon creationSection__icon-yellow fas fa-tags"></i>
      <h4 class="creationSection__desc">{{$lang.events.create_subtitle_tags}}</h4>

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
          >{{$lang.global.next}}</button>
    </div>

    <div id="4step" class="creationSection" v-show='currentStep >= 4'>
      <h3 class="creationSection__title">{{$lang.events.create_step}} 4 {{$lang.global.of}} 5</h3>
      <i class="creationSection__icon creationSection__icon-green far fa-comments"></i>
      <h4 class="creationSection__desc">{{$lang.events.create_subtitle_name}}</h4>

      <div class="creationData">
        <span class="input__title">{{$lang.events.create_event_name}}</span>
        <input class="input creationData__text" type="text" placeholder="Name"
          v-model='eventName'>
        <span class="input__title">{{$lang.events.create_event_desc}}</span>
        <textarea class="input creationData__text creationData__text-area" v-model='eventDesc'></textarea>
        <span class="input__title">{{$lang.events.create_members_limit}}</span>
        <input class="input creationData__text" type="number" value="20" min="0" v-model="eventMembersLimit">
          <!-- <input id="image-file" type="file" name="" value=""> -->
      </div>
      <button
          class="creationSection__nextBtn textButton"
          type="button"
          name="button"
          @click='nextStep(5)'
          v-if='currentStep == 4'
          >{{$lang.global.next}}</button>
    </div>
    <div id="5step" class="creationSection" v-show='currentStep >= 5'>
      <h3 class="creationSection__title">{{$lang.events.create_step}} 5 {{$lang.global.of}} 5</h3>
      <i class="creationSection__icon creationSection__icon-blue far fa-image"></i>
      <h4 class="creationSection__desc">{{$lang.events.create_subtitle_avatar}}</h4>

      <input class="profileEdit__fileInput" type="file" accept="image/*" ref="imageInput" name="avatarInput" id="avatarInput" @change="uploadImage" >
      <label class="profileEdit__fileLabel profileEdit__fileLabel-event" for="avatarInput"><i class="fas fa-camera"></i> {{$lang.global.change}}</label>
      <div
          class="roundImage roundImage-creationpage"
          :style="{ 'backgroundImage': 'url(\'' + (eventAvatar || require('../../assets/images/logo_alt.jpg')) + '\')' }"
          ref="avatarDemo" >
      </div>



      <button class="bigButton bigButton-center bigButton-capitalize creationSection__finishBtn " type="button"
        :disabled="!allDataIsOk || isDataUploading"
        v-if="!isEventCreated"
        @click='postEventData()'>
        {{$lang.accountSetting.finish_btn}}
      </button>

    </div>
    <div class="modalWindow" v-if="isModalError">
      <div class="modalWindow__content ">
        <div class="errorMessage">
          <i class="errorMessage__icon far fa-times-circle"></i>
          <h2 class="errorMessage__text">{{$lang.global.error}}</h2>
          <span class="errorMessage__code" v-if="errorCode"> {{$lang.profile.photo_error_code}}  {{errorCode}}</span>
          <div class="errorMessage__buttons">
            <button class="bigButton bigButton-normaltxt bigButton-small creationSection__finishBtn " type="button"
              :disabled="!allDataIsOk || isDataUploading"
              @click='postEventData()'>
              {{$lang.global.try_again}}
            </button>

          </div>

        </div>

        <!-- <span class="modalWindow__close modalWindow__close-maxzindex"><i class="fas fa-times"></i></span> -->
        <button class="textButton modalWindow__close modalWindow__close-button" type="button" @click="isModalError = false">{{$lang.global.close}}</button>
      </div>
    </div>
    <div class="modalWindow modalWindow-light" v-if="isEventCreated">
      <div class="modalWindow__content modalWindow__content-question">
        <div class="doneMessage">
          <i class="doneMessage__icon far fa-check-circle"></i>
          <h2 class="doneMessage__text">{{$lang.events.create_done_title}}</h2>
          <h3 class="doneMessage__text">{{$lang.events.create_done_subtitle}}</h3>
          <router-link class="bigButton bigButton-small bigButton-normaltxt bigButton-green"
            :to="{ name: 'eventPage', params: {id: createdId}}"
            replace
            >{{$lang.events.events_list_link}}</router-link>
        </div>
        <!-- <span class="modalWindow__close modalWindow__close-maxzindex"><i class="fas fa-times"></i></span> -->
      </div>
    </div>
  </div>

</template>

<script>
import DatePick from 'vue-date-pick';
import { L, LMap, LTileLayer, LMarker, LControl } from 'vue2-leaflet';

  import icon from 'leaflet/dist/images/marker-icon.png';
  import iconShadow from 'leaflet/dist/images/marker-shadow.png';

  let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;
  
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
      eventMaxMembers: 0,
      eventAvatar: null,

      //location data Data
      place: this.$lang.events.create_not_selected,
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


      isDataUploading: false,
      isPlaceLoading: false,
      isSearchLoading: false,
      isModalError: false,
      errorCode: 500,
      isEventCreated: false,


      createdId: null,

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
    eventMembersLimit:{
      set(newValue){
        if(newValue<0){
          this.eventMaxMembers = 0;
        } else {
          this.eventMaxMembers = newValue;
        }
      },
      get(){
        return this.eventMaxMembers;
      }
    },
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
               lon: this.marker.lon}
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
      this.isSearchLoading = true;
      this.$axios.get('https://api.locationiq.com/v1/autocomplete.php?', {params}).then((response)=>{
        console.log(response);
        this.isSearchLoading = false;
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
        this.isSearchLoading = false;
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
      this.isPlaceLoading = true;
      this.searcResults = [];
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
        this.isPlaceLoading = false;
        let address = response.data.address;
        console.log(address);
        this.place = (address.road ? address.road + " " + (address.house_number || '') + ", " :'') + (address.city || address.village || address.state) + ', ' + address.country;

        this.placeCity = address.city || address.village || address.state;
        this.placeCountry = address.country;

      }, (error)=>{
        console.log(error);
        this.isPlaceLoading = false;
      });
      this.$axios.defaults.headers.common['Authorization'] = tempToken;
    },
    // getBodyScrollTop(){
    //   let el = document.scrollingElement || document.documentElement;
    //   return el.scrollTop;
    // },
    //
    // requestAnimFrame(){
    //   return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
    //
    // },
    // scrollTo(to, callback, duration){
    //       function move(amount) {
    //     document.documentElement.scrollTop = amount;
    //     document.body.parentNode.scrollTop = amount;
    //     document.body.scrollTop = amount;
    //   }
    //   function position() {
    //     return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    //   }
    //   var start = position(),
    //     change = to - start,
    //     currentTime = 0,
    //     increment = 20;
    //   duration = (typeof(duration) === 'undefined') ? 500 : duration;
    //   var animateScroll = function() {
    //     // increment the time
    //     currentTime += increment;
    //     // find the value with the quadratic in-out easing function
    //     var val = Math.easeInOutQuad(currentTime, start, change, duration);
    //     // move the document.body
    //     move(val);
    //     // do the animation unless its over
    //     if (currentTime < duration) {
    //       requestAnimFrame(animateScroll);
    //     } else {
    //       if (callback && typeof(callback) === 'function') {
    //         // the animation is done so lets callback
    //         callback();
    //       }
    //     }
    //     animateScroll();
    //   }
    // },
    //
    // animate(elem, style, unit, from, to, time, prop) {
    //     if (!elem) {
    //         return;
    //     }
    //     var start = new Date().getTime(),
    //         timer = setInterval(function () {
    //             var step = Math.min(1, (new Date().getTime() - start) / time);
    //             if (prop) {
    //                 elem[style] = (from + step * (to - from))+unit;
    //             } else {
    //                 elem.style[style] = (from + step * (to - from))+unit;
    //             }
    //             if (step === 1) {
    //                 clearInterval(timer);
    //             }
    //         }, 25);
    //     if (prop) {
    //     	  elem[style] = from+unit;
    //     } else {
    //     	  elem.style[style] = from+unit;
    //     }
    // },
    // scrollTo(element, to, duration) {
    //     if (duration <= 0) return;
    //     var difference = to - element.scrollTop;
    //     var perTick = difference / duration * 10;
    //
    //     setTimeout(function() {
    //         element.scrollTop = element.scrollTop + perTick;
    //         if (element.scrollTop === to) return;
    //         scrollTo(element, to, duration - 10);
    //     }, 10);
    // },
    nextStep(step){
      this.currentStep = step;
      console.log(step + "step");
      let currentSection = document.getElementById(step + "step");

      setTimeout(()=>{
        currentSection.scrollIntoView({behavior: "smooth"});

        // this.animate(document.scrollingElement || document.documentElement, "scrollTop", "", window.screenY, currentSection.offsetTop, 300, true);
        // this.scrollTo(currentSection.getBoundingClientRect().top + window.pageYOffset, null, 300);
        // this.scrollTo(document.body,currentSection.offsetTop,600);
      }, 0);

    },
    closeMap(){
      this.isMapOpen = false;
      this.center = L.latLng(this.marker.lat, this.marker.lon);
    },
    postEventData(){
      this.isDataUploading = true;
      this.isModalError = false;
      let arrayOfDate = this.date.split(' ');
      let time = arrayOfDate[0];
      let date = arrayOfDate[1];

      let formData = new FormData();
      // let params = {
      //   'name': this.eventName,
      //   'description': this.eventDesc,
      //   'time_begins': time,
      //   'tags': this.selectedTags,
      //   'avatar': '',
      //   'date_expire': date,
      //   'city': 'Uzhgorod',
      //   'country': 'Ukraine',
      //   'geo': this.geo.lat + ' ' + this.geo.lon
      // }
       let tagsArray = JSON.parse(JSON.stringify(this.selectedTags));
       for (let i = 0; i < this.selectedTags.length; i++) {
         formData.append('tags', this.selectedTags[i]);
       }
       formData.append('name', this.eventName);
       formData.append('description', this.eventDesc);
       formData.append('time_begins', time);
       // formData.append('tags', tagsArray);
       // formData.append('tags',JSON.parse(JSON.stringify(this.selectedTags)));
       formData.append('author', this.$store.getters.getCurrentUser);
       // formData.append('tags', "#sport");
       formData.append('avatar',this.eventAvatar);
       formData.append('max_members', this.eventMaxMembers);
       formData.append('date_expire', date);
       formData.append('city', this.placeCity);
       formData.append('country', this.placeCountry);
       formData.append('geo', this.geo.lat + ' ' + this.geo.lon);

      this.$axios.post('https://comeandmeet.herokuapp.com/events/create/', formData).then(response=>{
        this.isDataUploading = false;
        this.isEventCreated = true;
        this.createdId = response.data.id;
        console.log(response);
      }, error=>{
        //error
        this.isDataUploading = false;
        this.isModalError = true;
        this.errorCode = error.response.status;
      });

    },
    uploadImage(){
      this.eventAvatar = this.$refs.imageInput.files[0];
      let reader = new FileReader();
      reader.onload = e =>{
        console.log(e);
        this.$refs.avatarDemo.style.backgroundImage = "url(" + e.target.result + ")";
      }
      reader.readAsDataURL(this.eventAvatar);

    }

  },
  created(){
    this.date ='00:00 ' + this.getCurrentDate();
    this.$store.dispatch('getTagsListAPI');



    Math.easeInOutQuad = function(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    Math.easeInCubic = function(t, b, c, d) {
      var tc = (t /= d) * t * t;
      return b + c * (tc);
    };

    Math.inOutQuintic = function(t, b, c, d) {
      var ts = (t /= d) * t,
        tc = ts * t;
      return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
    };
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
    &-blue{
      color: #4C6EF5;
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
    &-place{
      position: relative;
    }
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

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance:textfield;
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
