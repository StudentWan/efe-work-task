<template>
    <div class="footer">
        <v-touch @tap="toOnething"  class="one-thing" :class="{sel: select === 'onething'}">Onething</v-touch>
        <v-touch @tap="toAll" class="all" :class="{sel: select === 'all'}">All</v-touch>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {}
        },
        methods: {
            toOnething() {
                this.$router.push('/')
            },
            toAll() {
                this.$router.push('/all/list')
            }
        },
        computed: {
            select() {
                return this.$store.state.option.select
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../static/common';

    .footer {
        @include flex;
        @include fixed(bottom);
        height: 2.5em;
        @include title;
        background: $deepgray;
    }

    .one-thing,
    .all {
        flex: auto;
        @include flex;
        height: 100%;
        text-align: center;
    }

    .sel {
        font-weight: 700;
    }
</style>
