<template lang="html">
  <div class="">
    <div class="loaderBg" v-if="isScreenLoader">
      <div class="screenLoader">
        <div class="screenLoader screenLoader-inner"></div>
      </div>
    </div>

    <div class="container eventPageContainer" >



      <div class="title text-gray" >
        <h1>Events</h1>
      </div>

      <div class="flexbox ">
        <div class="eventSearch">
          <h3 class="eventSearch__title text-gray">Search</h3>
          <div class="eventSearch__input shadow radius-5px bg-white">
            <input class="input input-eventSearch" type="text" name="" placeholder="Search by name" v-model='searchName'>
          </div>

        </div>


        <!-- <div class="" v-for="event in eventsList">
          {{event.name}}
        </div> -->


        <div id="eventList" class="eventList">
            <!-- <div class="screenLoader screenLoader-list" v-if="!isEventListLoader">
              <div class="screenLoader screenLoader-inner"></div>
            </div> -->
            <span class="loader loader-list" v-if="isEventListLoader"></span>
          <h3 class="text-gray eventList__title">Events list</h3>
          <div class="shortEvent shadow radius-5px bg-white" v-for="event in filteredEventList" >
            <h3 class="shortEvent__title">{{event.name}}</h3>
            <div class="shortEvent__date">
              <span>{{dateToString(event.date)}}</span>
            </div>
            <div class="shortEvent__tags" >
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
            <div class="shortEvent__place">
              <span class="shortEvent__bold text-gray">Place: </span>{{event.city}}
            </div>
            <div class="shortEvent__members">
                <span class="shortEvent__bold text-gray">Members:</span> {{event.membersCount}}
            </div>
            <button class="textButton shortEvent__btn " type="button" name="button" @click='showEvent(event.id)'>Event Page</button>
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
            <div class="tagList radius-5px shadow" >
              <span class="tagList__close" @click='openList = false'><i class="fas fa-times"></i></span>
              <h2 class="tagList__title">Tags</h2>
              <div class="creationSection__checkTag" v-for='tag in tagList'>
                <input class="" type="checkbox" name="" :id='tag.name' :value="tag.name" v-model='filterTags'>
                <label :for="tag.name">{{tag.name}}</label>
              </div>

            </div>
          </div>

        </aside>


      </div>


    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      // eventsList: []

      searchName: '',
      filterTags: [],
      openList: false
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
    }
  },
  methods: {
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

      let resultDate = new Date(date);

      return resultDate.getDay() + ' ' +monthNames[resultDate.getMonth()];
    },
    showEvent(id){
      this.$router.push(`/Event/${id}`);
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
.eventPageContainer{

}
.title{
  margin: 0 auto;
  padding-top: 10px;
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
  order: 1;

  &__title{
    margin: 0;
    padding: 0;
    margin-bottom: 10px;
    margin-left: 15px;
  }

  &__input{
    padding: 13px 13px;
  }

}

.eventSort{

  margin-bottom: 15px;

  &-tags{
    padding: 15px 15px;
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

.aside{
  flex-direction: column;
  width: 30%;
  margin-top: 15px;
  padding-left: 30px;
  order: 3;

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
  margin-top: 15px;
  width: calc(70% - 30px);
  order: 2;
  position: relative;

  &__title{
    margin-left: 15px;
  }
}

.shortEvent{
  margin-top: 10px;
  padding: 15px 15px;
  width: 100%;
  display:flex;
  flex-wrap: wrap;

  &__title{
    font-weight: normal;
  }
  &__tags{
    width: 90%;
    margin: 15px 0 10px 0;
  }
  &__date{
    font-size: .9em;
    margin-left:auto;
  }
  &__place{
    width: 100%;
    margin-bottom: 10px;
  }
  &__members{
    width: 100%;
  }
  &__bold{
    font-weight: bold;
  }
  &__btn{
    background: none;
    border: none;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    color: #1ca9f0;
    margin-left: auto;
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
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding: 0 0;
  }
  .eventList{
    width: 100%;
    order: 3;
    padding-left: 0;
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
