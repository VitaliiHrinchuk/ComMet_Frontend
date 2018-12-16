<template lang="html">
  <div class="userEvents">
    <h2 class="userEvents__title">Visited</h2>
    <h2 class="userEvents__title userEvents__title-unactive">Created</h2>
    <span class="note" v-if='userEvents.visited.length == 0'>User has not visited any event</span>
    <div class="" v-for='event in userEvents.visited'>

      <div class="profileEvent">
        <img  class="profileEvent__img" src="../../assets/images/avatar__temp.jpg" alt="">
        <h3 class="profileEvent__title">{{event.name}}</h3>
        <h4 class="profileEvent__date">{{event.date_expire}}</h4>
        <button class="profileEvent__btn" type="button" name="button" @click="showEvent(event.id)">show</button>
      </div>
    </div>


    <!-- <div class="profileEvent">
      <img  class="profileEvent__img" src="../../assets/images/avatar__temp.jpg" alt="">
      <h3 class="profileEvent__title">Walking through Berlin</h3>
      <h4 class="profileEvent__date">Date: 11.11.2017</h4>
      <button class="profileEvent__btn" type="button" name="button">show</button>
    </div>
    <div class="profileEvent profileEvent-last">
      <img  class="profileEvent__img" src="../../assets/images/avatar__temp.jpg" alt="">
      <h3 class="profileEvent__title">Walking through Berlin</h3>
      <h4 class="profileEvent__date">Date: 11.11.2017</h4>
      <button class="profileEvent__btn" type="button" name="button">show</button>
    </div> -->
  </div>
</template>

<script>
export default {
  props:{
    userEvents: {required: true}
  },
  data(){
    return{

    }
  },
  methods: {
    showEvent(id){
      this.$router.push(`/Event/${id}`);
    }
  }
}
</script>

<style lang="scss">
  .userEvents{


    &__title{
      font-size: 1em;
      font-weight: normal;
      text-transform: uppercase;
      margin-bottom: 10px;
      display: inline-block;
      &-lined{
        border-top: 1px solid #cecccc;
        padding-top: 15px;
      }

      &-unactive{
        color: gray;
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
        background: #1ca9f0;
        color: #fff;
        font-weight: bold;
        border-radius: 5px;
        padding: 3px 7px;
        text-transform: uppercase;

      }
      &__img{
        width: 64px;
        height: 64px;
        border-radius: 5px;
        float: left;
        margin-right: 15px;
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
