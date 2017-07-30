<template>
    <v-touch class="bar" @tap="enableTouch">
        <div class="opt edit">编辑</div>
        <div class="opt delete">删除</div>
    </v-touch>
</template>

<script>
export default {
    props: ['index'],
    methods: {
        enableTouch(e) {
            if(e.target.classList.contains('edit')) {
                this.$router.push(`/edit/edit?index=${this.index}`)
            } else {
                this.$store.commit('deleteItem', {index: this.index})
            }
            this.$emit('enable-pan')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../static/common.scss';
@include bar(right);
</style>
