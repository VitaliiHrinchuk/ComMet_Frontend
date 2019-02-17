<template lang="html">
  <div class="userEvents">
    <h2 class="userEvents__title"
        @click='changeType(0)'
        :class='{"userEvents__title-unactive": selectedType == 1}'
        >{{$lang.profile.events_visited}}</h2>
    <h2
        class="userEvents__title"
        @click='changeType(1)'
        :class='{ "userEvents__title-unactive": selectedType == 0}'
    >{{$lang.profile.events_created}}</h2>
    <span
        class="note"
        v-if='userEvents.visited.length == 0 && selectedType == 0'
        >{{$lang.profile.events_visited_note}}</span>
    <div class="" v-for="event in userEvents.visited" v-if="selectedType == 0">

      <div class="profileEvent">
        <div class="profileEvent__img" :style="{ 'backgroundImage': 'url(\'' + getEventsPhotos(event.avatar) + '\')' }"></div>
        <h3 class="profileEvent__title">{{event.name}}</h3>
        <h4 class="profileEvent__date">{{event.date_expire}}</h4>
        <button class="profileEvent__btn" type="button" name="button" @click="showEvent(event.id)">{{$lang.profile.events_show_btn}}</button>
      </div>
    </div>


    <span
        class="note"
        v-if='userEvents.created.length == 0  && selectedType == 1'
        >{{$lang.profile.events_created_note}}</span>
    <div class="" v-for='event in userEvents.created' v-if='selectedType == 1'>

      <div class="profileEvent">
        <div class="profileEvent__img" :style="{ 'backgroundImage': 'url(\'' + getEventsPhotos(event.avatar) + '\')' }"></div>
        <h3 class="profileEvent__title">{{event.name}}</h3>
        <h4 class="profileEvent__date">{{event.date_expire}}</h4>
        <button class="profileEvent__btn" type="button" name="button" @click="showEvent(event.id)">{{$lang.profile.events_show_btn}}</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    userEvents: {required: true}
  },
  data(){
    return{
      selectedType: 0,
      tempAvatar: require('../../assets/images/avatar__temp.jpg'),
    }
  },
  methods: {
    showEvent(id){
      this.$router.push(`/Event/${id}`);
    },
    changeType(type){
      this.selectedType = type;
    },
    getEventsPhotos(url){
      return this.$store.state.imagesUrl + url;
    },
    // dateToString(date){
    //   const monthNames = ["January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"
    //   ];
    //   const weekday = new Array(7);
    //       weekday[0] =  "Sunday";
    //       weekday[1] = "Monday";
    //       weekday[2] = "Tuesday";
    //       weekday[3] = "Wednesday";
    //       weekday[4] = "Thursday";
    //       weekday[5] = "Friday";
    //       weekday[6] = "Saturday";
    //
    //   let resultDate = new Date(date);
    //
    //   return weekday[resultDate.getDay()] + ', ' +monthNames[resultDate.getMonth()] + ' ' + resultDate.getDate();
    // },
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
  .userEvents{

    &__title{
      font-size: 1em;
      font-weight: normal;
      text-transform: uppercase;
      margin-bottom: 10px;
      display: inline-block;
      margin-right: 10px;
      cursor: pointer;
      border-bottom: 1px solid #cecccc;
      color: $primary-color;
      &-lined{
        border-top: 1px solid #cecccc;
        padding-top: 15px;
      }

      &-unactive{
        color: gray;
        opacity: .7;
        border-bottom: none;
      }
    }

    .profileEvent{
      border-bottom: 1px solid #cecccc;
      padding:10px 0;

      &-last{
        border: none;
      }
      &:after{
        content: '';
      	display: block;
      	clear: both;
      }
      &__btn{
        font-size: .7em;
        margin-top: 10px;
        border: none;
        background: $primary-color;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        padding: 3px 7px;
        // text-transform: uppercase;

      }
      &__img{
        position: relative;
        background-position: center center;
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        cursor: pointer;
        overflow: hidden;
        float: left;
        margin-right: 10px;
      }
      &__title{
        font-size: .8em;
        font-weight: normal;
        margin-bottom: 5px;


      }
      &__date{
        font-weight: normal;
        font-size: .65em;
        color: #b2b2b2;
      }
    }

  }
</style>
