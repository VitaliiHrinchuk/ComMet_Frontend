<template lang="html">
  <div class="">
    <div class="eventHeader" id="eventHeader">
      <div class="eventHeader__title">
        <h1 >Прогулка по Берлину</h1>
        <div class="tag tag-red">
          #Music
        </div>
        <div class="tag tag-green">
          #Talking
        </div>
        <div class="tag tag-violet">
          #Walk
        </div>
      </div>
      <button class="bigButton shadow" type="button" name="button">Join Event</button>
    </div>
    <div class="container eventContainer">
      <div class="eventBox eventBox-place">
          <h2 class="eventBox__title">Place</h2>
          <div class="eventBox__content">
            <p>Город Берлин, Улица Германская 3 lorem</p>
          </div>
          <button class="textButton" type="button" name="button">Open map</button>
      </div>

      <div class="eventBox eventBox-date">
          <h2 class="eventBox__title">Date</h2>
          <div class="eventBox__content eventBox__content-date">
            <p>November 26, 2018</p>
          </div>
      </div>

      <div class="eventBox eventBox-author">
          <h2 class="eventBox__title">Author</h2>
          <div class="eventBox__content">
            <div class="author">
              <img class="author__avatar" src="../../assets/images/temp-avatar.jpg" alt="">

              <div class="userRate">
                <h3 class="author__name">John Doe</h3>
                <i class="far fa-star userRate__star userRate__star-fill"></i>
                <i class="far fa-star userRate__star userRate__star-fill"></i>
                <i class="far fa-star userRate__star userRate__star-fill"></i>
                <i class="far fa-star userRate__star "></i>
                <i class="far fa-star userRate__star "></i>
              </div>
            </div>
          </div>
          <button class="textButton" type="button" name="button">Profile</button>
      </div>
      <div class="helpContainer">
        <div class="eventBox eventBox-desc">
            <h2 class="eventBox__title">Description</h2>
            <div class="eventBox__content">
              <p>  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus fugit repellat alias quo fugiat. Accusantium dolorum voluptas ipsa maiores maxime eos, recusandae voluptatum, doloribus quia temporibus. Maiores cum ducimus recusandae aspernatur unde explicabo labore quisquam voluptate error aliquid incidunt quas, fugit omnis quia neque asperiores, ut earum, quis tenetur sequi necessitatibus assumenda eius mollitia vero. Dolorem repudiandae illo, voluptate eveniet provident, nesciunt ratione, iste tempora quis nemo omnis cupiditate. Id similique maiores, eveniet consequuntur tempore, velit numquam rerum laudantium provident quidem ex illo. Deleniti quia repudiandae, quae hic recusandae facere nobis commodi voluptates temporibus rem pariatur aut, assumenda voluptate dolor!
              </p>
            </div>
            <button class="textButton" type="button" name="button">More</button>
        </div>

        <div class="eventBox eventBox-plan">
            <h2 class="eventBox__title">Plan</h2>
            <div class="eventBox__content">
              <div class="arrowContainer">
                <i class="arrowContainer__arrow arrowContainer__arrow-left fas fa-angle-left"></i>
                <i class="arrowContainer__arrow arrowContainer__arrow-right fas fa-angle-right"></i>
              </div>
              <div class="planContainer">

                <div class="plan plan-green shadow">
                  <h3 class="plan__time">8:00</h3>
                  <p class="plan__desc">Meeting</p>
                </div>
                <div class="plan plan-red shadow">
                  <h3 class="plan__time">10:00</h3>
                  <p class="plan__desc">Coffee</p>
                </div>
                <div class="plan plan-violet shadow">
                  <h3 class="plan__time">12:00</h3>
                  <p class="plan__desc">Go to the cinema</p>
                </div>

              </div>
            </div>
        </div>
      </div>


      <div class="eventBox eventBox-members">
          <h2 class="eventBox__title">Members</h2>
          <div class="eventBox__content">
            <div class="author author-list">
              <img class="author__avatar" src="../../assets/images/temp-avatar.jpg" alt="">
              <h3 class="author__name">John Doe</h3>
            </div>
            <div class="author author-list">
              <img class="author__avatar" src="../../assets/images/temp-avatar.jpg" alt="">
              <h3 class="author__name">John Doe</h3>
            </div>
            <div class="author author-list">
              <img class="author__avatar" src="../../assets/images/temp-avatar.jpg" alt="">
              <h3 class="author__name">John Doe</h3>
            </div>
            <div class="author">
              <img class="author__avatar" src="../../assets/images/temp-avatar.jpg" alt="">
              <h3 class="author__name">John Doe</h3>
            </div>
          </div>
          <div class="eventBox__members">
            <span>12 members</span>
            <button class="textButton" type="button" name="button">More</button>
          </div>
          <button class="bigButton bigButton-members shadow" type="button" name="button">CHAT</button>
      </div>



    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      headerCoord: 0
    }
  },
  computed:{
    topCoordinate(){
      return this.$el.getBoundingClientRect().top;
    }
  },
  methods:{
    stickyHeader(){
      let header = document.getElementById('eventHeader');

      let sticky = 50;
      console.log(sticky);

      if(window.pageYOffset >= sticky){
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  },
  mounted(){

    this.$nextTick(()=>{
      window.addEventListener('scroll', this.stickyHeader);
    });

  },

  destroyed(){
    window.removeEventListener('scroll',this.stickyHeader);
  }
}
</script>

<style lang="scss">
$primary-color: #1ca9f0;
$green-color: #2DDAA5;
$red-color: #FF00AE;
$violet-color: #B34EE9;
$blue-color: #3AE2CE;
  .sticky{
    position: fixed;
    top: 0;
    margin-top: 0;
  }
  .sticky + .eventContainer{
    padding-top: 109px;
  }
  .bigButton{
    margin-left: auto;
    height: 45px;
    width: 150px;
    background: $primary-color;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    font-size: 1.1em;
    align-self: center;
    cursor: pointer;
    letter-spacing: 0.07em;
    &-members{
      width: 60%;
      margin-right: auto;
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }
  .textButton{
    border:none;
    padding: 0 10px;
    margin: 0;
    border-radius: 5px;
    background: transparent;
    text-transform: uppercase;
    color: $primary-color;
    font-weight: bold;
    cursor: pointer;
    height: 28px;
    align-self: flex-end;
    outline: none;
    &:focus{
      background: rgba(28,169,240,.09);
    }
    &:active{
      background: rgba(28,169,240,.04);
    }
  }
  .eventHeader{

    background: #fff;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 15px 15px;
    z-index: 1;
    &__title{

      h1{
        font-weight: normal;
        margin-bottom: 10px;
      }
    }
    &__button{

      // margin-left: auto;
      // height: 45px;
      // width: 150px;
      // background: $primary-color;
      // border: none;
      // border-radius: 5px;
      // text-transform: uppercase;
      // color: #fff;
      // font-weight: bold;
      // font-size: 1.1em;
      // align-self: center;
      // cursor: pointer;
      //

    }
  }
  .helpContainer{
    width: 55%;
    order: 4;
  }
  .eventContainer{

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
  }
  .eventBox{
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    margin-top: 30px;
    padding: 16px 16px;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    &__title{
      // color: $primary-color;
      margin-bottom: 8px;
      font-size: .8em;
      text-transform: uppercase;
    }
    &__content{
      padding: 5px 0;
      margin-top: auto;
      margin-bottom: auto;
      overflow: hidden;
      position: relative;
      &-date{
        text-align: center;
      }
    }

    &__members{
      font-size: .85em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
    }
    &-place{
      width: calc(35% - 30px);
      order: 1;
    }
    &-date{
      width: calc(20% - 30px);
      order: 2;
    }
    &-author{
      width:  calc(30% - 30px);
      order: 3;
    }
    &-desc{
      // width: calc(60% - 30px);
      align-self: flex-start;

    }
    &-members{
      width:  calc(30% - 30px);
      align-self: flex-start;
      order: 5;
    }
    &-plan{
      // width: calc(60% - 30px);
      order: 6;
    }
  }
  .author{
    padding: 5px 0;
    clear: both;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &__avatar{

      float: left;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    &__name{
      font-weight: 500;
      margin-top: 5px;
      font-size: .95em;
      color: #000;
    }
    &-list{
      border-bottom: 1px solid rgba(0,0,0,.1);
      padding: 10px 0;
    }
  }

  .arrowContainer{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
    &__arrow{
      cursor: pointer;
      font-size: 2em;
      color: $primary-color;
      &-left{
        margin-right: auto;
      }
      &-right{
        margin-left: auto;
        right: 0;
      }
    }
  }
  .planContainer{
    display: flex;
    justify-content: flex-start;
    padding: 0 30px;
    width: 1000px;
    align-items: center;
    overflow: hidden;
    z-index: 999;
    &__arrow{
      font-size: 2em;
      color: $primary-color;
      cursor: pointer;
      &-left{
        margin-right: auto;
      }
      &-right{
        margin-left: auto;
      }
    }
  }

  .plan{
    min-width: 130px;
    margin-right: 15px;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    color: #fff;
    font-size: .9em;
    padding: 10px 10px;
    cursor: pointer;
    &-green{
      background: $green-color;
    }
    &-red{
      background: $red-color;
    }
    &-violet{
      background: $violet-color;
    }
    &-blue{
      background: $blue-color;
    }
    &__time{
      padding: 0;
      margin: 0;
    }
    &__desc{
      padding: 0;
      margin: 0;
    }
  }


  @media screen and (max-width: 1920px){

  }

  @media screen and (max-width: 1600px){


  }

  @media screen and (max-width: 1368px){

  }
  @media screen and (max-width: 1120px){
    .eventBox{
      font-size: .9em;
    }
  }
  @media screen and (max-width: 960px){
    .eventHeader{
      position: relative;
    }
    .sticky + .eventContainer{
      padding-top: 0;
    }
    .userRate{
      font-size: .9em;
    }
    .eventBox{
      font-size: .9em;
      &-place{
        width: calc(40% - 30px);
      }
      &-date{
        width: calc(30% - 30px);
      }
      &-author{
        width: calc(30% - 30px);

        .author{
          justify-content: center;
          align-items: center;
          float: none;
          text-align: center;
          &__avatar{
            margin-right: 0;
          }
        }
      }
      &-members{
        width: calc(40% - 30px);
      }
      &-desc{
        width: 100%;
      }
      &-plan{
        width: 100%;
      }
    }
    .helpContainer{
      width: calc(60% - 30px);
      margin-right: 30px;
    }
  }

  @media screen and (max-width: 768px){
    .eventHeader{
      position: relative;
      margin-top: 30px;
    }
    .sticky + .eventContainer{
      padding-top: 0;
    }
    .bigButton{
      width: 100%;
      height: 35px;
      margin-top: 30px;
    }
    .eventBox{

      &-place{
        width: 100%;
        margin-right: 0;
      }
      &-date{
        width: 100%;
        margin-right: 0;
      }
      &-author{
        width: 100%;
        margin-right: 0;
      }
      &-members{
        width: 100%;
        margin-right: 0;
      }
      &-desc{
        width: 100%;
      }
      &-plan{
        width: 100%;
      }
    }
    .helpContainer{
      width: 100%;
      margin-right: 0;
    }
  }
  @media screen and (max-width: 560px){

  }


  @media screen and (max-width: 480px){

  }
</style>
