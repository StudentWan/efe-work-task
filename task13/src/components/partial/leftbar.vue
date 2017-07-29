<template>
    <div class="bar" @click="enableTouch">
        <div class="opt">已完成</div>
        <div class="opt">待办</div>
        <div class="opt">进行中</div>
    </div>
</template>

<script>
export default {
    methods: {
        enableTouch() {
            this.$emit('enable-pan')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/common.scss';
@include bar(left);
</style>