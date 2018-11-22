<template lang="html">
  <div class="container temp">
    <div class="title text-gray" >
      <h1>Events</h1>
    </div>

    <div class="flexbox ">
      <div class="eventSearch">
        <h3 class="eventSearch__title text-gray">Search</h3>
        <div class="eventSearch__input shadow radius-5px bg-white">
          <input class="input input-eventSearch" type="text" name="" placeholder="Search by name">
        </div>

      </div>


      <!-- <div class="" v-for="event in eventsList">
        {{event.name}}
      </div> -->


      <div class="eventList">
        <h3 class="text-gray eventList__title">Events list</h3>
        <div class="shortEvent shadow radius-5px bg-white" v-for="event in eventsList">
          <h3 class="shortEvent__title">{{event.name}}</h3>
          <div class="shortEvent__date">
            <span>15 November</span>
          </div>
          <div class="shortEvent__tags" >
            <div class="tag" v-for="tags in event.tags">
                {{tags.name}}
            </div>
            <!-- <div class="tag">
                tag2
            </div>
            <div class="tag">
                tag3
            </div> -->
          </div>
          <div class="shortEvent__place">
            <span>15-th Wall Str.</span>
          </div>
          <div class="shortEvent__members">
              <span class="shortEvent__bold text-gray">Members:</span> {{event.membersCount}}
          </div>
          <button class="shortEvent__btn" type="button" name="button">Event Page</button>
        </div>

      </div>


      <aside class="aside flexbox">
        <h3 class="text-gray aside__title">Sort</h3>
        <div class="eventSort shadow radius-5px bg-white">
          <ul class="sortList text-gray">
            <li class="sortList__item sortList__item-active">All events</li>
            <li class="sortList__item">My events</li>
            <li class="sortList__item">Recommended events</li>
            <li class="sortList__item">Nearest events</li>
          </ul>
        </div>

        <div class="eventSearch-tags shadow radius-5px bg-white">
          <h4 class="eventSearch__title text-gray">Included tags</h4>
          <div class="tag tag-search">
              Music
          </div>
          <div class="addTagBtn">
            +
          </div>
        </div>

      </aside>


    </div>


  </div>
</template>

<script>
export default {
  data(){
    return{
      // eventsList: []
    }
  },
  computed:{
    eventsList(){
      return this.$store.getters.getEventsList;
    }
  },
  methods: {
    pushEventsList(){
      // this.eventsList.push(this.$store.getters.getEventsList)
    }
  },
  created(){
    this.$store.dispatch('refreshEventsList');
    // this.pushEventsList();
    // console.log(this.eventsList);
  }
}
</script>

<style lang="css">
.temp{
  height: 6000px;
}
.title{
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 15px;
  text-align: center;
  width: 300px;
}
.eventSearch {
  width: 60%;
  padding: 15px 15px;
  margin-left: auto;
  margin-right: auto;
  color: #455A64;
}
.eventSearch__title{
  /* text-align: center; */
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}
.eventSearch__input{
  padding: 13px 13px;

}
.eventSearch-tags{
  /* width: calc(30% - 30px); */

  padding: 15px 15px;
}
/* .input-eventSearch{
  width: 98%;
  margin-bottom: 4px;
} */
.eventSort{
  /* width: calc(20% - 30px); */
  /* margin-left: 30px; */
  margin-bottom: 15px;
}
.sortList{
  display: flex;
  flex-direction: column;
  height: 100%;
  list-style: none;
  font-size: .9em;
  margin:0;

  padding: 10px 10px;
  cursor: pointer;
}
.sortList__item{
  padding-left: 4px;
  font-weight: bold;
  margin-bottom: 6px;
  transition: all .3s;
}
.sortList__item:hover{
  color: #1CA9F0;
  border-left: 2px solid #1CA9F0;
}
.sortList__item-active{
  color: #1CA9F0;

  border-left: 2px solid #1CA9F0;
}
.aside{
  flex-direction: column;
  width: 30%;
  margin-top: 15px;
  padding-left: 30px;
}
.aside__title{
  margin-left: 15px;
  padding: 5px 0;
}
.flexbox {
  display: flex;
  flex-wrap: wrap;
}


.addTagBtn{
  display: inline-block;
  color: #1ca9f0;
  cursor: pointer;
  margin: 0;
  padding: 0;
}
.eventList{
  margin-top: 15px;
  width: calc(70% - 30px);
}
.eventList__title{
  margin-left: 15px;
}
.shortEvent{
  margin-top: 10px;
  padding: 15px 15px;
  width: 100%;
  display:flex;
  flex-wrap: wrap;
}
.shortEvent__title{
  font-weight: normal;
}
.shortEvent__tags{
  width: 90%;
  margin: 15px 0 30px 0;
}
.shortEvent__date{
  font-size: .9em;
  margin-left:auto;
}
.shortEvent__place{
  width: 100%;
  margin-bottom: 10px;
}
.shortEvent__members{
  width: 100%;
}
.shortEvent__bold{
  font-weight: bold;
}
.shortEvent__btn{
  background: none;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  color: #1ca9f0;
  margin-left: auto;
}


</style>
