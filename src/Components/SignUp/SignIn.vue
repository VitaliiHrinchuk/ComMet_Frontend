<template lang="html">
  <div class="container">
    <div class="signUpBlock">
      <div class="signUp singIn" v-bind:class="{'errorInput-signIn': isError || isWrongUserData}">
        <h1 class="signUp__title">{{$lang.login.LoginTitle}}</h1>
        <span class="errorMsg errorMsg-signIn" v-if="isError">{{$lang.login.empty_error}}</span>
        <span class="errorMsg errorMsg-signIn" v-if="isWrongUserData">{{$lang.login.wrong_data}}</span>
        <div class="userData userData-login">
          <h2 class="userData__title">{{$lang.login.username_field}}</h2>
          <input class="input"  type="text" name="login"  v-model="userName" v-on:keyup.enter="signInUser">
        </div>
        <div class="userData userData-password">
          <h2 class="userData__title">{{$lang.login.password_field}}</h2>
          <input class="input"  type="password" name="password"  v-model="userPass" v-on:keyup.enter="signInUser">
        </div>

        <button class="signUp__submit signIn-btn" type="button" v-on:click="signInUser">{{$lang.login.login_btn}}</button>

        <div class="blockLoader" v-if="isSingInLoader">
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
        this.$store.dispatch('userSignIn', payload).then(response=>{
          if(response == true){
          this.$router.replace('/Events');
          }
        }, error=>{

        });
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
