<template>
    <div class="main">
        <header-common></header-common>
        <router-view></router-view>
        <footer-common></footer-common>
    </div>
</template>

<script>
    import HeaderCommon from './partial/header.vue'
    import FooterCommon from './partial/footer.vue'

    export default {
        data() {
            return {}
        },
        computed: {
            todos() {
                return this.$store.state.todos
            }
        },
        components: {
            HeaderCommon,
            FooterCommon
        }
    }
</script>

<style lang="scss">
    @import '../static/layout';
</style>