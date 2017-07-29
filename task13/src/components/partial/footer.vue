<template>
    <div class="footer">
        <div class="one-thing" :class="{sel: select === 'onething'}" @click="toOnething">OneThing</div>
        <div class="all" :class="{sel: select === 'all'}" @click="toAll">All</div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {

        }
    },
    methods: {
        toOnething() {
            this.$router.push('/')
        },
        toAll() {
            this.$router.push('/all')
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
</style>
