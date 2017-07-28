<template>
    <div :class="$style.message">
        <header-common></header-common>
        <p>{{ todos }}</p>
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
import headerCommon from './partial/header.vue'
export default {
    data() {
        return {

        }
    },
    computed: {
        todos() {
            return this.$store.state.todos
        }
    },
    components: {
        headerCommon
    }
}
</script>

<style lang="scss" module>
.message {
    color: blue;
}
</style>