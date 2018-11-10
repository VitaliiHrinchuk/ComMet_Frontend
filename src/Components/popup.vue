<template lang="html">
  <div class="userData__aboutInput" v-on:mouseenter="hovered = true" v-on:mouseleave="hovered = false">?
    <transition name="slide-fade">
      <div class="tipBlock"  v-show="hovered">
        <h3>{{title}}</h3>
        <p>{{content}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: function(){
		return{
			hovered: false
		}
	},
	props: ['title','content'],
}
</script>

<style lang="css">
</style>
