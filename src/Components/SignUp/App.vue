<template>
    <div>
      <div class="login  radius-5px shadow">
        <router-link class="navigation__item" to="/login/signUp">SignUp</router-link>
        <span class="login__linkBorder"></span>
        <router-link class="navigation__item" to="/login/signIn">SignIn</router-link>
      </div>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  },
  methods: {

  },

}
</script>

<style>
.login{
  padding: 10px;
  background: #fff;
  width: 273px;
  margin: 20px auto;
  text-align: center;
}
.login__linkBorder{
  width: 2px;
  margin: 0 6px;
  height: 10px;
  background: #1CA9F0;
  display: inline-block;
}
</style>
