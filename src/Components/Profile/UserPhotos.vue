<template lang="html">
  <div class="userPhotos">
    <h2 class="userPhotos__title">Photos</h2>
    <div class="modalImage" v-if="isFullScreenImage">
      <i class="modalImage__close fas fa-times" @click="closeFullScreenImage()"></i>
      <img class="modalImage__img" :src='currentModalImage' alt="full screen">
      <span class="modalImage__next" @click='nextPhoto()'>Next</span>
      <span class="modalImage__prev" @click='prevPhoto()'>Prev</span>
    </div>
    <div class="userPhotos__addBlock" v-if="isCurrentUser" @click="isAddWindow = true">
      <i class="fas fa-plus"></i>
    </div>
    <div class="modalWindow" v-if='isAddWindow && isCurrentUser'>
      <div class="modalWindow__content modalWindow__content">
        <div class="addPhotosBlock">
          <div class="addPhotosBlock__control">
            <input class="profileEdit__fileInput"
              type="file"
              accept="image/*"
              ref="imageInput"
              name="avatarInput"
              id="avatarInput"
              @change="showPreview"
              multiple>
            <label class="textButton textButton-smalltext textButton-avatarchange " for="avatarInput"><i class="fas fa-plus"></i> add</label>
            <button class="bigButton bigButton-small bigButton-green" type="button" v-if="newPhotos.length > 0" @click="uploadPhotos"><i class="fas fa-upload"></i> Upload</button>
          </div>
          <div class="addPhotosBlock__container">
            <div
                class="roundImage roundImage-userphotos"
                v-for="photo in newPhotos"
                :style="{ 'backgroundImage': photo }"
                ref="avatarDemo" >
            </div>
          </div>
        </div>
        <span class="modalWindow__close modalWindow__close-maxzindex" @click='isAddWindow = false'><i class="fas fa-times"></i></span>
      </div>
    </div>
    <div
      class="userPhotos__img"
      v-for='(photo, index) in userPhotos'
      @click="setFullScreenImage(photo,index)"
      :style="{ 'backgroundImage': 'url(\'' + photo + '\')' }" >
      <!-- <img class="" alt="userPhoto"> -->
      <i class="fas fa-search-plus"></i>

    </div>

  </div>
</template>

<script>
export default {
  props:['name', "isCurrentUser"],
  data(){
    return{
      userPhotos: [require('../../assets/images/avatar__temp.jpg'),
                   'https://media.gettyimages.com/photos/jaipur-the-pink-hawa-mahal-background-picture-id827349644',
                   require('../../assets/images/avatar__temp3.jpg'),
                   require('../../assets/images/avatar__temp.jpg'),
                                require('../../assets/images/avatar__temp2.jpg'),
                                require('../../assets/images/avatar__temp3.jpg')],
      currentModalImage: '',
      currentModalImageIndex: 0,
      isFullScreenImage: false,
      isAddWindow: false,

      newPhotos: []
    }
  },
  methods: {
    setFullScreenImage(src, index){
      this.isFullScreenImage = true;
      this.currentModalImage = src;
      this.currentModalImageIndex = index;
    },
    nextPhoto(){
      if(this.userPhotos.length == (this.currentModalImageIndex+1)){
        this.currentModalImageIndex = 0;
      } else {
        this.currentModalImageIndex++;
      }

      this.currentModalImage = this.userPhotos[this.currentModalImageIndex];

    },
    prevPhoto(){
      console.log(this.userPhotos.length + ' its ok');
      if((this.currentModalImageIndex-1) < 0){
        this.currentModalImageIndex = this.userPhotos.length - 1;
      } else {
        this.currentModalImageIndex--;
      }
      console.log(this.currentModalImageIndex);
      this.currentModalImage = this.userPhotos[this.currentModalImageIndex];
    },
    closeFullScreenImage(){
      this.isFullScreenImage = false;
    },
    showPreview(){

      console.log(this.newPhotos);
      // let reader = new FileReader();
      // reader.onload = e =>{
      //   console.log(e);
      //   this.newPhotos.push("url(" + e.target.result + ")");
      //   // this.$refs.avatarDemo.style.backgroundImage = "url(" + e.target.result + ")";
      // }

      let photos = this.$refs.imageInput.files;
      for (let i = 0; i < photos.length; i++) {
        let reader = new FileReader();
        reader.onload = e =>{
          console.log(e);
          this.newPhotos.push("url(" + e.target.result + ")");
          // this.$refs.avatarDemo.style.backgroundImage = "url(" + e.target.result + ")";
        }
        reader.readAsDataURL(photos[i]);
      }
    },
    uploadPhotos(){
      // this.newPhotos = [];

      let photos = this.$refs.imageInput.files;
      console.log(photos);
      for (let i = 0; i < photos.length; i++) {
        this.sendPhoto(photos[i]);
      }
    },
    sendPhoto(photo){
      let formData = new FormData();
      formData.append("photo_user", this.$store.getters.getCurrentUser);
      formData.append("img_value ", photo);
      this.$axios.post("https://comeandmeet.herokuapp.com/accounts/photos/",formData).then(response=>{
        console.log(response);
      }, error=>{
        //error
      });
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
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
    background-position: center center;
    background-color: gray;
    background-size: cover;
    width: 120px;
    height: 120px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 8px;
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
  &__addBlock{
    width: 120px;
    height: 120px;
    border-radius: 5px;
    border: 3px dashed $primary-color;
    cursor: pointer;
    margin-right: 8px;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
    i{
      font-size: 2em;
      color: $primary-color;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      z-index: 3;
    }
  }

}
.addPhotosBlock{
  padding: 20px;
  &__container{
    display: flex;
    flex-wrap: wrap;
  }
  &__control{
    display: flex;
  }
}
@media screen and (max-width: 560px){
	.userPhotos{
    &__img{
      margin-right: 5px;
      width: 118px;
      height: 118px;
    }
  }
}
@media screen and (max-width: 480px){
	.userPhotos{
    &__img{
      margin-right: 5px;
      width: calc(50% - 5px);
      height: 90px;
      align-self: center;
    }
  }
}
</style>
