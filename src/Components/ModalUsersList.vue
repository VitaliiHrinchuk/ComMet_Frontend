<template lang="html">
  <div class="modalWindow">

    <div class="modalWindow__content radius-5px">

      <div class="blockLoader" v-if='isLoader'>
        <div class="screenLoader">
          <div class="screenLoader screenLoader-inner"></div>
        </div>
      </div>

      <h1 class="modalWindow__title">{{title}}</h1>
        <span class="note" v-if='usersData.length == 0'>{{note}}</span>
        <div class="user user-list" v-for='user in usersData'>
          <div
            class="roundImage roundImage-members"
            :style="{ 'backgroundImage': 'url(\'' + getAvatarImage(user.avatar) + '\')' }" @click="showUserProfile(usersData.username)">
          </div>
          <div class="user__nameBlock">
            <h3 class="fullName" v-if='user.first_name  || user.last_name'  @click='showUserProfile(user.username)'>{{user.first_name}}  {{user.last_name}}</h3>
            <h3 class="fullName" v-else @click='showUserProfile(user)'>{{user}}</h3>
            <span class="username" v-if="user.first_name  || user.last_name">@{{user.username}}</span>
          </div>

        </div>
        <span class="modalWindow__close" @click="$emit('close-list')"><i class="fas fa-times"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    usersData: {required: true},
    title: {reauired: true, default:'Title'},
    note: {default: 'Empty yet'},
    isLoader: {default: false}
  },
  data(){
    return  {

    }
  },
  methods: {
    showUserProfile(username){
      this.$emit('close-list');
      this.$router.push(`/Profile/${username}`);
    },
    getAvatarImage(url){
      return this.$store.state.imagesUrl + url;
    }
  }
}
</script>

<style lang="css">
</style>
