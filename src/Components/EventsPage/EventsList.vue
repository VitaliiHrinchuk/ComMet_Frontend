<template lang="html">
  <div class="">
    <div class="loaderBg" v-if="isScreenLoader">
      <div class="screenLoader">
        <div class="screenLoader screenLoader-inner"></div>
      </div>
    </div>

    <div class=" eventPageContainer" >

      <div class="eventListHeader ">
        <div class="title text-gray" >
          <h1>Look For Events</h1>
        </div>
        <div class="eventSearch container">
          <!-- <h3 class="eventSearch__title text-gray">Search</h3> -->
          <div class="eventSearch__input shadow radius-5px bg-white">
            <input class="input input-eventSearch" type="text" name="" placeholder="Search" v-model='searchName'>
            <i class="fas fa-search input__icon"></i>
          </div>

        </div>
      </div>



      <div class="container flexbox ">



        <!-- <div class="" v-for="event in eventsList">
          {{event.name}}
        </div> -->


        <div id="eventList" class="eventList">
            <!-- <div class="screenLoader screenLoader-list" v-if="!isEventListLoader">
              <div class="screenLoader screenLoader-inner"></div>
            </div> -->
          <span class="loader loader-list" v-if="isEventListLoader"></span>
          <!-- <h3 class="text-gray eventList__title">Events list</h3> -->
          <span class="note" v-if='filteredEventList.length == 0'>no events by your queries</span>
          <div class="shortEvent shadow radius-5px" v-for="event in filteredEventList" >
            <div class="shortEvent__avatar">
            </div>
            <div class="eventData">
              <h3 class="eventData__title">{{event.name}}</h3>
              <div class="eventData__date">
                <span>{{dateToString(event.date)}}</span>
              </div>
              <div class="eventData__tags" >
                <div class="tag" v-for="tag in event.tags">
                    {{tag}}
                </div>
                <!-- <div class="tag">
                    tag2
                </div>
                <div class="tag">
                    tag3
                </div> -->
              </div>
              <div class="eventData__place">
                {{event.city}}
              </div>
              <div class="eventData__members">
                  {{event.membersCount}} will come
              </div>
              <router-link class="textButton eventData__btn " :to="{ name: 'eventPage', params: {id:event.id} }">Event Page</router-link>
            </div>

          </div>

        </div>
        <button id="asideToggler" class="bigButton asideToggler" type="button" name="button" @click='openSortAside'><i class="fas fa-sort-amount-down"></i> Sort</button>
        <div id="adaptiveAside" class="adaptiveAside">
          <aside class="aside flexbox">
            <!-- <h3 class="text-gray aside__title">Sort</h3> -->
            <div class="eventSort shadow radius-5px bg-white">
              <ul class="sortList text-gray">
                <li class="sortList__item sortList__item-active">All events</li>
                <li class="sortList__item">My events</li>
                <li class="sortList__item">Recommended events</li>
                <li class="sortList__item">Nearest events</li>
              </ul>
            </div>

            <div class="eventSort-tags shadow radius-5px bg-white">
              <h4 class="eventSort__title text-gray">Included tags</h4>
              <div class="tag tag-search" v-for='tag in filterTags'>
                  {{tag}}
              </div>
              <div class="addTagBtn" @click = 'openList = true'>
                +
              </div>
            </div>
            <div class="modalWindow" v-if='openList'>
              <div class="modalWindow__content">
                <span class="modalWindow__close" @click='openList = false'><i class="fas fa-times"></i></span>
                <h2 class="modalWindow__title">Tags</h2>
                  <div class="creationSection__checkTag" v-for='tag in tagList'>
                    <input class="" type="checkbox" name="" :id='tag.name' :value="tag.name" v-model='filterTags'>
                    <label :for="tag.name">{{tag.name}}</label>
                  </div>

              </div>

            </div>
            <datepick
                v-model="sortDate"
                :hasInputElement="false"
            ></datepick>
          </aside>
          <div class="adaptiveAside__buttons">
            <button
              class="semicircleBtn semicircleBtn-border"
              type="button"
              name="button"
              @click='closeSortAside'
              >close</button>
            <button class="semicircleBtn" type="button" name="button">reset</button>
          </div>

        </div>



      </div>


    </div>
  </div>

</template>

<script>

import DatePick from 'vue-date-pick';


export default {
  components: {
    "datepick":DatePick
  },
  data(){
    return{
      // eventsList: []

      searchName: '',
      filterTags: [],
      openList: false,
      selectedSortDate: ''
    }
  },
  computed:{
    eventsList(){
      return this.$store.getters.getEventsList;
    },
    filteredEventList(){
      let filterName = this.searchName.toLowerCase();
      console.log(filterName);
      if(this.filterTags.length>0){
        console.log('changed');
        let filteredArr = [];
        this.eventsList.filter(item => {
          console.log(item);

            for(let i =0;i<this.filterTags.length;i++){

              if(item.tags.indexOf(this.filterTags[i]) !==-1){
                console.log(item);
                filteredArr.push(item);
                console.log('here' + ' '+this.filterTags[i]);
                break;
              }
            }
        });

        return  filteredArr.filter(item => {
          if(item.name.toLowerCase().indexOf(filterName) != -1){
            return item;
          }
        })
      } else {
        return this.eventsList.filter(item => {
          if(item.name.toLowerCase().indexOf(filterName) != -1){
            return item;
          }
        })
      }

    },
    isScreenLoader(){
      return this.$store.getters.getEventLoaderState;
    },
    isEventListLoader(){
      return this.$store.getters.getEventListLoaderState;
    },
    tagList(){
      return this.$store.getters.getTagsList;
    },
    sortDate:{
      set(newValue){
        this.selectedSortDate = newValue;
      },
      get(){
        return this.selectedSortDate;
      }
    }

  },
  methods: {
    test(){
      alert('ss');
    },
    loadEvents(){
      this.$store.dispatch('refreshEventsList');
    },
    onScroll(event){
      var scrollTop =window.pageYOffset || document.documentElement.scrollTop;
      let contentHeight = document.documentElement.offsetHeight;
      let listHeight = document.querySelector('#eventList').offsetHeight;


      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

      if(bottomOfWindow && !this.isEventListLoader){
        this.loadEvents();
      }
    },
    dateToString(date){
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

      let resultDate = new Date(date);

      return weekday[resultDate.getDay()] + ', ' +monthNames[resultDate.getMonth()] + ' ' + resultDate.getDate();
    },
    showEvent(id){
      this.$router.push(`/Event/${id}`);
    },
    openSortAside(){
      document.querySelector('#adaptiveAside').classList.add('adaptiveAside-active');
    },
    closeSortAside(){
      document.querySelector('#adaptiveAside').classList.remove('adaptiveAside-active');
    }
  },
  created(){
    this.loadEvents();
    this.$store.dispatch('getTagsListAPI');
    this.$store.commit('setEventLoader', true);
    document.addEventListener('scroll', this.onScroll);

  },
  destroyed(){
    document.removeEventListener('scroll',this.onScroll);
    this.$store.commit('clearEventList');
    this.$store.commit('updateEventsUrl', 'https://comeandmeet.herokuapp.com/events/?limit=3&offset=0');
  },
}
</script>

<style lang="scss">
$primary-color: #1ca9f0;
$green-color: #2DDAA5;
$red-color: #FF00AE;
$violet-color: #B34EE9;
$blue-color: #3AE2CE;
$red: #FF0044;

.eventPageContainer{

}
.title{
  margin: 0 auto;
  padding-top: 10px;
  margin-bottom: 15px;
  text-align: center;
  width: 300px;
  color: #fff;
}
.eventListHeader{
  background: #1CA9F0;
  padding: 10px 0;
  margin-bottom: 10px;
}
.eventSearch {
  width: 40%;
  margin-right: auto;
  margin-left: auto;
  color: #455A64;
  order: 1;

  &__title{
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    margin-left: 15px;
    color: #fff;
  }

  &__input{
    position: relative;
  }

}

.eventSort{

  margin-bottom: 15px;

  &-tags{
    padding: 15px 15px;
    margin-bottom: 15px;
  }
  &__title{
    margin-bottom: 10px;
  }
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

  &__item{
    padding-left: 4px;
    font-weight: normal;
    margin-bottom: 6px;
    transition: all .3s;
    &:hover{
      color: #1CA9F0;
      font-weight: bold;
      border-left: 2px solid #1CA9F0;
    }
    &-active{
      color: #1CA9F0;
      font-weight: bold;
      border-left: 2px solid #1CA9F0;
    }
  }
}
.adaptiveAside{
  width: 30%;
  order: 3;


  &__buttons{
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 30px;
    background: #fff;
    width: 100%;
    padding: 20px 0;
    justify-content: space-around;
    align-items: center;
    z-index: 11;
  }
}
.asideToggler{
  display: none;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 5px 15px;
}
.aside{
  flex-direction: column;
  width: 100%;
  padding-left: 30px;
  margin-bottom: 10px;


  &__title{
    margin-left: 15px;
    padding: 5px 0;
  }
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
  width: calc(70% - 30px);
  order: 2;
  position: relative;

  &__title{
    margin-left: 15px;
  }
}

.shortEvent{
  margin-bottom: 10px;

  position: relative;
  width: 100%;
  background: #fff;
  display:flex;
  flex-wrap: wrap;
  overflow: hidden;
  &__avatar{
    width: 30%;
    display: block;
    background-image: url('https://www.abidcars.com/blog/wp-content/uploads/2015/12/traveling-by-car.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  // color: #fff;
  //
  // background-image: url('https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/01/11/13/travel-hiking-app.jpg?w968h681');
  // background-size: cover;
  // background-position: center center;
  // &:before{
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   bottom: 0;
	//   right: 0;
  //   width: 100%;
  //   height: 100%;
  //   opacity: .7;
  //   display: block;
  //   background: linear-gradient(to right, #066dab 0%,#8abbd7 69%,#c5deea 100%);
  //   z-index: 2;
  // }

}
.eventData{

  display:flex;
  flex-wrap: wrap;
  width: 70%;
  padding: 15px 15px;
  &__title{
    font-weight: normal;
    z-index: 3;
  }

  &__tags{
    width: 90%;
    margin: 15px 0 10px 0;
    z-index: 3;
  }
  &__date{
    font-size: .9em;
    margin-left:auto;
    z-index: 3;

  }
  &__place{
    width: 100%;
    margin-bottom: 10px;
    z-index: 3;
  }
  &__members{
    width: 100%;
    z-index: 3;
  }
  &__bold{
    font-weight: bold;
    color: #fff;
  }
  &__btn{
    background: none;
    border: none;
    font-weight: bold;
    text-decoration: none;
    font-size: .9em;
    font-weight: 500;
    text-transform: uppercase;
    cursor: pointer;
    color: #1ca9f0;
    margin-left: auto;
    z-index: 3;
  }
}

@media screen and (min-width: 2000px){
  .eventSearch{
    width: 1000px;
  }
  .eventList{
    width: 1300px;
  }
  .aside{
    width: 500px;
  }
}
@media screen and (max-width: 1600px){


}

@media screen and (max-width: 1368px){

}
@media screen and (max-width: 1120px){

}
@media screen and (max-width: 960px){
  .eventPageContainer{
    font-size: .75em;
  }
  .eventSearch{
    width: 70%;
  }
}

@media screen and (max-width: 768px){
  .eventPageContainer{
    font-size: 1em;
  }
  .eventSearch{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding: 0 0;
  }

  .eventList{
    width: 100%;
    order: 3;
    padding-left: 0;

  }
  .shortEvent{
    flex-direction: column;
    &__avatar{
      width: 100%;
      height: 200px;
    }
  }
  .eventData{
    width: 100%;
    &__date{
      flex-basis: 100%;
    }
  }
  .adaptiveAside{
    position: fixed;
    display: none;
    width: 100%;
    top: 0;
    right: 0;
    overflow: scroll;
    background: rgba(0,0,0,.5);
    z-index: 5;
    height: 100%;
    padding: 30px 10px;
    &-active{
      display: block;
    }
    &__buttons{
      display: flex;
    }

  }
  .asideToggler{
    display: block;

  }
  .aside{
    order: 2;
    width: 100%;
    padding-left: 0;
  }

}
@media screen and (max-width: 560px){

}

@media screen and (max-width: 480px){

}

</style>
