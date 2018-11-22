<template lang="html">

      <!-- :style="{ 'backgroundImage': 'url(\'' + sliderImage + '\')' }" -->
      <div id="slider" class="radius-5px" >
        <div class="slider  shadow" >
          <i class="slider__arrow fas fa-chevron-circle-left" v-on:click='prevSlide'></i>
          <h1 class="">{{sliderTitles[currentSlide-1]}}</h1>
          <div class="images">
            <transition-group name="slide" tag="div">
              <div class="images__item" :style="{ 'backgroundImage': 'url(\'' + image + '\')' }" alt="" v-for="(image,key) in imageList" v-bind:key="key" v-show="currentSlide-1 == key"></div>
            </transition-group>
          </div>
          <i class="slider__arrow fas fa-chevron-circle-right" v-on:click='nextSlide'></i>
        </div>
      </div>



</template>

<script>


export default {
  data(){
    return{
      currentSlide: 1,
      sliderTitles: [
        'Travel and meet new friends with ComMet',
        'Create or search Events and enjoy them with others people',
        'Use ComMet to meet people in real life instead of Socials Networks'
      ],
      imageList: [
        require(`../../assets/images/sliderbg_1.jpg`),
        require(`../../assets/images/sliderbg_2.jpg`),
        require(`../../assets/images/sliderbg_3.jpg`)
      ]
    }
  },

  methods: {
    nextSlide(){
      if(this.currentSlide == 3){
        this.currentSlide = 1;
      } else {
        this.currentSlide++;
      }
    },
    prevSlide(){
      if(this.currentSlide == 1){
        this.currentSlide = 3;
      } else {
        this.currentSlide--;
      }
    }
  },

  created(){
    setInterval(this.nextSlide,5000);
    console.log(this.$store.getters.getIsAuthorized);
  }
}
</script>

<style lang="css">


  .slider{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background-color: rgba(0,0,0,.6);
    color: #fff;
    height: 500px;
    text-align: center;
    font-size: .8em;
  }
  .images{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    z-index: -1;
  }
  .images__item{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;

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

  .slide-enter-active {
    transition: all .4s ease;
  }
  .slide-leave-active {
    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  @media screen and (max-width:  768px){
    .slider{
      font-size: .5em;
    }
  }


</style>
