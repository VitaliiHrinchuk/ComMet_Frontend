<template lang="html">
  <div class="">
    <div class="eventHeader">
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
      <button class="eventHeader__button shadow" type="button" name="button">Join Event</button>
    </div>
    <div class="container eventContainer">
      <div class="eventBox eventBox-place">
          <h2 class="eventBox__title">Place</h2>
          <div class="eventBox__content">
            <p>Город Берлин, Улица Германская 3 lorem</p>
          </div>
          <button class="eventBox__button" type="button" name="button">Open map</button>
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
              <h3 class="author__name">John Doe</h3>
              <div class="userRate">
                <i class="far fa-star userRate__star userRate__star-fill"></i>
                <i class="far fa-star userRate__star userRate__star-fill"></i>
                <i class="far fa-star userRate__star userRate__star-fill"></i>
                <i class="far fa-star userRate__star "></i>
                <i class="far fa-star userRate__star "></i>
              </div>
            </div>
          </div>
          <button class="eventBox__button" type="button" name="button">Profile</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="scss">
$primary-color: #1ca9f0;
  .eventHeader{
    background: #fff;
    display: flex;
    padding: 15px 15px;
    margin-top: 15px;
    &__title{

      h1{
        font-weight: normal;
        margin-bottom: 10px;
      }
    }
    &__button{
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


    }
  }
  .eventContainer{
    padding-top: 30px;
    display: flex;
    justify-content: center;
  }
  .eventBox{
    display: flex;
    flex-direction: column;

    margin-right: 30px;
    padding: 16px 16px;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    &__title{
      // color: $primary-color;
      font-size: .8em;
      text-transform: uppercase;
    }
    &__content{
      padding: 3px 0;
      margin-top: auto;
      margin-bottom: auto;
      p {
        margin: 0;
        padding: 0;
      }
      &-date{
        text-align: center;
      }
    }
    &__button{
      border:none;
      border-radius: 5px;
      background: transparent;
      text-transform: uppercase;
      color: $primary-color;
      font-weight: bold;
      cursor: pointer;
      height: 28px;
      width: 100px;
      align-self: flex-end;
      outline: none;
      &:focus{
        background: rgba(28,169,240,.09);
      }
      &:active{
        background: rgba(28,169,240,.04);
      }
    }
    &-place{
      width: calc(30% - 30px);
    }
    &-date{
      width: calc(20% - 30px);
    }
    &-author{
      width:  calc(25% - 30px);
    }
  }
  .author{
    padding: 5px 0;
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
    }

  }
  .userRate{
    color: #2DDAA5;
    &__star{
      font-weight: normal;
    }
    &__star-fill{
      font-weight: bold;
    }

  }
</style>
