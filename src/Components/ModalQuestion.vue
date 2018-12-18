<template lang="html">
  <div class="modalWindow">

    <div class="modalWindow__content modalWindow__content-question">
      <div class="modalQuestion">
        <p class="modalQuestion__question">{{question}}</p>
        <button
          @click="$emit('accept')"
          class="modalQuestion__btn modalQuestion__btn-accept shadow"
          type="button"
          name="button"
          >Yes</button>
        <button
          @click="$emit('decline')"
          class="modalQuestion__btn modalQuestion__btn-decline shadow"
          type="button"
          name="button"
          >No</button>
      </div>

      <span class="modalWindow__close" @click="$emit('close-list')"><i class="fas fa-times"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    question: {default: 'question'},
  }
}
</script>

<style lang="css">
</style>
