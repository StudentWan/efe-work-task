<template>
    <div class="bar" @click="enableTouch">
        <div class="opt">编辑</div>
        <div class="opt">删除</div>
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
@include bar(right);
</style>
