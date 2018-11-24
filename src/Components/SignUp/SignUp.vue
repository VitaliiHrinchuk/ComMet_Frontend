<template lang="html">
  <div class="container">
    <div  id="signUpBlock" class="signUpBlock">
    <div id="signUp" class="signUp" v-if="!signUpEnd">

      <!-- <div class="inputBlock">

        <input type="text" name="" value="" class="inputBlock__input" required>
        <h4 class="inputBlock__label">dsadsa</h4>
        <div class="inputBlock__container errorInput">
        </div>
      </div> -->

      <h1 class="signUp__title">SignUp</h1>
      <div class="socialSignBtn socailSignBtn-google">
        <i class="fab fa-google socailSignBtn__icon"></i>
        <h2 class="socailSignBtn__title">Continue with Google</h2>
      </div>
      <div class="socialSignBtn socailSignBtn-facebook">
        <i class="fab fa-facebook-square socailSignBtn__icon"></i>
        <h2 class="socailSignBtn__title">Continue with Facebook</h2>
      </div>

      <div class="userData userData-name">
        <h2 class="userData__title">Your First Name</h2>
        <input class="input" type="text" name="userFirstName" v-model="userFirstName">
      </div>

      <div class="userData userData-surname">
        <h2 class="userData__title">Your Last Name</h2>
        <input class="input"  type="text" name="userLastName" v-model='userLastName'>
      </div>

      <div class="userData userData-login">
        <h2 class="userData__title">Create Username</h2>
        <aboutinput  title="Unique Username" content="Username helps to identify you from other users">?</aboutinput>
        <input id="userLogin"
               class="input"
               type="text" name="userLogin"
               placeholder="e.g. MaxPower15"
               v-model='userLogin'
               @focus="isFocus.login = true"
               v-on:change="checkUniqueLogin()"
               v-bind:class="{errorInput :!loginIsUniq, goodInput :isGoodLogin}">

        <span class="loader loader-input" v-if="loginIsLoader"></span>
        <span class="errorMsg" v-if="!loginIsUniq"><i class="fas fa-exclamation-circle"></i> This login already exists</span>
        <span class="doneIcon" v-show="isGoodLogin"><i class="far fa-check-circle"></i></span>


      </div>

      <div class="userData userData-email">
        <h2 class="userData__title">Your E-Mail Address</h2>
        <input class="input"
               type="text"
               name="userEmail"
               placeholder="e.g. max@somemail.com"
               @focus="isFocus.mail = true"
               v-bind:class="{errorInput : isErrors[0].validateMail || !mailIsUniq, goodInput: isGoodMail}"
               v-model="userMail" v-on:change="validateMail()" >
        <span class="loader loader-input" v-if="mailIsLoader"></span>
        <span class="errorMsg" v-if="isErrors[0].validateMail"><i class="fas fa-exclamation-circle"></i> incorrect E-mail address</span>
        <span class="errorMsg" v-if="!mailIsUniq && !isErrors[0].validateMail"><i class="fas fa-exclamation-circle"></i> This E-mail is alredy exists</span>
        <span class="doneIcon" v-show="isGoodMail"><i class="far fa-check-circle"></i></span>
      </div>

      <div class="userData userData-password">
        <h2 class="userData__title">Create Password</h2>
        <input class="input"
               type="password"
               name="userPassword"
               placeholder=""
               @focus="isFocus.password = true"
               v-bind:class="{errorInput : isErrors[0].password, goodInput: isGoodPass}"
               v-model="userPassword" v-on:change="checkPass()">
        <span class="errorMsg" v-if="isErrors[0].password"><i class="fas fa-exclamation-circle"></i> Password can`t be less then 6 symbols</span>
        <span class="doneIcon" v-show="isGoodPass"><i class="far fa-check-circle"></i></span>

      </div>

      <div class="userData userData-bday">

        <h2 class="userData__title userData__title-BDay">Date of Birth</h2>
        <select class="userData__BDay userData__day" v-model="selectedDay">
          <option  v-for="day in days" v-bind:value="day">{{ day }}</option>
        </select>
        <select class="userData__BDay userData__month" name="BDate_month" v-model="selectedMonth">
          <option v-for="mon in months" v-bind:value="mon">{{mon}}</option>
        </select>
        <select class="userData__BDay userData__year" name="BDate_year" v-model="selectedYear">
          <option v-for="year in years" v-bind:value="year">{{year}}</option>
        </select>

      </div>



      <button class="signUp__submit"
              type="button"
              v-bind:disabled="disableSubmitCheck"
              v-on:click="getVerificationCode()">

              Continue</button>
      <span class="errorMsg" v-if="isErrors[0].signUpErr"><i class="fas fa-exclamation-circle"></i> Getting some trouble. Please, try singUp again</span>

      <div class="signUpLoaderBG" v-if="signUpIsLoader">
        <div class="screenLoader">
          <div class="screenLoader screenLoader-inner"></div>
        </div>
      </div>


    </div>

      <div class="signUp" v-if="signUpEnd && !userConfirmed">
        <h1>Verification</h1>
        <p>We sent a verification code to your Email address ({{userMail}}). Please, enter the code to continue </p>
        <div class="userData">
          <input type="text"
                 class="input"
                 v-model="userVerificationCode"
                 v-bind:class="{errorInput : isErrors[0].verifErr}">
          <span class="errorMsg" v-if="isErrors[0].verifErr"><i class="fas fa-exclamation-circle"></i> You entered wrong verification code</span>
          <button  class="signUp__submit verificationBtn" v-on:click="checkVerifCode()">Continue</button>
        </div>
      </div>

      <div class="signUp" v-if="userConfirmed">
        <div class="signUp__thx">
          <h1>You were registered </h1>
          <router-link to='/'></router-link>
          <i class="fas fa-check"></i>
          <button class="signUp__submit signUp__submit-login" type="button" name="button" v-on:click="toSignIn">Login</button>
        </div>
      </div>

    </div>



  </div>
</template>

<script>


import popup from './popup.vue';

export default {
  data(){
    return{
      userVerificationCode:"",
      userFirstName:'',
  		userLastName: '',
  		userMail: '',
  		userPassword:'',
  		userLogin: '',
      isErrors:[{
  			validateMail: false,
  			password: false,
  			signUpErr: false,
  			verifErr: false
  		}],

      isFocus:{
        login: false,
        mail: false,
        password: false
      },



  		// disableSubmit: true,
  		days:[],
  		months:[],
  		years:[],
  		selectedDay: '1',
  		selectedMonth: 'Jan',
  		selectedYear:'2017',


      userConfirmed: false,



    }
  },
  computed: {
      loginIsUniq(){
        return this.$store.getters.isUniqLogin;
      },
      mailIsUniq(){
        return this.$store.getters.isUniqMail;
      },
      loginIsLoader(){
        return this.$store.getters.isLoader('loginLoader');
      },
      mailIsLoader(){
        return this.$store.getters.isLoader('mailLoader');
      },
      signUpIsLoader(){
        return this.$store.getters.isLoader('signUpLoader');
      },
      disableSubmitCheck(){
        if(this.userFirstName.length==0    ||
           this.userLastName.length==0     ||
           this.userLogin.length==0        ||
           this.userPassword.length<6      ||
           this.userMail.length==0         ||
           this.loginIsLoader == true      ||
           this.mailIsLoader == true    ){
          return true;
        }
  			for(let key in this.isErrors[0]){
  				if(this.isErrors[0][key] == true){
  					return true;
  				}

  			}

  			return false;
  		},
      signUpEnd(){
        return this.$store.getters.getSignUpState;
      },
      isGoodLogin(){

        if(!this.isFocus.login     &&
           this.loginIsUniq        &&
           this.userLogin.length>0 &&
           !this.loginIsLoader){
          return true;
        } else {
          return false;
        }
      },
      isGoodMail(){
        if(!this.isFocus.mail              &&
           this.mailIsUniq                 &&
           !this.isErrors[0].validateMail  &&
           this.userMail.length            &&
           !this.mailIsLoader){
          return true;
        } else {
          return false;
        }
      },
      isGoodPass(){
        if(!this.isFocus.password       &&
           !this.isErrors[0].password   &&
           this.userPassword.length>6){
          return true;
        } else {
          return false;
        }
      }

  },
  methods: {

    checkUniqueLogin(){
      this.isFocus.login = false;
      if(this.userLogin.length!=0){
        this.$store.dispatch('checkUniqLogin', this.userLogin);
      } else {

      }

    },
    checkUniqueMail(){
      this.$store.dispatch('checkUniqMail', this.userMail);
    },
    getVerificationCode(){
      this.$store.dispatch('getVerificationCode',this.userMail);
    },
    postUser(){

    },
    checkVerifCode(){
      if(this.userVerificationCode == this.$store.getters.getLocalVerificationCode){
        this.postUser();
      } else {
        this.isErrors[0].verifErr = true;
      }
    },
    validateMail(){
      this.isFocus.mail = false;
      if(this.userMail.length!=0){
        let regExp = new RegExp();
        regExp = /^\w+@\w+\.\w{2,4}$/i;
        if(!regExp.test(this.userMail)){

          this.isErrors[0].validateMail = true;
        } else {
          this.isErrors[0].validateMail = false;

          this.checkUniqueMail(this.userMail);

        }
      } else {
        this.isErrors[0].validateMail = false;
      }

    },
    checkPass: function(){
      this.isFocus.password = false;
			if(this.userPassword.length < 6){
				this.isErrors[0].password = true;
			} else {
				this.isErrors[0].password = false;
			}
		},


		getDateOfBirth: function(){
			let monthNum = this.months.indexOf(this.selectedMonth) +1;
			let birthDay = this.selectedYear+"-"+monthNum+"-"+this.selectedDay;
			return birthDay;
		},

    postUser: function(){
			let param = JSON.stringify({
				"email": this.userMail,
				"username": this.userLogin,
				"password": this.userPassword,
				"first_name": this.userFirstName,
				"last_name": this.userLastName,
				"date_of_birth": this.getDateOfBirth()
			});

      let axiosConfig = {
  			  headers: {
  			      'Content-Type': 'application/json',
  			  }
  		};

			this.$axios.post(`https://comeandmeet.herokuapp.com/accounts/users/`,param,axiosConfig).then((response)=>{
        this.userConfirmed = true;
			},
			(error)=>{
				//error
        alert(error);
			});
		},
    toSignIn(){
      this.$router.replace('signIn');
    }
  },
  components:{
    aboutinput:popup
  },
  created(){
				for(let i =1;i<32;i++){
					this.days.push(i);
				}

				let monthsArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

				for(let i = 0; i<monthsArray.length;i++){
					this.months.push(monthsArray[i]);
				}
				let startYear = 2017;
				for(let i = 0;i<100;i++){
					this.years.push(startYear);
					startYear--;
				}
        console.log(this);
			}

}
</script>

<style lang="css">
.signUp{
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;
	flex-wrap: wrap;
	align-items: center;
	padding: 10px 30px;
	padding-bottom: 40px;
	margin: 0 auto;
	width: 46%;
	border-radius: 5px;
	background: #fff;
	box-shadow: 3px 3px 10px rgba(0,0,0,.1);
	font-family: "Roboto";

	animation-name: fadeout;
	animation-duration: 1s;
}
.signUp__title {
	font-size: 2em;
	padding-bottom: 30px;
	padding-top: 30px;
}
.userData{
	margin-bottom: 13px;
	width: 100%;
  height: 70px;
  position: relative;
}
.userData__title{
	font-size: .95em;
	margin-bottom: 5px;
	display: inline-block;
  font-weight: normal;
}
.userData__title-BDay{
	width: 100%;
}
.userData__input {
	width: 100%;
	height: 30px;
	padding: 0 6px;
	border: 1px solid rgba(0,0,0,.2);
	border-radius: 3px;
	background: #FAFAFA;
	font-size: .9em;
	font-family: "Roboto";
}
.userData__input:focus {
	background: #fff;
}
.userData-bday{

}
.userData__BDay{
  border-radius: 5px;
  margin-right: 15px;
}

.userData__day{
	max-width: 17%;
}
.userData__month{
	width: 23%;
}
.userData__year{
	width: 17%;
}
.userData__aboutInput{
	position: relative;
	display: inline-block;
	text-align: center;
	line-height: 13px;
	color: #1ca9f0;
	font-size: .6em;
	border: 1px solid #1ca9f0;
	border-radius: 50%;
	width: 13px;
	height: 13px;
	cursor: pointer;
}
.tipBlock{
	position: absolute;
	bottom: 10px;
	left: 10px;
	line-height: 20px;
	color: black;
	width: 300px;
	text-align: left;
	background: #E8E8E8;
	padding: 5px 15px;
	border: 1px solid rgba(0,0,0,.4);
	border-radius: 5px;
	font-size: 1.3em;
	border-bottom-left-radius: 0;
	-webkit-transition: all 1s;
	-o-transition: all 1s;
	transition: all 1s;
}
.userData__submit{
	position: relative;
}
.signUp__submit{
	width: 100%;
	height: 60px;
	background: #1ca9f0;
	border: none;
	border-radius: 5px;
	box-shadow: 5px 5px 5px rgba(0,0,0,.1);
	font-family: "Roboto";
	font-size: 1.5em;
	color: #fff;
	outline-color: gray;
	cursor: pointer;
	-webkit-transition: all .3s;
	-o-transition: all .3s;
	transition: all .3s;
}

.signUp__submit:hover{
	background: #0C99E0;
}
.signUp__submit:disabled{
	opacity: .3;
}

.goodInput{
  border-color:  #2DDAA5;
}
.doneIcon{
	position: absolute;
	right: 10px;
	top: 32px;
	color: #2DDAA5;
}
.signUp__thx{
  margin-top: 15px;
  color: #2DDAA5;
  text-align: center;
}
.signUp__thx i {
  margin-top: 25px;
  margin-bottom: 20px;
  font-size: 50px;
}
.signUp__submit-login{
  height: 47px;
}
.md-list-item-content{
  min-height: 23px;
}
.selectContainer{
  display: flex;

}
.userData__select{
  width: calc(33% - 15px);
  margin-right: 15px;
}
@media screen and (min-width: 1920px){
	body{
		font-size: 25px;
	}
	.signUp{
		width: 30%;
	}
	.socailSignBtn__icon{
		font-size: 1.4em;
	}
	.socailSignBtn__title{
		font-size: 1.25em;
	}
	.userData__input{
		height: 40px;
	}
	.userData__BDay{
		height: 30px;
		font-size: .8em;
	}
}
@media screen and (max-width: 1920px){
	body{
		font-size: 22px;
	}
	.signUp{
		width: 30%;
	}
	.socailSignBtn__icon{
		font-size: 1.4em;
	}
	.socailSignBtn__title{
		font-size: 1.25em;
	}
	.userData__input{
		height: 40px;
	}
	.userData__BDay{
		height: 30px;
		font-size: .8em;
	}
}

@media screen and (max-width: 1600px){
	body{
		font-size: 20px;
	}
	.signUp{
		width: 35%;
	}
	.userData{
		margin-bottom: 20px;
	}
	.socailSignBtn-facebook{
		margin-bottom: 20px;
	}

}

@media screen and (max-width: 1368px){
	.signUp{
		width: 40%;
	}
	body{
		font-size: 16px;
	}
}
@media screen and (max-width: 1120px){
	.socailSignBtn__title{
		font-size: 1em;
	}
}
@media screen and (max-width: 960px){
	.signUp{
		width: 65%;
	}
	body{
		font-size: 20px;
	}
}

@media screen and (max-width: 768px){
	.signUp{
		width: 100%;
	}
	body{
		font-size: 22px;
	}
	.userData{
		margin-bottom: 24px;
	}
	.signUp__submit{
		margin-top: 8px;
	}
	.socialSignBtn{
		height: 60px;
	}
}
@media screen and (max-width: 560px){
	.socailSignBtn__title{
		font-size: 1em;
	}
}


@media screen and (max-width: 480px){
	body{
		font-size: 17px;
	}
	.userData__day{
		width: 28%;

	}
	.userData__month{
		width: 28%;
	}
	.userData__year{
		width: 28%;
	}
}

</style>
