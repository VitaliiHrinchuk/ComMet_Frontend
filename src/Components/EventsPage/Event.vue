<template lang="html">
  <div class="">
    <div class="eventHeader" id="eventHeader">
      <div class="eventHeader__title">
        <h1 >Прогулка по Берлину</h1>
        <div class="tag">
          #Music
        </div>
        <div class="tag">
          #Talking
        </div>
        <div class="tag">
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
              <div class="planContainer">
                <i class="planContainer__arrow planContainer__arrow-left fas fa-angle-left"></i>
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
                <i class="planContainer__arrow planContainer__arrow-right fas fa-angle-right"></i>
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
  methods:{
    stickyHeader(){
      let header = document.getElementById('eventHeader');

      let sticky = this.headerCoord;
      console.log(sticky);

      if(window.pageYOffset >= sticky){
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  },
  mounted(){
    window.onscroll = this.stickyHeader;
    this.headerCoord = document.getElementById('eventHeader').offsetTop;
  }
}
</script>

<style lang="scss">
$primary-color: #1ca9f0;
  .sticky{
    position: fixed;
    top: 0;
    margin-top: 0;
  }
  .sticky + .eventContainer{
    padding-top: 99px;
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
    width: 100%;
    padding: 15px 15px;
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

    }
    &-date{
      width: calc(20% - 30px);
    }
    &-author{
      width:  calc(30% - 30px);

    }
    &-desc{
      // width: calc(60% - 30px);
      align-self: flex-start;
    }
    &-members{
      width:  calc(30% - 30px);
      align-self: flex-start;
    }
    &-plan{
      // width: calc(60% - 30px);
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
  .userRate{
    color: #2DDAA5;
    align-self: center;
    &__star{
      font-weight: normal;
    }
    &__star-fill{
      font-weight: bold;
    }

  }
  .planContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    &__arrow{
      font-size: 2em;
      color: $primary-color;
      &-left{
        margin-right: auto;
      }
      &-right{
        margin-left: auto;
      }
    }
  }
  .plan{
    width: 130px;
    margin-right: 15px;
    border-radius: 10px;

    text-align: center;
    color: #fff;
    font-size: .9em;
    padding: 10px 3px;
    cursor: pointer;
    &-green{
      background: #2DDAA5;
    }
    &-red{
      background: #FF00AE;
    }
    &-violet{
      background: #B34EE9;
    }
    &-blue{
      background: #3AE2CE;
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
</style>
