<template>

      <!-- :style="{ 'backgroundImage': 'url(\'' + sliderImage + '\')' }" -->
      <!-- <div id="slider" class="radius-5px" >
        <div class="slider  shadow" >
          <i class="slider__arrow fas fa-chevron-circle-left" v-on:click='prevSlide'></i>
          <h1 class="">{{sliderTitles[currentSlide-1]}}</h1>
          <div class="images">
            <transition-group name="slide" tag="div">
              <div class="images__item" :style="{ 'backgroundImage': 'url(\'' + image + '\')' }" alt="" v-for="(image,key) in imageList" v-bind:key="key+0" v-show="currentSlide-1 == key"></div>
            </transition-group>
          </div>
          <i class="slider__arrow fas fa-chevron-circle-right" v-on:click='nextSlide'></i>
        </div>
      </div> -->
  <div class="homepage">
    <div class="homeHeader">
      <!-- <h1 class="homeHeader__title">ComMet is <span class="homeHeader__slidertext">to meet people in real life</span></h1> -->
      <h1 class="homeHeader__title">Through ComMet To Real Meetings</span></h1>
      <h2 class="homeHeader__subtitle">Social Network for Events</h2>
      <router-link class="  bigButton bigButton-small bigButton-capitalize homeHeader__link" :to="{ path: '/login/signUp'}">SignUp</router-link>
    </div>
    <section class="homeSection">
      <h1 class="homeSection__title">Do what you like</h1>
      <h2 class="homeSection__subtitle">with other people</h2>
      <div class="homeTags">
        <div class="homeTags__item">
          <i class="fas fa-music"></i>
          <span>Music</span>
        </div>
        <div class="homeTags__item">
          <i class="fas fa-plane"></i>
          <span>Travel</span>
        </div>
        <div class="homeTags__item">
          <i class="fas fa-business-time"></i>
          <span>Business</span>
        </div>
        <div class="homeTags__item">
          <i class="fas fa-flask"></i>
          <span>Science</span>
        </div>
        <div class="homeTags__item">
          <i class="fas fa-volleyball-ball"></i>
          <span>Sport</span>
        </div>
        <div class="homeTags__item">
          <i class="far fa-comments"></i>
          <span>Just Chat</span>
        </div>
        <div class="homeTags__item">
          <i class="fas fa-tags"></i>
          <span>And more</span>
        </div>
      </div>
    </section>
    <section class="homeSection">
      <h1 class="homeSection__title">How it works</h1>
      <div class="homeStepContainer">
        <span class="homeStep__step">Step 1</span>
        <div class="homeStep">
          <img class="homeStep__img" src="../../assets/images/home-login.png" alt="">
          <!-- <div class="homeStepDesc">
            <div class="homeStepDesc__text">
              <h3>SignUp</h3>
              <span>For Free</span>
            </div>
            <span class="homeStepDesc__line"></span>
          </div> -->
          <div class="homeStep__txt">
            <h3>SignUp</h3>
            <span>For Free</span>
          </div>
        </div>
        <i class="homeStep__arrow fas fa-long-arrow-alt-down"></i>
        <span class="homeStep__step">Step 2</span>
        <div class="homeStep">
          <img class="homeStep__img" src="../../assets/images/home-search.png" alt="">
          <!-- <div class="homeStepDesc">
            <div class="homeStepDesc__text">
              <h3>Find</h3>
               <span>What you like</span>
              </div>
              <span class="homeStepDesc__line"></span>
            </div> -->
            <div class="homeStep__txt">
              <h3>Find</h3>
            <span>What you like</span>
          </div>
          </div>
          <span class="homeStepContainer__or">OR</span>
          <div class="homeStep">
            <img class="homeStep__img" src="../../assets/images/home-add.png" alt="">
            <!-- <div class="homeStepDesc homeStepDesc-right">
              <span class="homeStepDesc__line"></span>
              <div class="homeStepDesc__text">
                <h3>Create</h3>
                <span>You Own</span>
              </div>
            </div> -->
            <div class="homeStep__txt">
              <h3>Create</h3>
            <span>Your Own</span>
          </div>
          </div>
           <i class="homeStep__arrow fas fa-long-arrow-alt-down"></i>
          <span class="homeStep__step">Step 3</span>
          <div class="homeStep">
            <img class="homeStep__img" src="../../assets/images/home-meet.png" alt="">
            <!-- <div class="homeStepDesc">
              <div class="homeStepDesc__text">
                <h3>Meet</h3>
              </div>
              <span class="homeStepDesc__line"></span>
            </div> -->
            <div class="homeStep__txt">
             <h3>Meet</h3>
          </div>
          </div>
      </div>
    </section>
  </div>
 
</template>

<script>


export default {
  data(){
    return{
      currentSlide: 1,
      sliderTitles: [
        'Travel and meet new friends with ComMet',
        'Create or search Events and enjoy them with other people',
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
    console.log(this.$router);
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';

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


.homepage{
  background: #b1b0ba; /* Old browsers */
  background: -moz-linear-gradient(top, #b1b0ba 0%, #b1b0ba 3%, #0052d4 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(top, #b1b0ba 0%,#b1b0ba 3%,#0052d4 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to bottom, #b1b0ba 0%,#b1b0ba 3%,#0052d4 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b1b0ba', endColorstr='#0052d4',GradientType=0 ); /* IE6-9 */

  display: block;
  letter-spacing: 0.12em;
}
.homeHeader{
  color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 70vh;
  
  &__title{
    margin-top: 10%;
    font-weight: 500;
    margin-bottom: 20px;
  }
  &__subtitle{
    margin-bottom: 40px;
    font-weight: 300;
    font-size: 1.2em;
  }
  &__slidertext{
    font-weight: bold;
  }
  &__link{
    background: $light-green;
    box-shadow: 5px 5px  10px 0 rgba(0,0,0,.2);
    padding: 5px 15px;
    font-size: 1.2em;
    font-weight: 400;
  }
}
.homeSection{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 50px;
  &__title{
    margin-bottom: 15px;
    font-size: 1.6em;
    text-transform: capitalize;

  }
  &__subtitle{
    font-weight: 300;
    font-size: 1.2em;
    margin-bottom: 30px;
    text-transform: capitalize;
  }

}
.homeTags{
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  &__item{
    width: calc(33% - 25px);
  
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    justify-content: center;
    transition: background .3s;
    &:hover{
      background: rgba(255,255,255,.1);
    }
    span{
      font-weight: 300;
      font-size: 1.6em;
      text-transform: uppercase;
    }
    i{
      font-size: 3em;
      margin-bottom: 10px;
    }
  }
}
.homeStepContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
  &-row{
    flex-direction: row;
  }
  &__or{
    margin: 15px 30px;
  }
}

.homeStep{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
     margin: 30px 0;
    &__img{
      width: 130px;
      height: 130px;
      z-index: 3;
      margin: 10px auto;
    }
    &__txt{
      text-align: center;
        h3{
          font-size: 1.1em;
        }
        span{
          font-weight: 300;
          font-size: .8em;
        }
    }
    &__arrow{
      font-size: 4em;
      opacity: .7;
      align-self: center;
    }
    &__step{
      margin: 10px 0;
      font-weight: bold;
      font-size: 1.3em;
      align-self: center;
    }
  }
.homeStepDesc{
      position: absolute;
      top: 50%;
      right:130px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      text-transform: capitalize;
      &-right{
        right: -260px;
      }
      &__line{
        display: block;
        width: 190px;
        content: '';
        border-bottom: 5px dotted #fff;
        height: 1px;
        z-index: 2;
      }
      &__text{
        margin: 10px;
        min-width: 100px;
        h3{
          font-size: 1.1em;
        }
        span{
          font-weight: 300;
          font-size: .8em;
        }
      }
}



@media screen and (max-width: 960px){
	
}

@media screen and (max-width: 800px){
  .homeHeader{

    font-size: .8em;
    &__title{
      margin-top: 20%;
      font-size: 1.1em;
    }
    &__subtitle{
      font-size: 1em;
    }
  }
  .homeSection{
    font-size: .8em;
  }
  .homeTags{
    &__item{
      width: calc(50% - 30px);
      padding: 30px 0;
    }
  }
  .homeStepContainer{
    // align-items: flex-end;
    width: 100%;
  }
  .homeStep{
    // align-items: flex-end;
    &__img{
      width: 60px;
      height: 60px;
    }
  }
}
@media screen and (max-width: 560px){
    .homeHeader{
    &__title{
      margin-top: 30%;
    }

  }
}


@media screen and (max-width: 480px){

  // .homeStepDesc{
  //   top: 120%;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   &__line{
  //     width: 0;

  //   }
  //   &__text{
  //     min-width: 70px;
  //     font-size: .9em;
  //   }
  // }
}


  @media screen and (max-width:  768px){
    .slider{
      font-size: .5em;
    }
  }


</style>
