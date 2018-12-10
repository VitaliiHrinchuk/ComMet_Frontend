<template lang="html">
  <div class="container">
    <div class="errorBlock shadow radius-5px">
      <i class="errorBlock__icon fas fa-exclamation-triangle"></i>
      <h1 class="errorBlock__code">404</h1>

      <h2 class="errorBlock__text">Page Not Found</h2>

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">

.errorBlock{
  width: 100%;
  text-align: center;
  background: #fff;
  padding: 15px;
  margin-top: 30px;

  font-size: 1.6em;

  &__icon{
    font-size: 2.5em;
    color: red;
    margin-bottom: 15px;
  }
  &__code{
    margin-bottom: 15px;
  }
  &__text{
    font-size: .9em;
    font-weight: normal;
  }
}
</style>
