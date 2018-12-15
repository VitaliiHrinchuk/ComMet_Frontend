<template lang="html">
  <div class="about">

    <h1 class="about__title">About</h1>
    <button class="about__btn shadow" type="button" name="button" v-if="userInfo.is_current"  @click="$emit('edit-profile')"><i class="far fa-edit"></i> Edit</button>

    <table class="about__table userTable">
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">First Name: </td>
        <td class="userTable__col">{{userInfo.first_name}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Username: </td>
        <td class="userTable__col userTable__col-username">@{{userInfo.username}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">City: </td>
        <td class="userTable__col">*London*</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Birthday: </td>
        <td class="userTable__col">{{userInfo.date_of_birth}}</td>
      </tr>
    </table>

    <table class="about__table userTable">
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Last Name: </td>
        <td class="userTable__col">{{userInfo.last_name}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Email: </td>
        <td class="userTable__col">{{userInfo.email}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Country: </td>
        <td class="userTable__col">*UK*</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Phone: </td>
        <td class="userTable__col">{{userInfo.phone_number || "*uknown*"}}</td>
      </tr>
    </table>

    <h1 class="about__title about__title-lined">Favourite Tags</h1>
    <div class="about__tags" v-for="tag in userInfo.tags">
      <div class="tag tag-red">
        #{{tag}}
      </div>
      <!-- <div class="tag tag-green">
        #Talking
      </div>
      <div class="tag tag-violet">
        #Walk
      </div> -->
    </div>
  </div>

</template>

<script>
export default {
  props:{
    userInfo: {required: true}
  },
  data(){
    return{

    }
  },
}
</script>

<style lang="scss">
$primary-color: #1ca9f0;
  .about{

    &__title{
      font-size: 1em;
      font-weight: normal;
      text-transform: uppercase;
      margin-bottom: 10px;

      &-lined{
        border-top: 1px solid #cecccc;
        padding-top: 15px;
      }
    }

    &__tags{
      font-size: .8em;
    }
    &__btn{
      display: block;
      margin-left: auto;
      background-color: $primary-color;
      border: none;
      color: #fff;
      padding: 3px 10px;
      border-radius: 15px;
      // border: 1px solid gray;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
    }

  }
  .userTable{
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 10px;
    font-size: .8em;
    &__row{
      line-height: 30px;
    }

    &__col{
      &-title{
        width: 150px;
      }
      &-username{
        color: $primary-color;

      }
    }
  }

  .userInfo{
    list-style: none;
    padding: 0;
    margin: 0;

    &__item{
      width: 600px;
      border: 1px solid red;
      &-right{
        text-align: right;
      }
    }
  }
</style>
