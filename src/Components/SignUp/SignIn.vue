<template lang="html">
  <div class="container">
    <div class="signUpBlock">
      <div class="signUp singIn" v-bind:class="{'errorInput-signIn': isError || isWrongUserData}">
        <h1 class="signUp__title">Login</h1>
        <span class="errorMsg errorMsg-signIn" v-if="isError">Fields must not be empty!</span>
        <span class="errorMsg errorMsg-signIn" v-if="isWrongUserData">Wrong Username or Password</span>
        <div class="userData userData-login">
          <h2 class="userData__title">Your Username</h2>
          <input class="userData__input"  type="text" name="userLogin" placeholder="Your Username" v-model="userName" v-on:keyup.enter="signInUser">
        </div>
        <div class="userData userData-password">
          <h2 class="userData__title">Your Password</h2>
          <input class="userData__input"  type="password" name="userPassword" placeholder="Password" v-model="userPass" v-on:keyup.enter="signInUser">
        </div>

        <button class="signUp__submit signIn-btn" type="button" v-on:click="signInUser">Login</button>

        <div class="signUpLoaderBG" v-if="isSingInLoader">
          <div class="screenLoader">
            <div class="screenLoader screenLoader-inner"></div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      userName: '',
      userPass: '',
      isError: false,
    }
  },
  computed:{
    isEmptyFields(){
      if(this.userName.length == 0 || this.userPass.length == 0){
        return true;
      } else {
        return false;
      }
    },
    isSingInLoader(){
      return this.$store.getters.isLoader('signInLoader');
    },
    isWrongUserData(){
      return this.$store.getters.isWrongUserData;
    }
  },
  methods: {
    signInUser(){
      if(this.isEmptyFields){
        this.isError = true;
      } else {
        console.log(this.userName +" " + this.userPass);
        let payload = {
          username: this.userName,
          password: this.userPass
        }
        this.$store.dispatch('userSignIn', payload);
      }
    },

  },
}
</script>

<style lang="css">
.signIn-btn{
  width: 70%;
  height: 45px;
}
.errorMsg-signIn{
 font-size: 1em;
 animation-name: shake;
 animation-duration: .4s;
}
.errorInput-signIn{
  border: 1px solid red;
}

</style>
