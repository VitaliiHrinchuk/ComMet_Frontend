<template lang="html">
  <div class="userPhotos">
    <h2 class="userPhotos__title">Photos</h2>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>
    <div class="userPhotos__img">
      <img class="" src="../../assets/images/avatar__temp.jpg" alt="">
      <i class="fas fa-search-plus"></i>
    </div>

  </div>
</template>

<script>
export default {
  props:['name'],
  data(){
    return{

    }
  },
}
</script>

<style lang="scss">
.userPhotos{
  display: flex;
  flex-wrap: wrap;

  &__title{
    font-size: 1em;
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: 10px;
    flex-basis: 100%;
  }

  &__img{
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    img {
      max-width: 100%;
      min-height: 100%;
    }
    &:after{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0;
      display: block;
      z-index: 2;
      transition: opacity .3s ease;
    }
    i{
      font-size: 2em;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 3;
      opacity: 0;
      transition: opacity .3s ease;
    }
    &:hover:after{
      opacity: .3;
    }
    &:hover i {
      opacity: 1;
    }
  }
}
</style>
