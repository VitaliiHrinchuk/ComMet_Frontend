<template lang="html">
  <div class="">
    <div class="creationHeader">
      <h1 class="creationHeader__title">Create New Event</h1>
      <h2 class="creationHeader__title creationHeader__title-small">Do it in few steps</h2>
    </div>
    <div class="creationSection">
      <h3 class="creationSection__title">Step 1 0f 4</h3>
      <i class="creationSection__icon creationSection__icon-red fas fa-map-marked-alt"></i>
      <h4 class="creationSection__desc">Where your event will be?</h4>
      <div class="creationData">
        <div class="creationData__country">Uzhgorod</div>
        <!-- <span class="input__title">Search city</span> -->
        <input class="input" type="text" name="" value="" placeholder="Search city" v-model='place' @input="searchCity()">
        <div class="searchDrop">
          <ul class="searchDrop__list">
            <li class="searchDrop__item"></li>
          </ul>
        </div>
      </div>

    </div>

    <div class="creationSection">
      <h3 class="creationSection__title">Step 2 0f 4</h3>
      <i class="creationSection__icon creationSection__icon-orange far fa-calendar-alt"></i>
      <h4 class="creationSection__desc">When it will be?</h4>

      <datepick v-model='selectedDate'></datepick>
      <span v-if='wrongDate' class="errorMsg">You cannot pick a date earlier than today</span>
    </div>

    <div class="creationSection">
      <h3 class="creationSection__title">Step 3 0f 4</h3>
      <i class="creationSection__icon creationSection__icon-yellow fas fa-tags"></i>
      <h4 class="creationSection__desc">What will your event be about?</h4>

      <div class="creationSection__container">
        <div class="creationSection__checkTag">
          <input class="" type="checkbox" name="" id='walk' value="#walk">
          <label for="walk">walk</label>
        </div>
        <div class="creationSection__checkTag">
          <input class="" type="checkbox" name="" id='talk' value="#talk">
          <label for="talk">talk</label>
        </div>
        <div class="creationSection__checkTag">
          <input class="" type="checkbox" name="" id='music' value="#music">
          <label for="music">music</label>
        </div>
        <div class="creationSection__checkTag">
          <input class="" type="checkbox" name="" id='movie' value="#movie">
          <label for="movie">movie</label>
        </div>
        <div class="creationSection__checkTag">
          <input class="" type="checkbox" name="" id='sport' value="#sport">
          <label for="sport">sport</label>
        </div>
      </div>
    </div>

    <div class="creationSection">
      <h3 class="creationSection__title">Step 4 0f 4</h3>
      <i class="creationSection__icon creationSection__icon-green far fa-comments"></i>
      <h4 class="creationSection__desc">Name your event and describe it</h4>

      <div class="creationData">
        <span class="input__title">Event Name</span>
        <input class="input creationData__text" type="text" name="" value="" placeholder="Name">
        <span class="input__title">Event Description</span>
        <textarea class="input creationData__text" name="name" rows="8" cols="80" placeholder="Description"></textarea>
      </div>

      <button class="bigButton bigButton-center" type="button" name="button">Finish</button>
    </div>


  </div>

</template>

<script>
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  data(){
    return {
      date:'',
      wrongDate: false,
      place: ''
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
      },
      get(){
        return this.date;
      }
    }
  },
  methods: {
    getCurrentDate(){
      let currentDate = new Date();
      return currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();
    },
    searchCity(){

      // let axiosConfig = {
  		// 	  headers: {
  		// 	      'Content-Type': 'application/json',
  		// 	  }
  		// };
      //
      //
      // this.$axios.get('http://gd.geobytes.com/AutoCompleteCity?callback=func?&q='+this.place,axiosConfig).then((response)=>{
      //   console.log(response);
      //
      //
      // }, (error)=>{
      //
      // });
    }
  },
  created(){
    this.date = this.getCurrentDate();
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
        border: 2px solid #333;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
      &:before{
        opacity: 1;
        content: '';
        position: absolute;
        top: 5px;
        left: 6px;
        border-radius: 2px;
        background: #fff;
        width: 15px;
        height: 15px;
      }
    }
  }

  &__container{
    width: 400px;
  }
}
.creationData{
  width: 300px;
  &__country{
    text-align: center;
    font-size: 1.1em;
    margin-bottom: 20px;
  }

  &__text{
    margin-top: 5px;
    margin-bottom: 10px;
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
</style>
