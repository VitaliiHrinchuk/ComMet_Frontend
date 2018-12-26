<template lang="html">
  <div class="" style='padding-bottom: 100px;'>
    <div class="creationHeader">
      <h1 class="creationHeader__title">Create New Event</h1>
      <h2 class="creationHeader__title creationHeader__title-small">Do it in few steps</h2>
    </div>
    <div id="1step" class="creationSection" v-if='currentStep >= 1'>
      <h3 class="creationSection__title">Step 1 of 4</h3>
      <i class="creationSection__icon creationSection__icon-red fas fa-map-marked-alt"></i>
      <h4 class="creationSection__desc">Where your event will be?</h4>
      <div class="creationData">
        <div class="creationData__data">Uzhgorod</div>
        <!-- <span class="input__title">Search city</span> -->
        <input class="input" type="text" name="" value="" placeholder="Search city" v-model='place' @change="searchCity()">
        <!-- <div class="searchDrop">
          <ul class="searchDrop__list">
            <li class="searchDrop__item"></li>
          </ul>
        </div> -->
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
        <div
          class="creationSection__checkTag"
          v-for='tag in tagList'
          >
          <input class="" type="checkbox" :id='tag.name' :value="tag.name" v-model='selectedTags'>
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
        <textarea class="input creationData__text" name="name" rows="8" cols="80" placeholder="Description"
          v-model='eventDesc'></textarea>
      </div>

      <button class="creationSection__finishBtn bigButton bigButton-center" type="button" name="button" @click='postEventData()'>Finish</button>
    </div>


  </div>

</template>

<script>
import DatePick from 'vue-date-pick';


export default {
  data(){
    return {
      date: '',
      wrongDate: false,
      place: '',
      currentStep:1,
      selectedTags: [],
      time: '',
      geo: {
        lat: 0,
        lon: 0
      },
      eventName: '',
      eventDesc: ''
    }
  },
  components: {
    "datepick":DatePick
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
      console.log(arrayOfDate);
      let time = arrayOfDate[0];
      let date = arrayOfDate[1];

      let resultDate = new Date(date);

      return time + ', ' + weekday[resultDate.getDay()] + ' ' +monthNames[resultDate.getMonth()] + ' ' + resultDate.getDate() + ', '+ resultDate.getFullYear();
    },
    tagList(){
      console.log(this.$store.getters.getTagsList);
      return this.$store.getters.getTagsList;
    }
  },
  methods: {
    getCurrentDate(){
      let currentDate = new Date();
      return currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
    },
    searchCity(){

      //
      // let params = {
      //   key: '1e4a846d952064',
      //   q: this.place,
      //
      // }
      //
      // this.$axios.get('https://api.locationiq.com/v1/autocomplete.php?', {params}).then((response)=>{
      //   console.log(response);
      //
      //
      // }, (error)=>{
      //
      // });
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
    postEventData(){

      let arrayOfDate = this.date.split(' ');
      let time = arrayOfDate[0];
      let date = arrayOfDate[1];


      let axiosConfig = {
          headers: {
              'Content-Type': 'application/json',
          }
      };

      let params = {
        'name': this.eventName,
        'description': this.eventDesc,
        'time_begins': time,
        'tags': this.selectedTags,
        'avatar': require('../../assets/images/avatar__temp.jpg'),
        'date_expire': date,
        'city': 'Uzhgorod',
        'country': 'Ukraine',
        'geo': this.geo.lat + ' ' + this.geo.lon
      }

      this.$axios.post('https://comeandmeet.herokuapp.com/events/', params, axiosConfig).then(response=>{
        console.log(response);
      }, error=>{
        //error
        console.log(error);
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
$primary-color: #1ca9f0;
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
      color: #7fffd4;
      font-weight: bold;
    }
  }
  &__desc{
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 20px;
  }
  &__checkTag{
    background: $primary-color;
    position: relative;
    text-align: center;
    display: inline-block;
    padding: 3px 6px;
    border-radius: 3px;
    margin-bottom: 10px;
    margin-right: 5px;
    font-size: 14px;
    label{
      color: #fff;
      font-weight: bold;
      margin: 0;
      padding: 0;
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
      &:before{
        opacity: 1;
        content: '';
        position: absolute;
        top: 4px;
        left: 5px;
        border-radius: 2px;
        background: #fff;
        width: 15px;
        height: 15px;
      }
    }
  }
  &__nextBtn{
    align-self: center;
  }
  &__container{
    width: 400px;
  }
  &__finishBtn{
    width: 150px;
  }
}
.creationData{
  width: 300px;
  margin-bottom: 25px;
  &__data{
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 20px;
  }

  &__text{
    margin-top: 5px;
    margin-bottom: 10px;
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
input[type=checkbox] {
    visibility: hidden;
    padding: 0;
    margin: 0;
}
.creationSection__checkTag input[type=checkbox]:checked + label:after {
    opacity: 1;
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
