<template>
    <v-touch class="bar" @tap="enableTouch">
        <div class="opt complete">已完成</div>
        <div class="opt wait">待办</div>
        <div class="opt now">进行中</div>
    </v-touch>
</template>

<script>
export default {
    props: ['index'],
    methods: {
        enableTouch(e) {
            let todoData = this.$store.state.todoData[this.index]
            let targetClass = e.target.classList
            if(targetClass.contains('complete')) {
                todoData.status = '2'
            } else if(targetClass.contains('wait')) {
                todoData.status = '1'
            } else {
                todoData.status = '0'
            }
            this.$store.commit('editItem', {todoData: todoData, index: this.index})
            this.$emit('enable-pan')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/common.scss';
@include bar(left);
</style>