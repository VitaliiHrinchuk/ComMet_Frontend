<template lang="html">
  <div class="about">
    <h1 class="about__title">About</h1>


    <table class="about__table userTable">
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">First Name: </td>
        <td class="userTable__col">John</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Username: </td>
        <td class="userTable__col">@johny19</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">City: </td>
        <td class="userTable__col">London</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Birthday: </td>
        <td class="userTable__col">11.11.1992</td>
      </tr>
    </table>

    <table class="about__table userTable">
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Last Name: </td>
        <td class="userTable__col">Doe</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Email: </td>
        <td class="userTable__col">john@milo.com</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Country: </td>
        <td class="userTable__col">UK</td>
      </tr>
      <tr class="userTable__row">
        <td class="userTable__col userTable__col-title">Phone: </td>
        <td class="userTable__col">+180890789</td>
      </tr>
    </table>

    <h1 class="about__title about__title-lined">Favourite Tags</h1>
    <div class="about__tags">
      <div class="tag tag-red">
        #Music
      </div>
      <div class="tag tag-green">
        #Talking
      </div>
      <div class="tag tag-violet">
        #Walk
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props:{
    name: {required: true},
    selected: {default: false}
  },
  data(){
    return{

    }
  },
}
</script>

<style lang="scss">
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
