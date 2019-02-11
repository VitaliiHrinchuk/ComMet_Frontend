<template lang="html">
  <div class="">
    <div class="userPhotos">
      <div class="blockLoader " v-if="downloadPercent !== 100 && userPhotos.length > 0">
        <div class="screenLoader screenLoader-bottom">
          <div class="screenLoader screenLoader-inner">
          </div>
        </div>
        <span class="blockLoader__progress blockLoader__progress-bottom">{{downloadPercent}}%</span>
      </div>
      <h2 class="userPhotos__title">Photos</h2>
      <span
          class="note"
          v-if='userPhotos.length == 0 && !isCurrentUser'
          >User has no photos</span>
      <div class="modalImage" v-show="isFullScreenImage">
        <i class="modalImage__close fas fa-times" @click="closeFullScreenImage()"></i>
        <img class="modalImage__img" ref="modalImage" alt="full screen">
        <span class="modalImage__next" @click='nextPhoto()'><i class="fas fa-angle-right"></i></span>
        <span class="modalImage__prev" @click='prevPhoto()'><i class="fas fa-angle-left"></i></span>
        <div class="blockLoader blockLoader-modalImage" v-if="modalImageLoader">
          <div class="screenLoader screenLoader-light">
          </div>
        </div>
      </div>
      <div class="userPhotos__addBlock" v-if="isCurrentUser" @click="isAddWindow = true">
        <i class="fas fa-plus"></i>
      </div>
      <div class="modalWindow " v-if='isAddWindow && isCurrentUser'>
        <div class="modalWindow__content modalWindow__content-map">
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
              <button class="bigButton bigButton-small bigButton-green" type="button" v-if="previewPhotos.length > 0" @click="uploadPhotos"><i class="fas fa-upload"></i> Upload</button>
            </div>
            <div class="addPhotosBlock__container">
              <div
                  class="roundImage roundImage-userphotos"
                  v-for="photo in previewPhotos"
                  :style="{ 'backgroundImage': photo.url }"
                  ref="avatarDemo" >
                  <i class="roundImage__icon far fa-trash-alt" @click="removeUploadedPhoto(photo.index)"></i>
              </div>
              <div class="blockLoader" v-if="uploadPercent < 100">
                <div class="screenLoader">
                  <div class="screenLoader screenLoader-inner">
                  </div>
                </div>
                <span class="blockLoader__progress">{{uploadPercent}}%</span>
              </div>
            </div>
          </div>
          <span class="modalWindow__close modalWindow__close-maxzindex" @click='isAddWindow = false'><i class="fas fa-times"></i></span>
        </div>
      </div>
      <div class="modalWindow" v-if="isModalError">
        <div class="modalWindow__content ">
          <div class="errorMessage">
            <i class="errorMessage__icon far fa-times-circle"></i>
            <h2 class="errorMessage__text">Something went wrong, please try again</h2>
            <span class="errorMessage__code" v-if="errorCode"> Error Code  {{errorCode}}</span>
            <div class="errorMessage__buttons">
              <button class="bigButton bigButton-normaltxt bigButton-small creationSection__finishBtn " type="button"
                @click='uploadPhotos()'>
                Try again
              </button>

            </div>

          </div>

          <!-- <span class="modalWindow__close modalWindow__close-maxzindex"><i class="fas fa-times"></i></span> -->
          <button class="textButton modalWindow__close modalWindow__close-button" type="button" @click="isModalError = false">Close</button>
        </div>
      </div>
        <div
          class="userPhotos__img"
          v-for='photo in sortedPhotos'
          @click="setFullScreenImage(photo.index)"
          :style="{ 'backgroundImage': photo.url }" >
          <!-- <img class="" alt="userPhoto"> -->
          <i class="fas fa-search-plus"></i>
       </div>
    </div>
    <button type="button"
      class="textButton textButton-smalltext textButton-center"
      @click="loadPreviewPhotos"
      v-if="previewPhotoCount < userPhotos.length">More</button>
  </div>

</template>

<script>
export default {
  props:['name', "isCurrentUser", "photos"],
  data(){
    return{
      userPhotos: [],
      optimizedSmallPhotos: [],

      previewPhotoCount: 0,



      downloadedUserPhotos: 0,

      currentModalImage: '',
      currentModalImageIndex: 0,


      isFullScreenImage: false,
      isAddWindow: false,
      isModalError: false,
      isUploadingPhoto: false,
      modalImageLoader: false,
      errorCode: null,

      previewPhotos: [],
      photosToUpload: [],

      loadedPhotos: 0,
      photosLoaderLength: 0,
    }
  },
  computed:{
    uploadPercent(){
      let loaded = this.loadedPhotos / this.photosLoaderLength;
      return parseInt(loaded * 100);
    },
    downloadPercent(){

      let limit = (this.userPhotos.length - this.previewPhotoCount < 10)  ? this.userPhotos.length : 10 ;
      console.log(this.previewPhotoCount);
      // console.log("lim "+limit);
      let downloaded = this.downloadedUserPhotos / limit;
      return parseInt(downloaded * 100);
    },
    sortedPhotos(){
      return this.optimizedSmallPhotos.sort((a ,b) => a.index - b.index);
    }
  },
  methods: {
    setFullScreenImage(index){
      this.$refs.modalImage.src = '';
      this.isFullScreenImage = true;
      // this.currentModalImage =this.userPhotos[index];
      this.modalImageLoader = true;

      this.$refs.modalImage.src =this.userPhotos[index];
      this.$refs.modalImage.onload = ()=>{
        this.modalImageLoader = false;
      }

      this.currentModalImageIndex = index;
    },
    nextPhoto(){
      if(this.userPhotos.length == (this.currentModalImageIndex+1)){
        this.currentModalImageIndex = 0;
      } else {
        this.currentModalImageIndex++;
      }
      this.setFullScreenImage(this.currentModalImageIndex);
      // this.currentModalImage = this.userPhotos[this.currentModalImageIndex];

    },
    prevPhoto(){
      if((this.currentModalImageIndex-1) < 0){
        this.currentModalImageIndex = this.userPhotos.length - 1;
      } else {
        this.currentModalImageIndex--;
      }
      this.setFullScreenImage(this.currentModalImageIndex);
    },
    closeFullScreenImage(){
      this.isFullScreenImage = false;
    },
    compressPhoto(image, index, callback){
      let img = document.createElement('img');
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = image;
      img.onload = ()=>{
        let canv = document.createElement('canvas');
        let ctx = canv.getContext('2d');
        let scale = 130 / img.width;
        canv.height = img.height * scale;
        canv.width = img.width * scale;
        ctx.drawImage(img, 0, 0, canv.width, canv.height);

        callback(canv.toDataURL(), index);
      }
      img.onerror = (e)=>{
        console.log(e);
      }
    },
    loadPreviewPhotos(){
      // this.downloadedUserPhotos = 0;
      let limit = (this.userPhotos.length - this.previewPhotoCount <= 10)  ? this.userPhotos.length : 10 ;
      console.log(limit);
      for (let i = this.previewPhotoCount; i < limit; i++) {
        console.log("load");
        this.compressPhoto(this.userPhotos[i], i, (dataURL, index)=>{
          this.downloadedUserPhotos++;
          this.optimizedSmallPhotos.push({url:"url(" + dataURL + ")", index: index});
        });
      }
      this.previewPhotoCount+=limit;
    },
    showPreview(){
      console.log(this.photosToUpload);
      console.log(this.previewPhotos);

      let photos = this.$refs.imageInput.files;
      this.loadedPhotos = 0;
      this.photosLoaderLength = photos.length;
        // this.photosToUpload = this.photosToUpload.concat(photos);
      for (let i = 0; i < photos.length; i++) {
        this.photosToUpload.push(photos[i]);
        let reader = new FileReader();
        reader.onload = e =>{
          this.compressPhoto(e.target.result, i, (dataURL, index)=>{
            this.previewPhotos.push({url:"url(" + dataURL + ")", index: index});
            this.loadedPhotos++;
          })

        }
        reader.readAsDataURL(photos[i]);
      }
    },
    uploadPhotos(){
      // this.newPhotos = [];
      this.isModalError = false;
      let photos = this.$refs.imageInput.files;
      this.loadedPhotos = 0;
      this.photosLoaderLength = photos.length;

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
        this.loadedPhotos++;
        this.checkIfUploadEnd();
      }, error=>{
        //error
        this.isModalError = true;
        this.errorCode = error.response.status;
        this.loadedPhotos = 0;
        this.photosLoaderLength = 0;
      });
    },
    checkIfUploadEnd(){
      console.log(this.loadedPhotos + " " + this.photosLoaderLength);
      if(this.loadedPhotos === this.photosLoaderLength){
        console.log("ok");
        this.isAddWindow = false;
        this.$store.dispatch('getUserDataAPI', this.$store.getters.getCurrentUser);
      }
    },
    removeUploadedPhoto(index){
      console.log(this.photosToUpload[index]);
      this.photosToUpload.splice(index, 1);
      this.previewPhotos = this.previewPhotos.filter((item)=>{
        return item.index != index;
      });
    },

  },
  created(){
    this.userPhotos = this.photos.map(item=>{
      return this.$store.state.imagesUrl + item.img_value;
    });

    // for (var i = 0; i < this.userPhotos.length; i++) {
    //   let tempImage = document.createElement('img');
    //   tempImage.src = this.userPhotos[i];
    //   tempImage.onload = ()=>{
    //     this.downloadedUserPhotos++;
    //   }
    // }
  },
  mounted(){
    this.loadPreviewPhotos();
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
.userPhotos{
  display: flex;
  flex-wrap: wrap;
  position: relative;
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
    width: calc(100% / 6 - 8px);
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
    width: calc(100% / 6 - 10px);
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
@media screen and (max-width: 1120px){
  .userPhotos{
    &__img{
      margin-right: 5px;
      width: calc(100% / 5 - 8px);
      height: 118px;
    }
    &__addBlock{
      width: calc(100% / 5 - 10px);
      height: 118px;
    }
  }
}
@media screen and (max-width: 960px){

}
@media screen and (max-width: 768px){
  .userPhotos{
    &__img{
      margin-right: 5px;
      width: calc(100% / 4 - 8px);
      height: 118px;
    }
    &__addBlock{
      width: calc(100% / 4 - 10px);
      height: 118px;
    }
  }
}
@media screen and (max-width: 560px){
	.userPhotos{
    &__img{
      margin-right: 5px;
      width: calc(100% / 3 - 8px);
      height: 118px;
    }
    &__addBlock{
      width: calc(100% / 3 - 10px);
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
    &__addBlock{
      width: calc(50% - 9px);
      height: 90px;
    }
  }
  .addPhotosBlock{
    padding: 30px;

  }
}
</style>
