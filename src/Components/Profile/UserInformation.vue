<template lang="html">
  <div class="about">

    <h1 class="about__title">{{$lang.profile.info_title}}</h1>
    <button class="about__btn shadow" type="button" name="button" v-if="userInfo.isCurrent"  @click="$emit('edit-profile')"><i class="far fa-edit"></i> {{$lang.global.edit}}</button>

    <table class="about__table userTable">
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">{{$lang.profile.info_firstname}}: </td>
        <td class="userTable__col">{{userInfo.first_name}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">{{$lang.profile.info_lastname}}: </td>
        <td class="userTable__col">{{userInfo.last_name}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">{{$lang.profile.info_username}}: </td>
        <td class="userTable__col userTable__col-username">@{{userInfo.username}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">{{$lang.profile.info_bday}}: </td>
        <td class="userTable__col">{{userInfo.date_of_birth}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">{{$lang.profile.info_email}}: </td>
        <td class="userTable__col">{{userInfo.email }}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">{{$lang.profile.info_city}}: </td>
        <td class="userTable__col">{{userInfo.city}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">{{$lang.profile.info_country}}: </td>
        <td class="userTable__col">{{userInfo.country}}</td>
      </tr>
    </table>

    <table class="about__table userTable">
      <!-- <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Last Name: </td>
        <td class="userTable__col">{{userInfo.last_name}}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Email: </td>
        <td class="userTable__col">{{userInfo.email }}</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Country: </td>
        <td class="userTable__col">{{userInfo.country}}</td>
      </tr> -->

    </table>

    <h1 class="about__title about__title-lined">{{$lang.profile.info_tags}}</h1>
    <span class="note" v-if='userInfo.tags.length == 0'>{{$lang.profile.info_tags_note}}</span>
    <div class="about__tags" >
      <div class="tag" v-for="tag in userInfo.tags">
        {{tag.name}}
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
  }
}
</script>

<style lang="scss">
@import '../../assets/css/colors.scss';
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
      text-transform: capitalize;
      font-weight: bold;
    }

  }
  .userTable{
    display: inline-block;
    margin-right: 50px;
    margin-bottom: 10px;
    font-size: .8em;
    &__col{
      padding-bottom: 20px;
      &-title{
        padding-right: 10px;
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
