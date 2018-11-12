<template lang="html">
  <main>
    <div class="container">
      <div id="slider" class="slider-bg radius-5px">
        <div class="slider  shadow radius-5px slider-bg" :style="{ 'backgroundImage': 'url(\'' + image + '\')' }">
          <i class="slider__arrow fas fa-chevron-circle-left"></i>
          <h1 class="">Travel and meet new friends with ComMet</h1>
          <!-- <img src="./sliderbg.jpg" alt=""> -->
          <i class="slider__arrow fas fa-chevron-circle-right"></i>
        </div>
      </div>
    </div>
  </main>
</template>

<script>


export default {
  data(){
    return{
      image: require('../../assets/images/sliderbg.jpg')
    }
  }
}
</script>

<style lang="css">
  .slider-bg {
    /* background-image: url('/assets/images/sliderbg.jpg'); */
    background-size: cover;
    background-position: center center;
  }
  .slider{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;

    background-color: rgba(0,0,0,.5);
    color: #fff;
    height: 500px;
    text-align: center;
    font-size: .8em;
  }
  .slider__arrow{
    font-size: 30px;
    color: rgba(255,255,255,.3);
    cursor: pointer;
    -webkit-transition: color .3s;
    -o-transition: color .3s;
    transition: color .3s;
  }
  .slider__arrow:hover{
    color: rgba(255,255,255,1);
  }

</style>
