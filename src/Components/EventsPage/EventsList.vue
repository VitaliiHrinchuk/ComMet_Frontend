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
          <span class="note" v-if='!isEventListLoader && eventsList.length === 0'>no events by your queries</span>
          <div class="shortEvent shadow radius-5px" v-for="event in eventsList" >

            <div class="shortEvent__avatar" :style="{ 'backgroundImage': 'url(\'' + getImageUrl(event.avatar) + '\')' }">
                <router-link class="shortEvent__link" :to="{ name: 'eventPage', params: { id: event.id } }"></router-link>
            </div>
            <div class="eventData">
              <h3 class="eventData__title">
                <router-link :to="{ name: 'eventPage', params: { id: event.id } }">
                  {{event.name}}
                </router-link>
              </h3>
              <div class="eventData__date">
                <span><i class="eventData__icon far fa-calendar-alt"></i> {{dateToString(event.date_expire)}}</span>
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
                <i class="eventData__icon fas fa-map-marker-alt"></i> {{event.city}}
              </div>
              <div class="eventData__members">
                <i class="eventData__icon far fa-user"></i> {{event.members_count}} will come
              </div>
              <router-link class="textButton eventData__btn " :to="{ name: 'eventPage', params: {id:event.id} }">Event Page</router-link>
            </div>

          </div>

        </div>
        <button id="asideToggler" class="bigButton bigButton-normaltxt asideToggler" type="button"  @click='openSortAside'><i class="fas fa-filter"></i> Filter</button>
        <div id="adaptiveAside" class="adaptiveAside">
          <aside class="aside flexbox">
            <!-- <h3 class="text-gray aside__title">Sort</h3> -->
            <div class="eventSort shadow radius-5px bg-white">
              <ul class="sortList text-gray">
                <li class="sortList__item"
                  :class="{'sortList__item-active' :(selectedFilterTab == 1)}"
                  @click="filterByAll">All events</li>
                <li class="sortList__item"
                  :class="{'sortList__item-active' : (selectedFilterTab == 2)}"
                  @click="filterByUserEvents">My events</li>
                <!-- <li class="sortList__item"
                  :class="{'sortList__item-active' :selectedFilterTab == 3}">Recommended events</li> -->
                <li class="sortList__item"
                  :class="{'sortList__item-active' :(selectedFilterTab == 3)}"
                  @click="filterBNearestEvents">Nearest events</li>
              </ul>
            </div>

            <div class="eventSort-tags shadow radius-5px bg-white">
              <h4 class="eventSort__title text-gray"><i class="fas fa-tag"></i> Included tags</h4>
              <div class="tag tag-search" v-for='tag in filterTags'>
                  {{tag}}
              </div>
              <div class="addTagBtn" @click = 'isListTags = true'>
                +
              </div>
              <button type="button"
                class="semicircleBtn semicircleBtn-border semicircleBtn-small semicircleBtn-right"
                v-if="filterTags.length > 0"
                @click="clearFilterTags"
              >Clear</button>
            </div>
            <div class="modalWindow" v-if='isListTags'>
              <div class="modalWindow__content">
                <span class="modalWindow__close" @click='closeFilterTagList'><i class="fas fa-times"></i></span>
                <h2 class="modalWindow__title">Tags</h2>
                  <div class="creationSection__checkTag" v-for='tag in tagList'>
                    <input class="" type="checkbox" name="" :id='tag.name' :value="tag.name" v-model='filterTags'>
                    <label :for="tag.name">{{tag.name}}</label>
                  </div>
              </div>

            </div>

            <div class="eventSort-tags shadow radius-5px bg-white">
              <h4 class="eventSort__title text-gray"><i class="far fa-calendar-alt"></i> Date</h4>
              <span class="">From:</span>
              <datepick
                  v-model="filterDateStart"
                  :hasInputElement="true"
                  :inputAttributes="{readonly: true}"
              ></datepick>
              <span>To:</span>
              <datepick
                  v-model="filterDateEnd"
                  :hasInputElement="true"
                  :inputAttributes="{readonly: true}"
              ></datepick>
            </div>

          </aside>
          <div class="adaptiveAside__buttons">
            <button
              class="semicircleBtn semicircleBtn-border"
              type="button"
              name="button"
              @click='closeSortAside'
              >Close</button>
            <button class="semicircleBtn" type="button" @click="resetAll">Reset</button>
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
      selectedFilterTab:1,


      searchName: '',
      filterTags: [],
      isListTags: false,


      dateStart: this.$store.state.eventModule.listFilterParams.date_start,
      dateEnd: this.$store.state.eventModule.listFilterParams.date_end,
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
    filterDateStart:{
      set(newValue){
        this.dateStart = newValue;
        this.$store.commit('setEventsFilterProperty', {prop:'date_start', value:newValue});
        this.refreshEvents();
      },
      get(){
        return this.dateStart;
      }
    },
    filterDateEnd:{
      set(newValue){
        this.dateEnd = newValue;
        this.$store.commit('setEventsFilterProperty', {prop:'date_end', value:newValue});
        this.refreshEvents();
      },
      get(){
        return this.dateEnd;
      }
    }

  },
  methods: {

    getImageUrl(url){
      if(url != ""){
        return this.$store.state.imagesUrl + url;
      } else {
        return require('../../assets/images/logo_alt.jpg');
      }
    },
    onScroll(event){
      var scrollTop =window.pageYOffset || document.documentElement.scrollTop;
      let contentHeight = document.documentElement.offsetHeight;
      let listHeight = document.querySelector('#eventList').offsetHeight;


      let bottomOfWindow = (document.documentElement.scrollT || window.scrollY) + window.innerHeight >= document.documentElement.offsetHeight;
      console.log(document.documentElement.scrollTop + window.innerHeight);
      if(bottomOfWindow && !this.isEventListLoader){

        console.log("bottom");
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
    },

    loadEvents(){
      this.$store.dispatch('refreshEventsList');
    },
    refreshEvents(){
      this.$store.commit('clearEventList');
      this.$store.commit('setEventsUrlProperties');
      this.$store.dispatch('refreshEventsList');
    },
    filterByAll(){
      this.selectedFilterTab = 1;
      this.$store.commit('setEventsFilterProperty', {prop:'author', value:''});
      this.refreshEvents();
    },
    filterByUserEvents(){
      this.selectedFilterTab = 2;
      this.$store.commit('setEventsFilterProperty', {prop:'author', value:this.$store.getters.getCurrentUser});
      this.refreshEvents();
    },
    filterBNearestEvents(){
      this.selectedFilterTab = 3;
    },
    closeFilterTagList(){
      this.isListTags = false;
      let tagsString = this.filterTags.join(',');
      tagsString = tagsString.replace('#','%23');
      console.log(tagsString);
      this.$store.commit('setEventsFilterProperty', {prop:'tags', value:tagsString});
      this.refreshEvents();
    },
    clearFilterTags(){
      this.filterTags = [];
      this.$store.commit('setEventsFilterProperty', {prop:'tags', value:''});
      this.refreshEvents();
    },
    resetAll(){
      let currentDate = new Date();
  		let dateString = currentDate.getFullYear() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + ("0" + currentDate.getDate()).slice(-2);


      this.clearFilterTags();
      this.filterDateEnd = '';
      this.filterDateStart = dateString;
      this.filterByAll();
      this.refreshEvents();
    }
  },
  created(){
    this.$store.commit('setEventsUrlProperties');
    this.loadEvents();
    this.$store.dispatch('getTagsListAPI');
    this.$store.commit('setEventLoader', true);
    document.addEventListener('scroll', this.onScroll);

  },
  destroyed(){
    document.removeEventListener('scroll',this.onScroll);
    this.$store.commit('clearEventList');
    this.$store.commit('setEventsUrlProperties');
  },
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';

.eventPageContainer{
  min-height: 101vh;
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
  background: $primary-color;
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
    border: 1px solid rgba(0,0,0,.2);
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
  border: 1px solid rgba(0,0,0,.2);
  padding: 10px 10px;
  cursor: pointer;

  &__item{
    padding-left: 4px;
    font-weight: normal;
    margin-bottom: 6px;
    transition: all .3s;
    &:hover{
      color: $primary-color;
      font-weight: bold;
      border-left: 2px solid $primary-color;
    }
    &-active{
      color: $primary-color;
      font-weight: bold;
      border-left: 2px solid $primary-color;
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
  width: 30%;
  margin-left: auto;
  margin-bottom: 10px;
  padding: 5px 15px;
}
.aside{
  flex-direction: column;
  width: 100%;
  padding-left: 30px;
  margin-bottom: 10px;

  .vdpComponent.vdpWithInput > input {
    border-radius: 3px;
    border: 1px solid rgba(0,0,0,.2);

    width: 100%;
    display: block;
    height: 25px;
    padding: 5px 5px;
  }
  .vdpComponent.vdpWithInput{
    width: 100%;
    margin-bottom: 20px;
  }
  &__title{
    margin-left: 15px;
    padding: 5px 0;
  }
  .vdpClearInput:before{
    color: rgba($primary-color, 1);
    border: 1px solid  rgba($primary-color, 1);;
  }
}

.flexbox {
  display: flex;
  flex-wrap: wrap;
}


.addTagBtn{
  display: inline-block;
  color: $primary-color;
  cursor: pointer;
  margin: 0;
  padding: 0;
}
.eventList{
  width: calc(70% - 30px);
  order: 2;
  position: relative;
  margin-bottom: 50px;

  &__title{
    margin-left: 15px;
  }
}

.shortEvent{
  margin-bottom: 10px;
  border: 1px solid rgba(0,0,0,.2);
  position: relative;
  width: 100%;
  background: #fff;
  display:flex;
  flex-wrap: wrap;
  overflow: hidden;

  &__link{
    display: block;
    height: 100%;
    width: 100%;
  }
  &__avatar{
    width: 30%;
    display: block;
    // background-image: url('https://www.abidcars.com/blog/wp-content/uploads/2015/12/traveling-by-car.jpg');
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

    a{
      text-decoration: none;
      color: #000;
    }
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
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    color: $primary-color;
    margin-left: auto;
    z-index: 3;
  }
  &__icon{
    color: $primary-color;
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
    padding: 40px 10px;
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
