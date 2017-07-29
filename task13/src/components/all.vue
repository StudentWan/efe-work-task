<template>
  <div class="main">
    <ul class="prior">
      <li class="prior-opt">
        <i class="high fa fa-circle" aria-hidden="true"></i>
        <span>高优</span>
      </li>
      <li class="prior-opt">
        <i class="medium fa fa-circle" aria-hidden="true"></i>
        <span>中优</span>
      </li>
      <li class="prior-opt">
        <i class="low fa fa-circle" aria-hidden="true"></i>
        <span>低优</span>
      </li>
    </ul>
    <ul class="status">
      <li class="status-opt">
        <i class="fa fa-play" aria-hidden="true"></i>
        <span>进行中</span>
      </li>
      <li class="status-opt">
        <i class="fa fa-pause" aria-hidden="true"></i>
        <span>待办</span>
      </li>
      <li class="status-opt">
        <i class="fa fa-stop" aria-hidden="true"></i>
        <span>已完成</span>
      </li>
    </ul>
  
    <div class="list">
      <template v-for="(opt, index) in opts">
        <v-touch @panleft="showRight(index)" @panright="showLeft(index)" :key="index" ref="touch">
          <div class="item">
            <i class="fa fa-play high" aria-hidden="true"></i>
            <p class="content">Some Text about Task,Some Text about Task,Some Text about Task,Some Text about Task,Some Text about Task</p>
            <right-bar v-if="opt.isRightOn" @enable-pan="doEdit(index)"></right-bar>
            <left-bar v-if="opt.isLeftOn" @enable-pan="doEdit(index)"></left-bar>
          </div>
        </v-touch>
      </template>
    </div>
  </div>
</template>

<script>
import RightBar from './partial/rightbar.vue'
import LeftBar from './partial/leftbar.vue'
export default {
  data: function () {
    return {
      opts: [{ isRightOn: false, isLeftOn: false }, { isRightOn: false, isLeftOn: false }]
    }
  },
  created() {
    this.$store.commit('changeOptions', {
      select: 'all',
      btnName: 'Add',
      btnClass: 'add',
      setCancel: false
    })
  },
  methods: {
    showRight(i) {
      this.opts[i].isRightOn = true
      this.disablePan(this.opts)
    },
    showLeft(i) {
      this.opts[i].isLeftOn = true
      this.disablePan(this.opts)
    },
    doEdit(i) {
      this.enablePan(this.opts)
      this.opts[i].isLeftOn = false
      this.opts[i].isRightOn = false
    },
    disablePan(opts) {
      for (let i = 0, lens = opts.length; i < lens; i++) {
        this.$refs.touch[i].disable('pan')
      }
    },
    enablePan(opts) {
      for (let i = 0, lens = opts.length; i < lens; i++) {
        this.$refs.touch[i].enable('pan')
      }
    }
  },
  components: {
    RightBar,
    LeftBar
  }
}
</script>

<style lang="scss" scoped>
@import '../static/common';
@include main;
@include banner($name: prior, $color: #fbebeb);
@include banner($name: status, $color: #f0feed);
</style>
