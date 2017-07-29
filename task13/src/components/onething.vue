<template>
  <div class="main">
    <p class="slogan">Now!The one thing is</p>
      <div class="item">
        <i class="fa fa-play high" aria-hidden="true"></i>
        <p class="content">Some Text about Task,Some Text about Task,Some Text about Task,Some Text about Task,Some Text about Task</p>
      </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('changeOptions', {
      select: 'onething',
      btnName: 'Add',
      btnClass: 'add',
      setCancel: false
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '../static/common';
@include main;
.slogan {
  @include slogan;
  display: inline-block;
  margin: 1em;
}
</style>
