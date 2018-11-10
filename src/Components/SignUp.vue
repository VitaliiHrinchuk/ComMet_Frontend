<template lang="html">
  <div class="container">
    <div  id="signUpBlock" class="signUpBlock">
    <div id="signUp" class="signUp" v-if="!signUpEnd">
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
        <input class="userData__input" type="text" name="userFirstName" v-model="userFirstName">

      </div>

      <div class="userData userData-surname">
        <h2 class="userData__title">Your Last Name</h2>
        <input class="userData__input"  type="text" name="userLastName" v-model='userLastName'>
      </div>

      <div class="userData userData-login">
        <h2 class="userData__title">Create Login</h2>
        <aboutinput  title="Unique login" content="Login helps to identify you from other users">?</aboutinput>
        <input class="userData__input"  type="text" name="userLogin" placeholder="Unique login..." v-model='userLogin'  v-on:change="checkUniqLogin()" v-bind:class="{errorInput :!loginIsUniq}">
        <span class="loader" v-if="loginIsLoader"></span>
        <span class="errorMsg" v-if="!loginIsUniq">This login already exists</span>

      </div>

      <div class="userData userData-email">
        <h2 class="userData__title">Your E-Mail Address</h2>
        <input class="userData__input"  type="text" name="userEmail" placeholder="example@site.com"  v-bind:class="{errorInput : isErrors[0].validateMail || !mailIsUniq}" v-model="userMail" v-on:change="validateMail()" >
        <span class="loader" v-if="mailIsLoader"></span>
        <span class="errorMsg" v-if="isErrors[0].validateMail">incorrect E-mail address</span>
        <span class="errorMsg" v-if="!mailIsUniq && !isErrors[0].validateMail">This E-mail is alredy exists</span>
      </div>

      <div class="userData userData-password">
        <h2 class="userData__title">Create Password</h2>
        <input class="userData__input"  type="password" name="userPassword" placeholder="Minimum 6 symbols" v-bind:class="{errorInput : isErrors[0].password}" v-model="userPassword" v-on:change="checkPass()">
        <span class="errorMsg" v-if="isErrors[0].password">Password can`t be less then 6 symbols</span>
      </div>

      <div class="userData userData-bday">
        <h2 class="userData__title userData__title-BDay">Date of Birth</h2>

        <select class="userData__BDay userData__day" name="BDate_day"v-model="selectedDay">
          <option  v-for="day in days" v-bind:value="day">{{ day }}</option>
        </select>
        <select class="userData__BDay userData__month" name="BDate_month" v-model="selectedMonth">
          <option v-for="mon in months" v-bind:value="mon">{{mon}}</option>
        </select>
        <select class="userData__BDay userData__year" name="BDate_year" v-model="selectedYear">
          <option v-for="year in years" v-bind:value="year">{{year}}</option>
        </select>

      </div>



      <button class="signUp__submit" type="button"  v-bind:disabled="disableSubmitCheck" v-on:click="getVerificationCode()">Continue</button>
      <span class="errorMsg" v-if="isErrors[0].signUpErr">Getting some trouble. Please, try singUp again</span>

      <div class="signUpLoaderBG" v-if="signUpIsLoader">
        <div class="screenLoader"></div>
      </div>

    </div>

    <div class="signUp" v-if="signUpEnd">
      <h1>Verification</h1>
      <p>We sent a verification code to your Email address ({{userMail}}). Please, enter the code to continue </p>
      <div class="userData">
        <input type="text" class="userData__input" v-model="userVerificationCode" v-bind:class="{errorInput : isErrors[0].verifErr}">
        <span class="errorMsg" v-if="isErrors[0].verifErr">You entered wrong verification code</span>
        <button class="signUp__submit verificationBtn" v-on:click="checkVerifCode()">Continue</button>
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
  			uniqLogin: false,
  			uniqMail: false,
  			signUpErr: false,
  			verifErr: false
  		}],

  		errorClass: 'errorInput',

  		disableSubmit: true,
  		days:[],
  		months:[],
  		years:[],
  		selectedDay: '1',
  		selectedMonth: 'Jan',
  		selectedYear:'2017',
  		loaders: {
  			mailLoader:false,
  			loginLoader: false,
  			signUpLoader: false
  		},



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
  			for(let key in this.isErrors[0]){
  				if(this.userFirstName.length==0    ||
  				   this.userLastName.length==0 ||
  				   this.userLogin.length==0   ||
  				   this.userPassword.length<6 ||
  				   this.userMail.length==0){
  					return true;
  				}
  				if(this.isErrors[0][key] == true){
  					return true;
  				}

  			}

  			return false;
  		},
      signUpEnd(){
        return this.$store.getters.getSignUpState;
      }

  },
  methods: {
    checkUniqueLogin(){
      this.$store.dispatch('checkUniqLogin', this.userLogin);
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
      let regExp = new RegExp();
      regExp = /^\w+@\w+\.\w{2,4}$/i;
      if(!regExp.test(this.userMail)){

        this.isErrors[0].validateMail = true;
      } else {
        this.isErrors[0].validateMail = false;

        this.checkUniqueMail(this.userMail);

      }
    },
    checkPass: function(){
			if(this.userPassword.length < 6){
				this.isErrors[0].password = true;
			} else {
				this.isErrors[0].password = false;
			}
		},
		checkUniqLogin: function(){
			this.checkUniqueLogin(this.userLogin);
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
				alert('you were registered');
			},
			(error)=>{
				//error
        alert(error);
			});
		},
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
			}

}
</script>

<style lang="css">
</style>
